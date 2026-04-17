/**
 * Nanobanana API Client
 *
 * Wrapper para geração de imagens via Nanobanana API.
 * Usado pelo agent @copy-creator (task: generate-image.md).
 *
 * Ambiente necessário:
 *   NANOBANANA_API_KEY
 *
 * Uso:
 *   const { generateImage } = require('./scripts/nanobanana-client');
 *   const result = await generateImage({ prompt, aspectRatio: '1:1' });
 */

const axios = require('axios');

const NANOBANANA_BASE_URL = process.env.NANOBANANA_BASE_URL || 'https://api.nanobanana.dev';
const DEFAULT_TIMEOUT_MS = 30_000;
const MAX_RETRIES = 3;
const BACKOFF_BASE_MS = 1_000;

/**
 * Constrói o prompt final aplicando estilo e aspect ratio.
 */
function buildPrompt({ prompt, style, aspectRatio }) {
  const parts = [prompt];

  if (style) {
    parts.push(`in the style of ${style}`);
  }

  parts.push(
    'high quality, social media ready, no text overlays, no watermarks, no logos'
  );

  return {
    text: parts.join(', '),
    aspectRatio: aspectRatio || '1:1'
  };
}

/**
 * Backoff exponencial com jitter.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryableCall(fn, attempt = 0) {
  try {
    return await fn();
  } catch (error) {
    const isRetryable =
      error.code === 'ECONNABORTED' ||
      (error.response && [429, 500, 502, 503, 504].includes(error.response.status));

    if (isRetryable && attempt < MAX_RETRIES - 1) {
      const delay = BACKOFF_BASE_MS * Math.pow(2, attempt) + Math.random() * 500;
      await sleep(delay);
      return retryableCall(fn, attempt + 1);
    }

    throw error;
  }
}

/**
 * Gera uma imagem via Nanobanana API.
 *
 * @param {object} opts
 * @param {string} opts.prompt - Descrição da imagem
 * @param {string} [opts.style] - Estilo visual (herdado da persona)
 * @param {string} [opts.aspectRatio] - 1:1 | 9:16 | 1.91:1
 * @param {number} [opts.variants] - Quantas variantes gerar (default: 2)
 * @returns {Promise<{variants: Array<{url, promptUsed}>, altText: string}>}
 */
async function generateImage({ prompt, style, aspectRatio, variants = 2 }) {
  const apiKey = process.env.NANOBANANA_API_KEY;

  if (!apiKey) {
    const err = new Error('NANOBANANA_API_KEY environment variable is required');
    err.code = 'API_KEY_MISSING';
    throw err;
  }

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('prompt (string) is required');
  }

  const promptConfig = buildPrompt({ prompt, style, aspectRatio });

  const payload = {
    prompt: promptConfig.text,
    aspect_ratio: promptConfig.aspectRatio,
    n: variants,
    negative_prompt: 'text, watermark, logo, low quality, distorted'
  };

  const response = await retryableCall(() =>
    axios.post(`${NANOBANANA_BASE_URL}/v1/generate`, payload, {
      timeout: DEFAULT_TIMEOUT_MS,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })
  );

  const images = response.data.images || [];

  return {
    variants: images.map((img, idx) => ({
      id: `variant_${String.fromCharCode(97 + idx)}`, // variant_a, variant_b, ...
      url: img.url,
      aspectRatio: promptConfig.aspectRatio,
      promptUsed: promptConfig.text,
      recommended: idx === 0
    })),
    altText: generateAltText(prompt)
  };
}

/**
 * Gera alt-text a partir do prompt original.
 * Versão simples — pode ser substituída por um LLM call no futuro.
 */
function generateAltText(prompt) {
  const truncated = prompt.length > 125 ? `${prompt.slice(0, 122)}...` : prompt;
  return truncated;
}

module.exports = {
  generateImage,
  buildPrompt,
  // Exportados para testes
  _internal: { retryableCall, sleep }
};
