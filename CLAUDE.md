# Agent Instructions — IRR Design System

> Mirrored across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md`.

React + TypeScript component library. **Stripe meets Linear** — earthy, professional, restrained.  
Stack: React 18 · Vite 5 · Tailwind CSS v3 · Storybook v8 · Vitest 2 · ESLint 9 · Chromatic.

---

## Tools: RTK + Caveman

### RTK (token-optimized CLI proxy)

All shell commands **must** be prefixed with `rtk`. This is non-negotiable.

```bash
# Always use rtk — never raw commands
rtk pnpm install
rtk pnpm dev
rtk pnpm test
rtk pnpm lint
rtk pnpm typecheck
rtk git status
rtk git diff
rtk ls -la src/components/
```

**Why:** RTK filters verbose output, cutting token usage 60–90% on dev operations.

```bash
# Analytics
rtk gain              # token savings so far
rtk gain --history    # per-command breakdown
rtk discover          # find missed rtk opportunities
```

### Caveman (response compression)

Default mode: **full** — drop articles/filler, fragments OK, short synonyms, technical terms exact.

```
Levels: /caveman lite | full | ultra
Off:    "stop caveman" / "normal mode"
```

**Rule:** communicate in caveman mode unless:
- Security warning
- Irreversible action confirmation
- Step ordering is ambiguous without conjunctions

**Common patterns:**
- Not: "Sure! I'd be happy to help. The issue you're experiencing is..."
- Yes: "Bug in auth. Token check `<` not `<=`. Fix:"

---

## 3-Layer Architecture

**Layer 1 — Directive** (`directives/`): SOPs for repeatable tasks. Read before acting.  
**Layer 2 — Orchestration** (you): Route, decide, sequence calls, handle errors.  
**Layer 3 — Execution** (`execution/`): Deterministic scripts. Prefer existing scripts over writing new ones.

---

## This Repo's Commands

| Task | Command |
|---|---|
| Storybook dev | `rtk pnpm dev` → `http://localhost:6006` |
| Unit tests | `rtk pnpm test` |
| Watch tests | `rtk pnpm test:watch` |
| Coverage | `rtk pnpm test:coverage` |
| Lint | `rtk pnpm lint` |
| Lint + fix | `rtk pnpm lint:fix` |
| Typecheck | `rtk pnpm typecheck` |
| Build Storybook | `rtk pnpm build` |
| Visual regression | `rtk pnpm chromatic` (requires `CHROMATIC_PROJECT_TOKEN` in `.env.local`) |

---

## Sub-Agents (Cavecrew)

Three specialised sub-agents are available. Spawn them for bounded tasks.

### `cavecrew-builder`

**Use for:** Surgical 1–2 file edits. Typo fixes, single-function rewrites, mechanical renames, format-preserving tweaks.  
**Hard refuses:** 3+ file scope, new abstractions, drive-by refactors.  
**Output:** Caveman diff receipt with `path:line-range — change ≤10 words` + `verified:` line.  
**Tools:** Read, Edit, Write, Grep, Glob.

Spawn when: fix is obvious and bounded. Do NOT use for new features or cross-file refactors.

### `cavecrew-reviewer`

**Use for:** Diff/branch/file review. `git diff`, PR audits, single-file audits.  
**Output format:**
```
path/to/file.ts:42: 🔴 bug: <problem>. <fix>.
path/to/file.ts:118: 🟡 risk: <edge case>. <guard>.
totals: 1🔴 1🟡
```
**Severity:** 🔴 bug · 🟡 risk · 🔵 nit · ❓ question  
**Tools:** Read, Grep, Bash (read-only: `git diff`/`git log -p`/`git show`).  
**Model:** haiku (cheap, fast).

Spawn when: user says "review this PR / diff / file".

### `cavecrew-investigator`

**Use for:** Read-only code location. "Where is X defined", "what calls Y", "list all uses of Z", "map this dir".  
**Output format:**
```
Defs:
  src/components/Button/Button.tsx:12 — `Button` — main export
Refs:
  src/index.ts:3 — re-export
2 defs, 1 ref.
```
**Refuses:** to suggest fixes. Says `Read-only. Spawn cavecrew-builder.`  
**Tools:** Read, Grep, Glob, Bash.  
**Model:** haiku.

Spawn when: need to map the codebase before acting.

---

## Component Conventions

Every component lives in `src/components/ComponentName/`:
```
ComponentName.tsx          # component + CVA variants
ComponentName.stories.tsx  # Storybook stories
ComponentName.test.tsx     # Vitest + Testing Library
```
Export from `src/index.ts`.

**Styling rules:**
- Semantic color tokens (`bg-brand`, `text-fg-muted`, `border-border`) over raw palette values
- CVA (`class-variance-authority`) for variants + sizes
- `tailwind-merge` (`twMerge`) to merge conflicting classes
- Radius: `md` (8px) buttons/inputs · `lg` (12px) cards — never mix within a cluster

**Design tokens:**
- CSS vars → `src/styles/globals.css`
- TS exports → `src/tokens/index.ts`
- Brand: Teal `#0F6E56` · Stone neutrals · Amber `#F59E0B` · Geist font

---

## Operating Principles

**1. RTK first.** Every shell command gets `rtk` prefix. No exceptions.

**2. Caveman default.** Terse communication throughout. Drop filler.

**3. Check tools first.** Before writing a script, check `execution/`. Only create new if none exist.

**4. Self-anneal when things break.**
   - Read error + stack trace
   - Fix script, test again
   - Update directive with learnings (rate limits, edge cases, timing)

**5. Update directives as you learn.** Living documents. Improve, don't overwrite without asking.

**6. Self-annealing loop:**
   1. Fix it
   2. Update the tool
   3. Test the tool
   4. Update directive
   5. System stronger

---

## File Organization

| Path | Purpose |
|---|---|
| `src/components/` | Component source + stories + tests |
| `src/styles/globals.css` | Tailwind directives + CSS vars |
| `src/tokens/index.ts` | Typed TS design token exports |
| `directives/` | SOPs for repeatable workflows |
| `execution/` | Deterministic Python scripts |
| `.tmp/` | Intermediates — never commit, always regenerated |
| `.env` / `.env.local` | Secrets (gitignored) |

**Key principle:** Local files are for processing. Deliverables live in cloud (Chromatic, etc).

---

## Summary

You sit between human intent (directives) and deterministic execution (scripts).  
Read instructions → make decisions → call tools → handle errors → continuously improve.

**Always:** `rtk` every command. Caveman mode on. Self-anneal.
