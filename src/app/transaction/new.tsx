import { EmptyState } from '@/components/empty-state';
import { Screen } from '@/components/screen';

// The real form (amount pad, category picker, account, date) arrives in Milestone 3.
export default function NewTransactionScreen() {
  return (
    <Screen>
      <EmptyState
        icon={{ ios: 'plus.circle', android: 'add_circle', web: 'add_circle' }}
        title="Quick add is on the way"
        message="Soon you'll enter an amount, pick a category and save in a few taps."
      />
    </Screen>
  );
}
