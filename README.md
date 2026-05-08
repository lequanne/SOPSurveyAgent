# SOP Survey Agent — RAG Architecture Prototype

A fully client-side Retrieval-Augmented Generation (RAG) agent for Standard Operating Procedures, deployable to GitHub Pages as a single `index.html` file.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAG PIPELINE                                  │
│                                                                  │
│  📚 KNOWLEDGE BASE         ⚙️ INDEXING          🤖 GENERATION   │
│  ─────────────────         ─────────────         ─────────────  │
│  Wikipedia (7 docs)                                             │
│  • SOP                 →  Text Chunker      ←  User Query       │
│  • Survey Methodology  →  (400w / 80w       →  TF-IDF Retriever │
│  • ISO 9001               overlap)          →  Top-5 Chunks     │
│  • Quality Mgmt        →  TF-IDF Index      →  Claude API       │
│  • Research Ethics                          →  Answer + Citations│
│  • Data Collection                                              │
│  • Informed Consent                                             │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Vanilla JavaScript (ES2022), HTML5, CSS3 |
| **Knowledge Base** | Wikipedia API (CORS-enabled, 7 public articles) |
| **Chunking** | Sliding window (400 words, 80 word overlap) |
| **Retrieval** | TF-IDF with smoothed IDF, stop-word filtering |
| **Generation** | Anthropic API (browser-direct) |
| **Hosting** | GitHub Pages (single static file) |

## Using the AI Analysis

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. Paste into the **API key** field in the chat panel
3. Wait for the knowledge base to load (~5–10 seconds)
4. Ask any question about SOPs, survey design, quality management, or research ethics

## RAG Implementation Details

### Document Fetching
- Wikipedia's `action=query&prop=extracts&explaintext=1` endpoint
- CORS-enabled with `origin=*` parameter
- 7 articles fetched in parallel

### Text Chunking
- Sliding window: 400 words per chunk, 80 word overlap
- Chunks < 30 words are discarded
- Each chunk tagged with source, URL, and icon

### TF-IDF Retrieval
- **TF** (Term Frequency): `count(term, chunk) / total_words(chunk)`
- **IDF** (Inverse Document Frequency): `log((N+1)/(df+1)) + 1` (smoothed)
- **Score**: `sum(TF(t) × IDF(t))` for each query term
- Stop-word list removes ~80 common English words
- Top-5 chunks by score are retrieved per query

### Generation
- System prompt: SOP Survey Agent persona
- User message: query + numbered context chunks
- Claude returns cited answer with `[1][2][3]` references
- Sources displayed as clickable chips linking to Wikipedia

## Knowledge Base Sources

| Article | Wikipedia URL |
|---|---|
| Standard Operating Procedure | [wikipedia.org/wiki/Standard_operating_procedure](https://en.wikipedia.org/wiki/Standard_operating_procedure) |
| Survey Methodology | [wikipedia.org/wiki/Survey_methodology](https://en.wikipedia.org/wiki/Survey_methodology) |
| ISO 9001 | [wikipedia.org/wiki/ISO_9001](https://en.wikipedia.org/wiki/ISO_9001) |
| Quality Management System | [wikipedia.org/wiki/Quality_management_system](https://en.wikipedia.org/wiki/Quality_management_system) |
| Research Ethics | [wikipedia.org/wiki/Research_ethics](https://en.wikipedia.org/wiki/Research_ethics) |
| Data Collection | [wikipedia.org/wiki/Data_collection](https://en.wikipedia.org/wiki/Data_collection) |
| Informed Consent | [wikipedia.org/wiki/Informed_consent](https://en.wikipedia.org/wiki/Informed_consent) |
