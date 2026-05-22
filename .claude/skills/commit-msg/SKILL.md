---
description: Generates a conventional commit message
  from the staged git diff. Use when the user asks for
  a commit message or says "commit this".
allowed-tools: Bash(git diff *) Bash(git status *)
---

## Staged changes

!`git diff --cached`

## Status

!`git status --short`

## Your task

Write a conventional commit message based on the diff
above. Format:

  <type>(<scope>): <subject>

  <body if needed>

Rules:
- Type must be one of: feat, fix, docs, style, refactor,
  test, chore, perf
- Subject line: imperative mood, under 60 chars, no period
- Body: only if the change isn't obvious from the subject
- Output the message only, no extra commentary