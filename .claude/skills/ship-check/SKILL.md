---
name: ship-check
description: Pre-commit health check for the dashboard.
  Reviews uncommitted changes, verifies build, flags risky
  edits. Use when user says "ready to commit", "ship check",
  or asks to review their changes before pushing.
allowed-tools: Bash(git *) Bash(npm run build)
effort: medium
---

## Uncommitted changes

!`git status --short`

## Diff

!`git diff HEAD`

## Build result

!`npm run build 2>&1 | tail -15`

## Your task

Review the changes above. Output exactly three sections:

### Summary
Two or three bullets describing what changed.

### Risks
Flag any of these specifically:

- Edits to `script.js` or `style.css` at repo root
  (these are legacy, ignored by the app — almost
  certainly a mistake)
- Edits to `dist/` (build artifact, should not be
  hand-edited)
- Changes to `generateDummyData` shape without
  matching updates to `App.jsx` destructuring
- New Chart.js chart types without matching
  registration in `App.jsx`
- Build failures from the output above

### Verdict
One of: "ship it", "fix risks first",
or "build is broken — see output".