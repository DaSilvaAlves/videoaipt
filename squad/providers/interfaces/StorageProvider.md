---
interface: StorageProvider
version: v1.0
camada: fundacao
fonte: PRD.md v1.0 §8.3 Q-ARQ-3
implementacoes_v1.0:
  - local-folder (filesystem squad/data/{slug}/videos/{YYYY-MM-DD}/)
implementacoes_planeadas:
  - cloud-folder-onedrive (v1.1)
  - s3-bucket (Fase 2 multi-tenant)
Entrada: |
  - payload_paths: array<string> — paths locais dos artefactos a empacotar (final.mp4, captions.srt, metadata.json, etc.)
  - destination_hint: string — slug + data ou outro identificador de destino
Saida: |
  - final_location: string — path/URL final onde o package fica disponível
  - package_manifest: object — descrição dos ficheiros incluídos
Contrato: |
  - Provider DEVE preservar nomes de ficheiros originais no package.
  - Provider DEVE gerar manifest com checksum (SHA-256) de cada ficheiro.
  - Provider local-folder DEVE escrever para squad/data/{slug}/videos/{YYYY-MM-DD}/.
  - Provider NÃO DEVE comprimir vídeos — qualidade preservada (compressão é responsabilidade da Camada 3).
---

# StorageProvider — Contrato Fundação

## Propósito

Abstracção de destino final dos artefactos. v1.0 escreve para filesystem local. Fase 2 troca para S3/OneDrive sem alterar tasks.

## Assinatura

```javascript
async function exportPackage({payload_paths, destination_hint}) {
  return {final_location, package_manifest};
}
```

> **Nota:** `export` é palavra reservada em ES modules; em CommonJS usamos `exportPackage` para o nome de função.

## Inputs

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|-------|
| `payload_paths` | array&lt;string&gt; | sim | Lista de paths absolutos a empacotar. |
| `destination_hint` | string | sim | Tipicamente `"{slug}/{YYYY-MM-DD}"`. |

## Outputs

| Campo | Tipo | Notas |
|-------|------|-------|
| `final_location` | string | Path absoluto local (v1.0) ou URL (Fase 2). |
| `package_manifest` | object | `{files: [{name, size_bytes, sha256}], total_size_bytes, created_at}` |

## Erros possíveis

| Código | Causa | Acção sugerida |
|--------|-------|----------------|
| `DESTINATION_WRITE_DENIED` | FS sem permissão | Escalar a @devops |
| `PAYLOAD_NOT_FOUND` | Path em payload_paths não existe | Validar antes de chamar |
| `INSUFFICIENT_SPACE` | Disco cheio | Limpeza manual, escalar |

## Referências

- PRD.md v1.0 §8.3 Q-ARQ-3
- PRD.md v1.0 §8.4 — data persistence pattern
