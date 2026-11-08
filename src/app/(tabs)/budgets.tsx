import { EmptyState } from '@/components/empty-state';
import { Screen } from '@/components/screen';

export default function BudgetsScreen() {
  return (
    <Screen showAddButton>
      <EmptyState
        icon={{ ios: 'chart.pie.fill', android: 'pie_chart', web: 'pie_chart' }}
        title="No budgets yet"
        message="Set a monthly limit for categories like Food & Market or Airtime & Data to see how much is left."
      />
    </Screen>
  );
}
