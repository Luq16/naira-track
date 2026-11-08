# Financial Tracking App — Project Plan

_Drafted 2026-11-08 · Updated: mobile app, Nigerian market_

## 1. Goal

A **mobile app (iPhone and Android)** for tracking personal income and expenses. It sorts spending into categories, sets monthly budgets, and shows where the money goes through simple charts and reports.

**Who it's for (first version):** one person tracking their own money on their own phone. Data is stored on the device, so it works offline.

**Target market: Nigeria 🇳🇬**

## 1a. Designing for Nigeria

| Local reality | What the app does about it |
|---|---|
| Most phones are **Android**, many of them low- to mid-range | **Android first**, iPhone second. Small download, fast on 2–3 GB RAM phones, tested on an older Android device |
| Mobile data is expensive and network coverage is patchy | **Fully offline**, no required sign-up, no heavy images, nothing downloaded in the background |
| **Naira** is the main currency, and many people also hold USD | Default currency **NGN (₦)**, stored in kobo. Formatted `₦1,250,000.00`, with short form `₦1.25m` on charts. A USD account is supported from v1 |
| People bank with many banks and fintechs (GTBank, Access, Zenith, First Bank, UBA, OPay, PalmPay, Moniepoint, Kuda…) | Account presets with bank names; CSV import templates for the most common bank statement formats |
| Spending is announced by **bank SMS/email debit alerts** | v2: read debit/credit alerts and suggest transactions (Android only, see note in section 8) |
| High inflation | Month-on-month comparisons, budgets that are easy to adjust, "same month last year" view |
| Local spending patterns | Default categories adapted to Nigeria (see below) |

**Default Nigerian categories:**
- **Expense:** Food & Market, Airtime & Data, Transport (Bolt/Uber, bus, okada/keke), Fuel (car & generator), Electricity (prepaid tokens), Rent (often paid yearly), School Fees, Family Support, Church/Mosque (tithe, offering, zakat), Ajo/Esusu contributions, Bank & POS charges, Health, Owambe & Gifts, Subscriptions (DSTV/GOtv, Netflix), Shopping, Other
- **Income:** Salary, Business, Side Hustle, Gifts, Interest, Other

**Yearly costs spread across months:** rent and school fees are often paid in one large sum, so the app can show them as a monthly "set aside" amount (₦1.2m rent ≈ ₦100k/month).

**Language:** English for v1; Pidgin, Yoruba, Hausa and Igbo can be added later. The app is built ready for translations from day one.

## 2. Scope

### MVP (version 1)
1. **Accounts:** create accounts (e.g. Cash, Bank, Credit Card), each with an opening balance and currency.
2. **Transactions:** add, edit and delete income, expense and transfer entries. Fields: date, amount, account, category, payee, note.
   - **Quick-add** with a big "+" button, so an expense can be logged in a few seconds.
   - Swipe left on an entry to edit or delete it.
3. **Categories:** a default set (Food, Rent, Transport, Salary…) with icons and colours, which can be added to, renamed or removed.
4. **Budgets:** a monthly limit per category, with spent / remaining / percent used.
5. **Dashboard (Home):** current balances, this month's income vs. expenses, spending by category (donut chart) and a 6–12 month trend.
6. **Search and filters:** by date range, account, category, amount or text.
7. **CSV import and export:** import a bank statement from the phone's Files app, and export/share a backup file.
8. **App lock:** optional Face ID / fingerprint / PIN to open the app.

### Later (version 2+)
- **Bank alert reader (Android):** turns pasted or shared bank SMS/email debit alerts into transactions (GTBank, Access, Zenith, OPay, etc.)
- **Ajo/Esusu tracker:** contribution schedule and when your payout turns come
- **Debts and IOUs:** money lent to and borrowed from friends and family
- **Open-banking sync** via Nigerian providers (Mono or Okra) to pull transactions automatically
- Reminders and notifications (e.g. "log today's spending", "80% of Food budget used")
- Recurring transactions (rent, subscriptions) created automatically
- Savings goals with progress tracking
- Multi-currency with exchange rates
- Rules that auto-categorise imported transactions by payee
- Receipt photos taken with the camera
- User login and cloud sync/backup across devices
- Home-screen widget showing this month's spending
- Optional AI insights (e.g. "you spent 30% more on dining this month")

