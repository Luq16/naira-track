import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AddButton } from '@/components/add-button';
import { FabClearance, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type Props = PropsWithChildren<{
  /** Show the floating "+" (Add transaction) button. */
  showAddButton?: boolean;
}>;

/** Scrollable page body used by every tab screen. */
export function Screen({ children, showAddButton = false }: Props) {
  const theme = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: showAddButton ? FabClearance : Spacing.four },
        ]}>
        <View style={styles.inner}>{children}</View>
      </ScrollView>
      {showAddButton && <AddButton />}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.three,
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
});
