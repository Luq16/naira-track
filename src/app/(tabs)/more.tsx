import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';

type Item = {
  label: string;
  hint: string;
  icon: SymbolViewProps['name'];
};

// These open real screens in later milestones.
const ITEMS: Item[] = [
  {
    label: 'Accounts',
    hint: 'Cash, bank and wallets',
    icon: { ios: 'creditcard', android: 'account_balance_wallet', web: 'account_balance_wallet' },
  },
  {
    label: 'Categories',
    hint: 'Food, Airtime & Data, Transport',
    icon: { ios: 'tag', android: 'sell', web: 'sell' },
  },
  {
    label: 'Import / Export',
    hint: 'Bank statement CSV, backups',
    icon: { ios: 'arrow.up.arrow.down', android: 'swap_vert', web: 'swap_vert' },
  },
  {
    label: 'App lock',
    hint: 'Fingerprint, Face ID or PIN',
    icon: { ios: 'lock', android: 'lock', web: 'lock' },
  },
  {
    label: 'Settings',
    hint: 'Currency (₦), date format',
    icon: { ios: 'gearshape', android: 'settings', web: 'settings' },
  },
];

export default function MoreScreen() {
  const theme = useAppTheme();

  return (
    <Screen>
      <Card style={styles.list}>
        {ITEMS.map((item, i) => (
          // Rows become tappable links as each screen is built.
          <View
            key={item.label}
            accessible
            accessibilityLabel={`${item.label}, coming soon`}
            accessibilityHint={item.hint}
            accessibilityState={{ disabled: true }}
            style={[
              styles.row,
              i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border },
            ]}>
            <View style={[styles.icon, { backgroundColor: theme.primarySoft }]}>
              <SymbolView name={item.icon} size={20} tintColor={theme.primary} />
            </View>
            <View style={styles.text}>
              <ThemedText>{item.label}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                {item.hint}
              </ThemedText>
            </View>
            <View style={[styles.badge, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.badgeText}>
                Soon
              </ThemedText>
            </View>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 0,
    gap: 0,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
  badge: {
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
