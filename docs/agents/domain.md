# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`CONTEXT-MAP.md`** at the repo root — it lists each top-level folder and the path to its `CONTEXT.md`. Read the `CONTEXT.md` files relevant to the area you're working in.
- **`docs/adr/`** — read ADRs that touch the area you're about to work in.
- For context-specific decisions, check `<folder>/docs/adr/` if it exists.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront.

## File structure

This is a multi-context repo. Each top-level folder is an independent website root:

```
/
├── CONTEXT-MAP.md              ← index of all contexts
├── docs/adr/                   ← system-wide architectural decisions
├── home/
│   ├── CONTEXT.md
│   └── docs/adr/
├── journal-club/
│   ├── CONTEXT.md
│   └── docs/adr/
├── magnify/
│   ├── CONTEXT.md
│   └── docs/adr/
├── methods/
│   ├── CONTEXT.md
│   └── docs/adr/
├── ml/
│   ├── CONTEXT.md
│   └── docs/adr/
├── properties/
│   ├── CONTEXT.md
│   └── docs/adr/
└── wire-cell/
    ├── CONTEXT.md
    └── docs/adr/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in the relevant `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 — but worth reopening because…_
