export interface Payee {
  id: string;
  userId: string;
  /** Customer-supplied label. May be absent, or blank if the user cleared it. */
  nickname?: string;
  /** Name as held at the receiving institution. Always present. */
  accountName: string;
  accountNumber: string;
  bsb: string;
  createdAt: string;
}
