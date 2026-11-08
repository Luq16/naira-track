import { Tabs } from 'expo-router/js-tabs';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import type { ColorValue } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

function tabIcon(name: SymbolViewProps['name']) {
  return function TabIcon({ color }: { color: ColorValue }) {
    return <SymbolView name={name} size={24} tintColor={color} />;
  };
}

export default function TabLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarStyle: { backgroundColor: theme.card, borderTopColor: theme.border },
        headerStyle: { backgroundColor: theme.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '700' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: tabIcon({ ios: 'house.fill', android: 'home', web: 'home' }),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: tabIcon({
            ios: 'list.bullet.rectangle',
            android: 'receipt_long',
            web: 'receipt_long',
          }),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          title: 'Budgets',
          tabBarIcon: tabIcon({ ios: 'chart.pie.fill', android: 'pie_chart', web: 'pie_chart' }),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: tabIcon({ ios: 'ellipsis.circle', android: 'more_horiz', web: 'more_horiz' }),
        }}
      />
    </Tabs>
  );
}
