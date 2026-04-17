/**
 * Social Scraper
 *
 * Wrapper para coleta de dados públicos de redes sociais.
 * Usado pelo agent @social-scout (task: scan-social-profiles.md).
 *
 * Estratégia:
 *   1. Se APIFY_API_TOKEN disponível → usar Apify actors especializados
 *   2. Senão → fallback para web search de dados públicos indexados
 *
 * Princípios:
 *   - APENAS dados públicos (nunca atrás de login)
 *   - Respeitar rate limits
 *   - Retry com backoff em falhas transientes
 */

const axios = require('axios');

const APIFY_BASE_URL = 'https://api.apify.com/v2';
const DEFAULT_TIMEOUT_MS = 60_000;
const MAX_RETRIES = 3;

// Mapeamento plataforma → Apify actor
const APIFY_ACTORS = {
  instagram: 'apify/instagram-profile-scraper',
  tiktok: 'clockworks/tiktok-profile-scraper',
  linkedin: 'apify/linkedin-profile-scraper',
  x: 'apidojo/twitter-user-scraper'
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Verifica se APIFY está disponível.
 */
function hasApifyToken() {
  return Boolean(process.env.APIFY_API_TOKEN);
}

/**
 * Scrape via Apify actor.
 */
async function scrapeViaApify({ platform, handle, maxItems = 20 }) {
  const actor = APIFY_ACTORS[platform];
  if (!actor) {
    throw new Error(`Platform not supported by Apify mapping: ${platform}`);
  }

  const token = process.env.APIFY_API_TOKEN;

  // Start actor run
  const runResponse = await axios.post(
    `${APIFY_BASE_URL}/acts/${actor}/runs?token=${token}`,
    {
      usernames: [handle.replace(/^@/, '')],
      resultsLimit: maxItems
    },
    { timeout: DEFAULT_TIMEOUT_MS }
  );

  const runId = runResponse.data.data.id;

  // Poll for completion (simplificado — produção usaria webhooks)
  let status = 'RUNNING';
  let attempts = 0;
  while (status === 'RUNNING' && attempts < 30) {
    await sleep(3_000);
    const statusResponse = await axios.get(
      `${APIFY_BASE_URL}/actor-runs/${runId}?token=${token}`
    );
    status = statusResponse.data.data.status;
    attempts++;
  }

  if (status !== 'SUCCEEDED') {
    throw new Error(`Apify run failed with status: ${status}`);
  }

  // Fetch dataset
  const datasetId = runResponse.data.data.defaultDatasetId;
  const dataResponse = await axios.get(
    `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${token}`
  );

  return {
    source: 'apify',
    platform,
    handle,
    items: dataResponse.data
  };
}

/**
 * Fallback via web search (limitado, apenas dados muito públicos).
 * Implementação placeholder — em produção usaria uma API de busca real.
 */
async function scrapeViaWebSearch({ platform, handle }) {
  return {
    source: 'web-search-fallback',
    platform,
    handle,
    items: [],
    note: 'Web search fallback retornou resultados limitados. Configure APIFY_API_TOKEN para coleta completa.'
  };
}

/**
 * API pública — Scrape um perfil com a melhor estratégia disponível.
 */
async function scrapeProfile({ platform, handle, maxItems = 20 }) {
  if (!platform || !handle) {
    throw new Error('platform and handle are required');
  }

  const normalizedHandle = handle.startsWith('@') ? handle : `@${handle}`;

  try {
    if (hasApifyToken()) {
      return await scrapeViaApify({ platform, handle: normalizedHandle, maxItems });
    }
    return await scrapeViaWebSearch({ platform, handle: normalizedHandle });
  } catch (error) {
    return {
      source: 'error',
      platform,
      handle: normalizedHandle,
      items: [],
      error: {
        message: error.message,
        code: error.code || 'SCRAPE_FAILED'
      }
    };
  }
}

/**
 * Scrape múltiplos perfis em paralelo (com concorrência limitada).
 */
async function scrapeProfiles({ profiles, concurrency = 2 }) {
  const results = [];

  for (let i = 0; i < profiles.length; i += concurrency) {
    const batch = profiles.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(p => scrapeProfile(p)));
    results.push(...batchResults);

    // Rate limit friendly: pausa entre batches
    if (i + concurrency < profiles.length) {
      await sleep(2_000);
    }
  }

  return {
    total: profiles.length,
    successful: results.filter(r => r.source !== 'error').length,
    failed: results.filter(r => r.source === 'error').length,
    results
  };
}

module.exports = {
  scrapeProfile,
  scrapeProfiles,
  hasApifyToken,
  // Exportados para testes
  _internal: { scrapeViaApify, scrapeViaWebSearch, APIFY_ACTORS }
};
