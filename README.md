# yash-portfolio

Personal portfolio of Yash Santwani, built with Claude Code using the compound engineering loop:
**Brainstorm → Plan → Work → Review → Compound**.

## Run locally

```bash
python3 -m http.server 5500
# open http://localhost:5500
```

## Setup (once)

```bash
# 1. Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash        # Mac / Linux
# irm https://claude.ai/install.ps1 | iex             # Windows PowerShell

# 2. Start it in this folder
cd yash-portfolio
claude
```

Inside Claude Code:

```
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

Restart (`/exit`, then `claude`). Type `/ce` to confirm the commands appear.

## Per feature

1. `/clear`
2. Paste the prompts from `docs/prompts.md` in order (brainstorm → plan → work → review → compound)
3. Preview at `http://localhost:5500` (desktop + phone view)
4. `git add . && git commit -m "Feature N: <name>" && git push`
5. Tick the feature in `docs/backlog.md`

## Folders

| Path | What |
| --- | --- |
| `CLAUDE.md` | Rules Claude reads every session |
| `docs/backlog.md` | Feature order + status |
| `docs/prompts.md` | Copy-paste prompts for each phase |
| `docs/plans/` | Plans written by `/ce-plan` |
| `docs/solutions/` | Lessons written by `/ce-compound` |
| `reference/` | Screenshots of the design reference |
| `css/tokens.css` | Colours, type, spacing |
| `js/` | Reusable effects: grain, dust, reveal, counter |
| `assets/img` | Photos (WebP) |

## Deploy

GitHub → Settings → Pages → Deploy from a branch → `main` / root.
Live at `https://<username>.github.io/yash-portfolio/`.
