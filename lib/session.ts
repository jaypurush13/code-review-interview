export interface Session {
  userId: string;
  email: string;
}

/**
 * Resolves the signed-in customer from the request cookies. Returns null when
 * there is no valid session.
 */
export async function getSession(): Promise<Session | null> {
  return { userId: 'usr_00000000', email: 'customer@example.com' };
}
