---
provider_id: local-folder
implements: StorageProvider
camada: fundacao
status: stub_v1.0
fonte: PRD.md v1.0 §8.3 Q-ARQ-3 + §8.4 (data persistence)
---

# local-folder — StorageProvider Stub v1.0

> **Status:** stub documentado para v1.0. Implementação mínima funcional planeada para story `export-package` (não esta).
>
> Implementação trivial — escreve para filesystem local seguindo convenção `squad/data/{slug}/videos/{YYYY-MM-DD}/`.

## Propósito

Implementação do contrato `StorageProvider` (ver `squad/providers/interfaces/StorageProvider.md`) que persiste artefactos finais no filesystem local. Sem cloud, sem API.

## Dependências

Nenhuma externa — só Node 18 stdlib (`fs`, `path`, `crypto`).

## Configuração

Sem API key. Path raíz fixo: `squad/data/`.

## Algoritmo (REFERENCE — não implementado)

```
1. Resolver destino: squad/data/{slug}/videos/{YYYY-MM-DD}/
2. Criar pasta se não existir (mkdir recursive)
3. Para cada path em payload_paths:
   - copiar para destino preservando nome
   - calcular sha256 e tamanho
4. Construir manifest:
   {
     files: [{name, size_bytes, sha256}, ...],
     total_size_bytes: number,
     created_at: ISO-8601
   }
5. Escrever manifest como package-manifest.json
6. Retornar {final_location, package_manifest}
```

## Chamada de exemplo (REFERENCE — não implementado)

```javascript
const provider = require('./index.js'); // a criar em story futura

const result = await provider.exportPackage({
  payload_paths: [
    'squad/data/alturense/videos/2026-04-18/final.mp4',
    'squad/data/alturense/videos/2026-04-18/captions.srt',
    'squad/data/alturense/videos/2026-04-18/metadata.json',
  ],
  destination_hint: 'alturense/2026-04-18',
});

// result === {
//   final_location: '/abs/path/to/squad/data/alturense/videos/2026-04-18/',
//   package_manifest: { files: [...], total_size_bytes: 4200000, created_at: '2026-04-18T...' }
// }
```

## NotImplementedError

```javascript
throw new Error('NotImplementedError: local-folder stub — implementação real pendente export-package story');
```

## Referências

- `squad/providers/interfaces/StorageProvider.md`
- PRD.md v1.0 §8.3 Q-ARQ-3, §8.4
