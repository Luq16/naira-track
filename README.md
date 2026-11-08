# Naira Track

A personal finance tracker mobile app for Nigeria (Android first, then iPhone). Built with React Native + Expo (SDK 58), TypeScript and Expo Router.

See [PLAN.md](PLAN.md) for the full product plan and milestones.

## Run it

```bash
npm install
npx expo start
```

- **Android phone:** install **Expo Go** from the Play Store and scan the QR code shown in the terminal.
- **iPhone:** scan the QR code with the Camera app (Expo Go installed).
- **Android emulator:** press `a` in the terminal (needs Android Studio).
- **iOS Simulator:** press `i` (needs Xcode).
- **Web preview:** press `w`.

## Checks

```bash
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```

## Project layout

```
src/app/              Expo Router screens
  (tabs)/             Home, Transactions, Budgets, More
  transaction/new.tsx Add-transaction modal
src/components/       Shared UI (Screen, Card, AddButton, EmptyState, themed text)
src/constants/theme.ts Colours (light/dark), spacing, radii
src/hooks/            useAppTheme, useColorScheme
```

## Branches

`feature/*` → `develop` → `test` → `master`. See PLAN.md section 10.
