/**
 * remotion-local — implementação CommonJS do contrato EditingProvider (Camada 3).
 *
 * Propósito:
 *   Encapsular a invocação do Remotion render para que NENHUMA task ou workflow
 *   chame Remotion directamente (regra Q-ARQ-3 day-1, PRD §8.3).
 *
 * Inputs esperados (assinatura da interface):
 *   composition_spec — JSON com props da Composition (ex: AlturenseCompositionProps)
 *   assets           — map de paths absolutos dos assets (clips, designs, music, srt)
 *   output_spec      — { output_path, aspect_ratio, fps, codec }
 *
 * Outputs:
 *   { output_path, cost_eur: 0, latency_ms, render_logs }
 *
 * Custo: €0 (render local). Cost_eur > 0 é exclusivo de implementações cloud (Lambda).
 *
 * Fonte autoritativa: squad/providers/interfaces/EditingProvider.md
 * Story: 1.1 (AC-A2, AC-B6)
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

/**
 * Erro padronizado da implementação. Permite à task chamadora distinguir
 * categorias sem precisar de parsing de strings.
 */
class EditingProviderError extends Error {
  constructor(code, message, details) {
    super(message);
    this.name = 'EditingProviderError';
    this.code = code;
    this.details = details || {};
  }
}

/**
 * Garante que a pasta de destino existe (incluindo subpasta render/).
 * Cria recursivamente. Idempotente.
 *
 * @param {string} outputPath — path absoluto do final.mp4
 * @returns {{outputDir: string, renderDir: string}}
 */
function garantirPastaSaida(outputPath) {
  const outputDir = path.dirname(outputPath);
  const renderDir = path.join(outputDir, 'render');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(renderDir, { recursive: true });
  return { outputDir, renderDir };
}

/**
 * Serializa composition_spec em disco para auditoria (PRD §8.4).
 * Escreve render/composition.json ao lado do final.mp4.
 *
 * @param {string} renderDir — pasta render/
 * @param {object} compositionSpec
 */
function persistirCompositionSpec(renderDir, compositionSpec) {
  const compositionJsonPath = path.join(renderDir, 'composition.json');
  fs.writeFileSync(
    compositionJsonPath,
    JSON.stringify(compositionSpec, null, 2),
    'utf8'
  );
}

/**
 * Constrói os argumentos para `npx remotion render`.
 *
 * Importante: em vez de passar os props como string JSON via --props (que sofre
 * problemas de escaping no Windows), escrevemos os props num ficheiro temporário
 * e passamos o path. Esta abordagem é recomendada pelo próprio Remotion quando
 * detecta JSON inválido em --props (ver mensagem de erro em runtime).
 *
 * @param {object} args — { entryPoint, compositionId, outputPath, propsPath }
 * @returns {string[]}
 */
function construirArgsRender({ entryPoint, compositionId, outputPath, propsPath }) {
  return [
    'remotion',
    'render',
    entryPoint,
    compositionId,
    outputPath,
    `--props=${propsPath}`,
    '--codec', 'h264',
    '--log', 'verbose',
  ];
}

/**
 * Executa `npx remotion render` como processo filho e captura stdout/stderr
 * num ficheiro de logs para debugging posterior (PRD §8.4).
 *
 * @param {object} params
 * @param {string} params.templateDir — directório do template Remotion (cwd do spawn)
 * @param {string[]} params.args — argumentos para npx
 * @param {string} params.logsPath — path absoluto do render-logs.txt
 * @returns {Promise<{exitCode: number}>}
 */
function executarRemotionRender({ templateDir, args, logsPath }) {
  return new Promise((resolve, reject) => {
    // Em Windows, npx vem como .cmd — `shell: true` resolve PATH correctamente.
    const proc = spawn('npx', args, { cwd: templateDir, shell: true });

    const writeStream = fs.createWriteStream(logsPath, { flags: 'w' });
    writeStream.write(
      `=== remotion-local render — iniciado em ${new Date().toISOString()} ===\n`
    );
    writeStream.write(`Comando: npx ${args.join(' ')}\n`);
    writeStream.write(`Cwd: ${templateDir}\n\n`);

    proc.stdout.on('data', (chunk) => writeStream.write(chunk));
    proc.stderr.on('data', (chunk) => writeStream.write(chunk));

    proc.on('error', (err) => {
      writeStream.end(`\n=== ERRO spawn: ${err.message} ===\n`);
      reject(
        new EditingProviderError(
          'REMOTION_NOT_INSTALLED',
          `Falha a executar 'npx remotion'. Verifica que o Remotion está instalado no template (${templateDir}).`,
          { originalError: err.message }
        )
      );
    });

    proc.on('close', (exitCode) => {
      writeStream.end(
        `\n=== render terminado em ${new Date().toISOString()} — exit=${exitCode} ===\n`
      );
      resolve({ exitCode });
    });
  });
}