### Out of scope
- Connecting directly to banks in v1 (Mono/Okra): this adds cost, security and compliance work, so CSV import covers it for now. It is planned for v2.
- Moving money, paying bills or buying airtime from inside the app (that would need a payment licence/partner).
- Investment and trading features.

## 3. Proposed tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React Native with Expo (TypeScript)** | One codebase for iPhone and Android; test instantly on your own phone with the Expo Go app |
| Navigation | Expo Router | Screens and tabs set up from the folder structure |
| Local database | **expo-sqlite** + **Drizzle ORM** | Works fully offline, fast, typed queries and migrations |
| Charts | react-native-gifted-charts | Donut, bar and line charts that look native |
| Forms and validation | React Hook Form + Zod | Clean forms, input checking |
| Security | expo-local-authentication, expo-secure-store | Face ID / fingerprint lock, safe storage of the PIN |
| Files | expo-document-picker, expo-sharing, Papa Parse | CSV import from Files, export/share backups |
| Testing | Jest + React Native Testing Library; Maestro for end-to-end | |
| Builds and release | EAS Build / EAS Submit | Builds the App Store and Play Store versions in the cloud |

**Money handling rule:** store amounts as **integers in minor units** (kobo/cents), never floats, to avoid rounding errors.

**How you'll test it:** on your own **Android phone** by scanning a QR code with Expo Go, on an Android emulator (Android Studio), and on your Mac with the iOS Simulator (needs Xcode). No developer account is needed until you publish. An APK can also be shared directly with testers in Nigeria before the app is on the Play Store.

_Alternative:_ Flutter (Dart) is the main other choice. Expo is suggested because it uses JavaScript/TypeScript, which you already use for n8n.

## 4. Data model (first draft)

```
Account      id, name, type (cash|bank|credit|savings), currency, openingBalance, archived, createdAt
Category     id, name, kind (income|expense), color, icon, parentId?
Transaction  id, date, amount (integer, minor units), type (income|expense|transfer),
             accountId, toAccountId? (transfers), categoryId?, payee, note, createdAt, updatedAt
Budget       id, categoryId, month (YYYY-MM), limitAmount
Settings     defaultCurrency, dateFormat, appLockEnabled, theme
```

An account's balance = openingBalance + income − expenses ± transfers (calculated, not stored, so it can never drift out of sync).

## 5. Screens

Bottom tab bar with 4 tabs plus a floating "+" button:

1. **Home:** balances, month summary, charts, budget warnings
2. **Transactions:** list grouped by day, search and filter, swipe to edit/delete
3. **Budgets:** monthly limits with progress bars
4. **More:** Accounts, Categories, Import/Export, Settings, App lock

Pop-up screens: **Add/Edit Transaction** (number pad first, then category picker), **Add/Edit Account**, **Add/Edit Category**, **CSV Import** (column mapping and preview).

Light and dark mode, following the phone's setting.

## 6. Folder structure

```
Test_project/
├── PLAN.md
├── README.md
├── app.json                   # Expo config (name, icon, bundle id ng.nairatrack.app)
├── src/
│   ├── app/                   # Expo Router screens
│   │   ├── _layout.tsx        # root stack, theme, splash/font loading
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx    # bottom tab bar
│   │   │   ├── index.tsx      # Home
│   │   │   ├── transactions.tsx
│   │   │   ├── budgets.tsx
│   │   │   └── more.tsx
│   │   └── transaction/
│   │       ├── new.tsx        # add modal
│   │       └── [id].tsx       # edit modal (Milestone 3)
│   ├── components/            # UI pieces (Screen, Card, AddButton, forms, lists, charts)
│   ├── constants/theme.ts     # colours (light/dark), spacing, radii
│   ├── hooks/                 # useAppTheme, useColorScheme
│   ├── db/                    # Drizzle schema, migrations, seed data (Milestone 1)
│   └── lib/                   # money helpers, balance/budget calculations, CSV import (Milestone 1+)
├── assets/                    # app icon, splash screen
└── tests/                     # unit + end-to-end tests (Milestone 1+)
```

