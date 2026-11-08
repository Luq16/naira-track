import { EmptyState } from '@/components/empty-state';
import { Screen } from '@/components/screen';

export default function TransactionsScreen() {
  return (
    <Screen showAddButton>
      <EmptyState
        icon={{ ios: 'list.bullet.rectangle', android: 'receipt_long', web: 'receipt_long' }}
        title="No transactions yet"
        message="Tap + to record your first income or expense."
      />
    </Screen>
  );
}
