/**
 * Naira Track design tokens: colours (light + dark), spacing and radii.
 * Every screen reads colours through `useAppTheme()` so dark mode works everywhere.
 */

export const Colors = {
  light: {
    text: '#101828',
    textSecondary: '#5B6475',
    background: '#F6F7F9',
    card: '#FFFFFF',
    border: '#E4E7EC',
    backgroundElement: '#EEF1F4',
    primary: '#0B7A4B', // naira green
    primaryText: '#FFFFFF',
    primarySoft: '#E3F4EC',
    hero: '#0B7A4B',
    heroText: '#FFFFFF',
    heroTextSecondary: '#E6F4EC',
    income: '#0B7A4B',
    expense: '#C8372D',
    warning: '#9A5B00',
    tabInactive: '#667085',
  },
  dark: {
    text: '#F2F4F7',
    textSecondary: '#A3ABB9',
    background: '#0D1117',
    card: '#161B22',
    border: '#262D36',
    backgroundElement: '#1C222B',
    primary: '#2FBF7F',
    primaryText: '#04140C',
    primarySoft: '#123526',
    hero: '#12603F',
    heroText: '#F2F4F7',
    heroTextSecondary: '#CFE6DA',
    income: '#3DD68C',
    expense: '#FF6B5E',
    warning: '#F5B544',
    tabInactive: '#8B95A5',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

/** Bottom padding: room for the floating "+" button, or a normal page margin. */
export const FabClearance = 96;
export const MaxContentWidth = 640;