## 7. Build milestones

| # | Milestone | Done when |
|---|---|---|
| 0 | **Setup:** git repo, Expo + TypeScript project, tab navigation, theme | Empty app with 4 tabs runs in the Android emulator and on your phone |
| 1 | **Data layer:** SQLite schema, migrations, seed data, money helpers + unit tests | App opens with sample accounts and transactions |
| 2 | **Accounts and categories:** add/edit/delete screens | Can manage both on the phone |
| 3 | **Transactions:** quick-add, edit/delete, list with search and filters | Can log a month of spending comfortably |
| 4 | **Home dashboard:** balances, monthly summary, charts | Charts reflect the real data |
| 5 | **Budgets:** monthly limits, progress, over-budget warnings | Warnings show when a limit is passed |
| 6 | **CSV import/export and app lock** | A real bank CSV imports; Face ID/PIN lock works |
| 7 | **Polish:** app icon, splash screen, empty states, dark mode, end-to-end tests | Feels like a finished app on iPhone and Android |
| 8 | **Release (optional):** EAS builds, Play internal testing with Nigerian testers first, then TestFlight, store listings | App installable from the stores |

Each milestone is a small, working step that can be tested on the phone before moving on.

## 8. Quality and safety

- Amounts always in integer minor units; currency formatting only at display time.
- Validate every input (no negative transfer amounts, valid dates, existing accounts).
- Unit tests for balance, budget and CSV parsing logic.
- Data stays on the device; the optional app lock protects it if the phone is shared. Export gives a backup.
- **Nigeria Data Protection Act 2023 (NDPA):** v1 keeps all data on the phone, which keeps compliance simple. Still publish a privacy policy. Once any data leaves the phone (cloud sync, analytics, bank connections), get consent, store data securely, and check whether registration with the Nigeria Data Protection Commission (NDPC) is required.
- **SMS permission:** Google Play strictly limits apps that read SMS. The v2 bank-alert reader should therefore start with "paste or share the alert into the app", not automatic SMS reading.
- Publishing needs a Google Play account (US$25 one-time) and, for iPhone, an Apple Developer account (US$99/year), plus a privacy policy for the store listings. If the app is ever paid, price it in Naira and consider local payment options (Paystack/Flutterwave) for a web subscription.
- If cloud sync is added later: authentication, per-user data isolation, encrypted transfer (HTTPS).

## 9. Open questions for you

1. **Phones:** Android first, then iPhone (proposed)? Which Android phone can you test on?
2. **Stack:** happy with React Native + Expo, or prefer Flutter?
3. **Business model:** free, free with a premium tier, or paid? This decides whether we need accounts and payments (Paystack/Flutterwave).
4. **Users:** individuals only, or also small business owners/traders (who would need business vs. personal separation)?
5. **Banks:** which 2–3 banks' statements or alerts should be supported first?
6. **Anything missing** from the MVP list that matters most to your users?

## 10. Git branching workflow

| Branch | Purpose | Who/what merges into it |
|---|---|---|
| `master` | **Production.** Only released, store-ready code. Each release is tagged (`v1.0.0`, `v1.1.0`…) | Merged from `test` once testing passes |
| `test` | **Testing/QA.** Code being checked on real phones and shared as test builds (APK / Play internal testing / TestFlight) | Merged from `develop` when a milestone is ready to test |
| `develop` | **Day-to-day development.** Integrates finished features | Merged from `feature/*` branches |
| `feature/<name>` | One feature or milestone, e.g. `feature/transactions`, `feature/csv-import` | Branched from `develop`, merged back into `develop` |
| `hotfix/<name>` | Urgent fix to the live app | Branched from `master`, merged into `master`, `test` and `develop` |

**Flow:** `feature/*` → `develop` → `test` → `master`

**Rules:**
- No direct commits to `master` or `test`; they change only through merges (pull requests once the repo is on GitHub).
- Tests must pass before merging into `test`; manual phone testing must pass before merging into `master`.
- Version number goes up in `app.json` on each release to `master`.
