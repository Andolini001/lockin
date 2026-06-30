# LOCKIN MVP

LOCKIN is a mobile-first social challenge app about real-life daily quests. The
current MVP runs fully on mock data and is prepared for Supabase and Telegram
Mini App integration.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

or:

```bash
npm run verify
```

## MVP Scope

- App Router routes: `/`, `/dashboard`, `/quests`, `/proof`, `/squad`,
  `/leaderboard`, `/profile`, `/share`.
- Liquid Glass UI system with reusable cards, buttons, bottom navigation,
  quest cards, progress rings, streak bar, leaderboard, proof upload and share
  card components.
- Mock user, quests, squad, leaderboard and badges in `lib/mockData.ts`.
- XP, level and quest completion helpers in `lib/xp.ts` and
  `lib/questEngine.ts`.
- Supabase client guard in `lib/supabase.ts` and schema/RLS starter in
  `supabase/schema.sql`.
- Telegram Mini App adapter stubs in `lib/telegram.ts`.
- PWA manifest in `app/manifest.ts`.

## Next Integrations

- Add real `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Apply `supabase/schema.sql`, create a Storage bucket for proof files, then
  replace local proof submission with upload + `proofs` insert.
- Add Telegram Mini App SDK initialization and authenticated launch payload
  validation.
- Add share-card image export using a DOM-to-image or canvas flow.
