import { db } from '@/lib/db';
import { getSession } from '@/lib/session';
import { EXPENSE_CATEGORIES, type ExpenseAmounts } from '@/types/expenses';

interface RouteContext {
  params: { applicationId: string };
}

/**
 * Rejects anything that is not a record of known categories mapped to
 * non-negative finite numbers, so bad input never reaches the database.
 */
function parseExpenses(body: unknown): ExpenseAmounts | null {
  if (typeof body !== 'object' || body === null) return null;

  const entries = Object.entries(body as Record<string, unknown>);
  const parsed: ExpenseAmounts = {};

  for (const [key, value] of entries) {
    if (!EXPENSE_CATEGORIES.includes(key as never)) return null;
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
      return null;
    }
    parsed[key as keyof ExpenseAmounts] = value;
  }

  return parsed;
}

export async function GET(_req: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const application = await db.application.findUnique({
    where: { id: params.applicationId },
  });

  return Response.json({ application });
}

export async function PUT(req: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { expenses } = (await req.json()) as { expenses?: unknown };
  const parsed = parseExpenses(expenses);
  if (!parsed) {
    return new Response('Invalid expenses', { status: 400 });
  }

  console.log('saving expenses', session.userId, parsed);

  await db.application.update({
    where: { id: params.applicationId },
    data: { expenses: parsed },
  });

  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { count } = await db.application.updateMany({
    where: { id: params.applicationId, userId: session.userId },
    data: { expenses: {} },
  });

  if (count === 0) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(null, { status: 204 });
}
