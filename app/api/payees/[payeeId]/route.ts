import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

interface RouteContext {
  params: { payeeId: string };
}

export async function PATCH(req: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { nickname } = (await req.json()) as { nickname?: string };
  if (typeof nickname !== 'string' || nickname.length > 60) {
    return new Response('Invalid nickname', { status: 400 });
  }

  const { count } = await db.payee.updateMany({
    where: { id: params.payeeId, userId: session.userId },
    data: { nickname },
  });

  if (count === 0) {
    return new Response('Not found', { status: 404 });
  }

  return Response.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  await db.payee.delete({ where: { id: params.payeeId } });

  return new Response(null, { status: 204 });
}
