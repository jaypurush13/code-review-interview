# Loan application — code review exercise

Thanks for taking the time. This is a short, practical exercise: **review one pull request** the way
you would review a teammate's work.

## The scenario

This is a cut-down slice of a home loan application. A customer works through a series of steps —
personal details, income, expenses, review — and the team is part way through building them.

An engineer has opened a PR adding the **monthly expenses step**: the customer enters what they spend
each month across a few categories, sees a running total, and saves to continue.

The PR is open on this repository:

> **[PR — feat(application): add monthly expenses step with running total](../../pulls)**

The author drafted it with AI assistance, and our review bot has left some comments on it that
haven't been addressed yet. The author considers the change ready to merge.

## What we'd like you to do

We'll walk through the PR together and talk it over — **you don't need to write anything up or
prepare in advance.** Come ready to tell us:

- What you'd **approve**, and why
- What you'd **reject or change** before this merges
- What you'd want to **investigate further** or ask the author about
- What you make of the **bot's review comments**

You do **not** need to run the code, install dependencies, or fix anything. Reading is enough.

## Time

**About 15 minutes.** We're deliberately not asking for exhaustive coverage — we'd much rather hear a
handful of well-prioritised observations, clearly explained, than a long unranked list. If you spot
something and aren't sure how much it matters, say so; thinking out loud is useful to us.

## What we're looking for

- Whether you can tell a **serious problem** from a **minor one**, and say which is which
- How you **explain** an issue — a review comment has to be useful to the author
- Whether you notice things that are **done well**, not just things that are wrong
- How you weigh **automated review suggestions** — what to take, what to push back on

That's it. There's no trick and no hidden scoring beyond the above.

## Repo layout

```
app/apply/expenses/     the expenses step (React client component)
app/api/applications/   route handlers
lib/expenses/           pure helpers + their tests
lib/db.ts, session.ts   stubs standing in for the real Prisma client and auth
types/expenses.ts       shared types
```

## Running it (optional)

Not required for the review, but if you want to:

```bash
npm install
npm run typecheck
npm test
```
