---
task: Extract Voice Patterns
responsavel: "@social-scout"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - person_slug: Slug da pessoa (obrigatório — resolvido via *resolve-person)
  - profile_data: Output de scan-social-profiles.md (data/{person_slug}/research/raw-*.json)
Saida: |
  - voice_profile_file: data/{person_slug}/research/voice-profile.yaml (PERSISTIDO)
  - voice_profile: Perfil de voz observado
  - common_themes: Temas recorrentes identificados
  - signature_moves: Movimentos linguísticos característicos
Checklist:
  - "[ ] Step 0: Resolver person_slug via *resolve-person"
  - "[ ] Carregar raw-*.json de data/{person_slug}/research/"
  - "[ ] Analisar comprimento médio de posts"
  - "[ ] Detectar uso de emoji (frequência e variedade)"
  - "[ ] Identificar gírias/jargões"
  - "[ ] Extrair estruturas frequentes (hook patterns)"
  - "[ ] Clusterizar temas por frequência"
  - "[ ] Identificar tom predominante"
  - "[ ] PERSISTIR em data/{person_slug}/research/voice-profile.yaml (MANDATORY)"
---

# *extract-voice-patterns

Extrai assinatura de voz e temas do conteúdo público existente.

## Análises

### 1. Voz

| Dimensão | Indicadores |
|----------|-------------|
| **Tom** | Formalidade, emoção, ironia, educacional |
| **Ritmo** | Frases curtas vs longas, pontuação |
| **Emoji** | Frequência (alta/média/baixa), tipos preferidos |
| **Gírias** | Dicionário pessoal do usuário |

### 2. Estruturas Frequentes (Signature Moves)

Identifica padrões como:
- "Fiz isso por X anos, e descobri que..."
- "Pergunta: [questão]. Resposta: [insight]"
- "3 coisas que mudei esse ano:"
- Uso de storytelling vs bullet points

### 3. Temas

Clustering de tópicos recorrentes — quanto % de conteúdo cada tema representa.

## Output

```yaml
voice_profile:
  tone_primary: [casual | formal | provocativo | educativo | inspirador]
  tone_secondary: string
  formality_score: 0.0-1.0      # 0=muito casual, 1=muito formal
  emotion_score: 0.0-1.0
  avg_post_length: int           # em caracteres
  emoji_frequency: [high | medium | low | none]
  preferred_emojis: [🔥, 💡, 🎯, ...]
  signature_vocabulary: [palavras/expressões características]

signature_moves:
  - pattern: "string"
    frequency: 0.3
    example: "string"

common_themes:
  - theme: string
    frequency: 0.25         # % do conteúdo
    keywords: [string]
    top_post_example: string
```
