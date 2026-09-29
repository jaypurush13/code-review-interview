import { ExpensesForm } from './ExpensesForm';
import { db } from '@/lib/db';

export default async function ExpensesStepPage() {
  const application = await db.application.findUnique({
    where: { id: 'app_00000000' },
  });

  return (
    <main>
      <h1>Your expenses</h1>
      <p>
        Tell us what you spend each month. We use this to work out what you can
        comfortably afford to repay.
      </p>
      <ExpensesForm
        applicationId={application?.id ?? ''}
        initialExpenses={application?.expenses ?? {}}
      />
    </main>
  );
}
