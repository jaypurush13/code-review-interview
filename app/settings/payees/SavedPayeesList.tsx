'use client';

import { useEffect, useState } from 'react';
import { maskAccountNumber, payeeDisplayName } from '@/lib/payees/formatPayee';
import type { Payee } from '@/types/payee';

export function SavedPayeesList() {
  const [payees, setPayees] = useState<Payee[]>([]);
  const [visiblePayees, setVisiblePayees] = useState<Payee[]>([]);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/payees?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPayees(data.payees);
        setLoading(false);
      });
  }, [query]);

  useEffect(() => {
    const q = query.toLowerCase();
    setVisiblePayees(
      payees.filter((p) => payeeDisplayName(p).toLowerCase().includes(q)),
    );
  }, [payees, query]);

  async function handleRename(payee: Payee, nickname: string) {
    payee.nickname = nickname;
    setPayees(payees);
    setEditingId(null);

    await fetch(`/api/payees/${payee.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    });
  }

  async function handleDelete(payee: Payee) {
    await fetch(`/api/payees/${payee.id}`, { method: 'DELETE' });
    setPayees((prev) => prev.filter((p) => p.id !== payee.id));
  }

  return (
    <section>
      <h2>Saved payees</h2>

      <label htmlFor="payee-search">Search payees</label>
      <input id="payee-search" type="search" value={query}
        onChange={(e) => setQuery(e.target.value)} />

      <p aria-live="polite">{loading ? 'Loading payees…' : ''}</p>
      {!loading && visiblePayees.length === 0 && <p>No payees to show.</p>}

      <ul>
        {visiblePayees.map((payee, i) => (
          <li key={i}>
            {editingId === payee.id ? (
              <input autoFocus defaultValue={payeeDisplayName(payee)}
                aria-label={`Nickname for ${payeeDisplayName(payee)}`}
                onBlur={(e) => handleRename(payee, e.target.value)} />
            ) : (
              <span>{payeeDisplayName(payee)}</span>
            )}
            <span>{maskAccountNumber(payee.accountNumber)}</span>
            <button type="button" onClick={() => setEditingId(payee.id)}>Rename</button>
            <button type="button" aria-label={`Delete ${payeeDisplayName(payee)}`}
              onClick={() => handleDelete(payee)}>✕</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
