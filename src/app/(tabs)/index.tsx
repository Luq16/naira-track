import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

// Placeholder values until the database is added in Milestone 1.
const ZERO = '₦0.00';

const monthFormatter = new Intl.DateTimeFormat('en-NG', { month: 'long', year: 'numeric' });

export default function HomeScreen() {
  const theme = useAppTheme();
  const monthLabel = monthFormatter.format(new Date());

  return (
    <Screen showAddButton>
      <ThemedText type="small" themeColor="textSecondary">
        {monthLabel}
      </ThemedText>
      <Card style={{ backgroundColor: theme.hero, borderColor: theme.hero }}>
        <ThemedText type="heading" style={{ color: theme.heroTextSecondary }}>
          Total balance
        </ThemedText>
        <ThemedText type="amount" style={{ color: theme.heroText }}>
          {ZERO}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.heroTextSecondary }}>
          Across all accounts
        </ThemedText>
      </Card>

      <View style={styles.row}>
        <Card style={styles.half}>
          <ThemedText type="heading" themeColor="textSecondary">
            Income
          </ThemedText>
          <ThemedText type="subtitle" themeColor="income">
            {ZERO}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            This month
          </ThemedText>
        </Card>
        <Card style={styles.half}>
          <ThemedText type="heading" themeColor="textSecondary">
            Expenses
          </ThemedText>
          <ThemedText type="subtitle" themeColor="expense">
            {ZERO}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            This month
          </ThemedText>
        </Card>
      </View>

      <Card>
        <ThemedText type="smallBold">Spending by category</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Charts will appear here once you start adding transactions.
        </ThemedText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  half: {
    flex: 1,
  },
});
