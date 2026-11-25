# Prompts

Replace `<feature>` with the backlog item. Run `/clear` before Phase A.

## A. Brainstorm
```
/ce-brainstorm Feature: <feature>. Reference screenshots in /reference. Goal: recreate the feel for MY content, not copy it. Read CLAUDE.md and docs/solutions/ first. Ask me about content, motion and mobile behaviour before proposing.
```

## B. Plan
```
/ce-plan Build <feature> per the brainstorm. Follow CLAUDE.md tokens and reuse js/ effects. List files touched, step order, and acceptance checks: desktop 1440, mobile 390, reduced-motion, Lighthouse mobile ≥ 90.
```
Then open the plan in `docs/plans/`, fix anything wrong, reply "approved".

## C. Work
```
/ce-work docs/plans/<plan-file>.md
```

## D. Review
```
/ce-code-review Check against the plan's acceptance checks. Flag: layout shift, scroll jank, text unreadable on grain, missing alt text, code that should be reusable.
```
Then compare the page with the reference side by side. Send gaps, one line each:
```
Fix these:
- <gap 1>
- <gap 2>
```

## E. Compound
```
/ce-compound Record what worked, what broke and the fix. Turn anything reusable into a rule in CLAUDE.md "Learned rules" or a helper in /js. Tick <feature> in docs/backlog.md.
```

## Commit
```bash
git add . && git commit -m "Feature N: <feature>" && git push
```

## Useful one-offs
- Stuck on a bug: `Check docs/solutions for a similar issue before fixing.`
- Tidy memory (every 3–4 features): `Merge duplicate notes in docs/solutions and prune stale rules in CLAUDE.md.`
- Undo: `Revert the last change.` or `git checkout .`