/**
 * Implementação principal do contrato EditingProvider.
 *
 * @param {object} params
 * @param {object} params.composition_spec — props da Composition Remotion
 * @param {object} params.assets — paths absolutos dos assets (informativo; props do
 *                                  Remotion já contém os paths se necessário)
 * @param {object} params.output_spec — { output_path, aspect_ratio, fps, codec }
 * @returns {Promise<{output_path: string, cost_eur: number, latency_ms: number, render_logs: string}>}
 */
async function render({ composition_spec, assets, output_spec }) {
  // Validação de inputs mínima — falhas devolvem códigos da interface.
  if (!composition_spec || typeof composition_spec !== 'object') {
    throw new EditingProviderError(
      'INVALID_COMPOSITION_SPEC',
      'composition_spec é obrigatório e deve ser um objecto.'
    );
  }
  if (!output_spec || !output_spec.output_path) {
    throw new EditingProviderError(
      'INVALID_OUTPUT_SPEC',
      'output_spec.output_path é obrigatório.'
    );
  }

  // O nome da Composition Remotion vem em composition_spec ou usa default Alturense.
  const compositionId = composition_spec.composition_id || 'AlturenseComposition';

  // Path do template Remotion — relativo à raíz do repositório.
  // Default: alturense-default. Override via composition_spec.template_id.
  const templateId = composition_spec.template_id || 'alturense-default';
  const templateDir = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'templates',
    'remotion',
    templateId
  );

  if (!fs.existsSync(templateDir)) {
    throw new EditingProviderError(
      'TEMPLATE_NOT_FOUND',
      `Template Remotion não encontrado em: ${templateDir}`,
      { templateId, templateDir }
    );
  }

  // Garantir pastas de output.
  const outputPath = path.resolve(output_spec.output_path);
  const { renderDir } = garantirPastaSaida(outputPath);

  // Serializar composition_spec para auditoria.
  persistirCompositionSpec(renderDir, { composition_spec, assets, output_spec });

  // Path do ficheiro de logs.
  const logsPath = path.join(renderDir, 'render-logs.txt');

  // Props passados ao Remotion — só os campos que a Composition espera.
  // Excluímos campos meta (composition_id, template_id) que são consumidos por nós.
  const remotionProps = { ...composition_spec };
  delete remotionProps.composition_id;
  delete remotionProps.template_id;

  // Escrever props num ficheiro JSON temporário ao lado dos logs. Evita
  // problemas de shell escaping no Windows (especialmente com caracteres como
  // €, í, à, etc., que aparecem em PT-PT).
  const propsPath = path.join(renderDir, 'props.json');
  fs.writeFileSync(propsPath, JSON.stringify(remotionProps, null, 2), 'utf8');

  // Entry point relativo ao templateDir.
  const entryPoint = path.posix.join('src', 'index.tsx');

  const args = construirArgsRender({
    entryPoint,
    compositionId,
    outputPath,
    propsPath,
  });

  // Executar render e medir latência.
  const startMs = Date.now();
  const { exitCode } = await executarRemotionRender({ templateDir, args, logsPath });
  const latencyMs = Date.now() - startMs;

  if (exitCode !== 0) {
    throw new EditingProviderError(
      'RENDER_FAILED',
      `Remotion render falhou com exit code ${exitCode}. Inspecciona ${logsPath} para detalhes.`,
      { exitCode, logsPath }
    );
  }

  // Sanity check — output deve existir.
  if (!fs.existsSync(outputPath)) {
    throw new EditingProviderError(
      'RENDER_FAILED',
      `Render reportou sucesso (exit=0) mas o ficheiro ${outputPath} não foi criado.`,
      { logsPath }
    );
  }

  return {
    output_path: outputPath,
    cost_eur: 0,                  // render local — custo €0 (PRD §8.5)
    latency_ms: latencyMs,
    render_logs: logsPath,
  };
}

module.exports = {
  render,
  EditingProviderError,
};
