# PayDash — code review exercise

Thanks for taking the time. This is a short, practical exercise: **review one pull request** the way
you would review a teammate's work.

## The scenario

PayDash is a small internal payments dashboard. A mid-level engineer on the team has opened a PR
adding a **saved payees** panel to the settings page — customers can see their saved payees, filter
the list, rename one inline, and delete one.

The PR is open on this repository:

> **[PR #1 — feat(payments): add saved payees list with inline nickname editing](../../pull/1)**

CI is green and the author considers it ready to merge.

## What we'd like you to do

1. **Fork this repository** (top-right → Fork). Your fork keeps the branch, so the PR is reviewable
   in your own copy.
2. In your fork, open the **`feat/saved-payees`** branch and create a pull request into your fork's
   `main` (GitHub will offer this; the diff is identical).
3. **Leave your review as line-level comments on the diff** — click the `+` next to a line and write
   what you'd say to the author. Anchor each comment to the line it's about.
4. When you're done, submit the review (**Files changed → Review changes**) with an overall verdict:
   *Comment*, *Approve*, or *Request changes*, plus a couple of sentences summarising your position.
5. Send us the link to your fork.

## Time

**Please spend about 15 minutes total.** Roughly 10 minutes reading and 5 minutes writing is a good
split. We are deliberately not asking for exhaustive coverage — we would much rather see a handful
of well-prioritised, clearly-explained comments than a long unranked list.

You do **not** need to run the code, install dependencies, or fix anything. Reading is enough.

## What we're looking for

- Whether you can tell a **serious problem** from a **minor one**, and say which is which.
- How you **explain** an issue — a reviewer's comment has to be useful to the author.
- Whether you notice things that are **done well**, not just things that are wrong.

That's it. There's no trick and no hidden scoring beyond the above.

## Repo layout

```
app/settings/payees/   the settings panel (React client component)
app/api/payees/        route handlers
lib/payees/            pure helpers + their tests
lib/db.ts, session.ts  stubs standing in for the real Prisma client and auth
types/payee.ts         shared types
```

## Running it (optional)

Not required for the review, but if you want to:

```bash
npm install
npm run typecheck
npm test
```
