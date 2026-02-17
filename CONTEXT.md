# Vela — Complete Development Context

## What Is Vela
Vela is a date night planning app for guys who want to plan great dates for their partner. The user takes a quiz about their partner's preferences, and Vela recommends, scores, and helps plan dates from a library of 90+ ideas across 8 categories. Built by Diego.

**Live URL:** https://vallotaventures.com
**GitHub:** https://github.com/Diegs12/Datenight.git
**Stack:** React (Create React App), single-file architecture (`src/App.js` — 1674 lines), inline styles (no CSS framework), deployed on Vercel.

---

## Architecture Overview

### Single-File App: `src/App.js`
Everything lives in one file. Here's the component tree and major sections:

**Utility Helpers (lines 1-5):**
- `T` — Theme constant with all colors, fonts
- `crd()` — Card style helper
- `btn()` — Base button style helper (border-radius: 8, standard sizing)
- `btnHero()` — Metallic gradient CTA button (linear-gradient from #FFD0A1 → #D68853 → #8B4A28, with glow shadow and inset highlight)
- `inp()` — Input style helper
- Helper functions: `getTier()`, `getGrad()`, `getMood()`, `isInSeason()`

**Data Constants (lines ~6-273):**
- `BTIERS` — Budget tier definitions (Free, Cheap, Mid, Pricey, Splurge)
- `EMOJI` — Category emoji map
- `CAT_ACCENT` — Category accent color map
- `GRAD` — Category gradient map for cards
- `MOOD_MAP` — Mood analysis map
- `DRESS_HINTS`, `RED_HERRINGS` — For mystery invite generation
- `HYPE_TEMPLATES`, `SUGGESTED_TEXTS` — For anticipation notification system
- `DATES` — Array of 90 date objects, each with: id, title, description, category, budget, difficulty, duration, vibe[], instructions[], materials[], variations[], is_trending, is_top_week, is_new_release
- `QUIZ` — Array of 13 quiz questions (q1-q13)

**Categories:** chill, food, creative, outdoor, adventure, nightlife, romantic, meaningful

**Components (in order of appearance):**

1. **`generateICS()`** (line ~275) — Creates .ics calendar file for date invites
2. **`MysteryInvite`** (line ~294) — Mystery box invite modal (hides date details, sends teaser + calendar file)
3. **`RealInvite`** (line ~480) — Full details invite modal
4. **`MiniCalendar`** (line ~360) — Interactive calendar date picker
5. **`ScheduleModal`** (line ~416) — Modal to pick a date for scheduling
6. **`InvitePicker`** (line ~442) — Choose between mystery or full invite
7. **`PlanPromptModal`** (line ~536) — Generates an AI prompt for ChatGPT/Claude to fully plan the date
8. **`HypePanel`** (line ~613) — Anticipation-building notification panel with copyable text messages
9. **`QuizFlow`** (line ~662) — 13-question onboarding quiz
10. **`Debrief`** (line ~699) — Post-date debrief modal (rate reaction, notes, repeat?)
11. **`Detail`** (line ~734) — Full date detail view (bottom sheet style)
12. **`Card`** (line ~806) — Gradient date card (used in scrollable rows and grid)
13. **`Dashboard`** (line ~841) — Main app with 5 tabs + surprise mode
14. **`Welcome`** (line ~1460) — Name entry screen
15. **`Splash`** (line ~1483) — Animated splash screen with Vela wordmark
16. **`UnlockScreen`** (line ~1565) — Email/phone collection after quiz
17. **`getPartnerVibe()`** (line ~1613) — Personality engine that analyzes quiz answers
18. **`VibeReveal`** (line ~1627) — Full-screen partner personality reveal
19. **`App`** (line ~1659) — Root component with screen routing

### App Flow (screen states)
```
splash → (returning user?) → dashboard
splash → welcome (enter name) → quiz (13 questions) → unlock (email/phone) → vibe_reveal (partner personality) → dashboard
```

### Dashboard Tabs
- **Home** — Stats, Surprise Me button, Generate Month button, For You row, Outside the Box row, Stretch Budget row, Next Up scheduled dates, mission banner (first-time)
- **Calendar** — Scheduled dates list with Send Invite + Plan This Date buttons
- **Library** — Search, budget filter, category filter, Recommended For You, Trending, Top This Week, New Releases, All Dates grid
- **Memories** — Completed dates with debrief data
- **Profile** — Partner vibe card, stats, quiz answers, retake button

### Surprise Me (Swipe Mode)
Tinder-style card swiping. Swipe right = schedule, left = skip. Info button opens Detail view. Cards are weighted by quiz score. Accessed from Home tab.

---

## Theme / Brand

### Colors
```javascript
const T = {
  bg: "#141414",        // Warm dark grey background
  surface: "#1C1C1E",   // Card/surface background
  surfaceAlt: "#242420", // Alternative surface
  border: "#2E2A26",    // Borders
  primary: "#D68853",   // Burnished copper (main accent)
  accent: "#D68853",    // Same as primary
  green: "#4ade80",     // Success/done
  yellow: "#D68853",    // Warning/hype (also copper)
  text: "#F5F0EB",      // Primary text (warm white)
  textDim: "#A39E98",   // Secondary text
  textFaint: "#6B6560", // Tertiary text
  pink: "#C49080",      // Invite accent
  purple: "#9A8AAA",    // Plan accent
  font: "'Inter', sans-serif",
  display: "'Playfair Display', serif"
};
```

### Fonts (loaded in index.html)
- **Playfair Display** (400-800) — Display/headlines, logo wordmark
- **Inter** (300-700) — Body/UI text

### Logo Treatment
Metallic gradient wordmark "vela" in Playfair Display:
```css
background: linear-gradient(180deg, #FFD0A1 10%, #D68853 50%, #8B4A28 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
filter: drop-shadow(0px 0px 20px rgba(232, 117, 50, 0.5));
```

### Button Styles
- `btn()` — Standard buttons: border-radius 8, padding 11px 22px, transition 0.15s
- `btnHero()` — Primary CTA buttons with metallic gradient:
  ```javascript
  background: "linear-gradient(180deg, #FFD0A1 0%, #D68853 40%, #8B4A28 100%)"
  color: "#141414"
  boxShadow: "0 0 20px rgba(214,136,83,0.45), 0 4px 12px rgba(139,74,40,0.3), inset 0 1px 0 rgba(255,208,161,0.4)"
  ```
  Currently applied to: Surprise Me, Schedule This Date, Schedule It, Shuffle & Restart, Let's Find Her Dates (VibeReveal)

---

## Scoring Engine (`scoreDate()`, line ~919)

Analyzes each of the 90 dates against quiz answers. Returns `{ score, flags }`.

**Scoring factors:**
- Vibe match (q3): +4 per match, -2 if no matches
- Energy level (q1): +3 if category fits, -2 if mismatch
- Budget (q12): +3 if within, -5 if over
- Physical activity (q4): -3 for hard activities if "Light walks max"
- Alcohol (q7): -6 if non-drinker and date involves alcohol
- Friday night preference (q2): +2 for matching categories
- Cuisine match (q8): +2 per matching cuisine keyword

**Feed sections built from scores:**
- **For You** — score ≥ 4, no alcohol/budget flags, top 12
- **Outside the Box** — score > 0, has mismatch flags, not in For You, top 8
- **Stretch the Budget** — has budget flag, no alcohol flag, top 8

---

## localStorage Keys (all prefixed `vela_`)
- `vela_name` — User's first name
- `vela_quiz` — JSON of quiz answers (q1-q13)
- `vela_sched` — JSON array of scheduled dates
- `vela_hist` — JSON array of completed dates with debrief data
- `vela_email` — User's email (collected at unlock)
- `vela_phone` — User's phone (collected at unlock)
- `vela_seen_tips` — JSON array of feature tip keys already shown
- `vela_mission_done` — "1" if mission banner dismissed

---

## Contextual Tooltip System (line ~866)

Replaced the old 7-step tutorial overlay. Now each feature shows a one-time tooltip popup on first click:

```javascript
const FEATURE_TIPS = {
  home: { icon: "🕯️", title: "Your Home Base", desc: "..." },
  library: { icon: "📚", title: "The Date Library", desc: "..." },
  calendar: { icon: "📅", title: "Your Upcoming Dates", desc: "..." },
  memories: { icon: "💾", title: "Date Memories", desc: "..." },
  profile: { icon: "👤", title: "Your Profile", desc: "..." },
  surprise: { icon: "🎲", title: "Surprise Me", desc: "..." },
};
```

Triggered by `showTipIfNew(key)` on tab clicks and Surprise Me activation. Tracked in `vela_seen_tips` localStorage. Dismisses permanently after first view.

---

## Partner Personality Engine (`getPartnerVibe()`, line ~1613)

Analyzes q1 (energy) and q3 (vibes) to assign one of 8 personality types:
- 🕯️ The Cozy Queen — Homebody + Chill/low-key
- ⚡ The Thrill Seeker — Adventurous or Spontaneous
- ✨ The Hopeless Romantic — Romantic + Bougie
- 🎨 The Creative Soul — Creative/artsy
- 🎯 The Fun One — Playful/competitive
- 📚 The Deep Thinker — Intellectual/curious
- 🌿 The Outdoor Type — Athletic/outdoorsy
- 💫 The Vibe — Fallback for everything else

Shown on: VibeReveal screen (after unlock) + Profile tab vibe card.

---

## Hype/Anticipation System (line ~992)

Time-aware notification system that checks every 60 seconds. For each scheduled date, generates notifications at:
- **Night Before** (36-12 hours): Reminder + suggested text to send partner
- **Morning Of** (12-2 hours): Day-of nudge
- **1 Hour Before** (2-0 hours): Final prep nudge

Each notification has a copyable suggested text message. Dismissed notifications tracked in state.

---

## Build & Deploy
```bash
# Build (CI=false to avoid treating warnings as errors)
CI=false npx react-scripts build

# Git — push from your terminal (sandbox doesn't have git credentials)
git add -A && git commit -m "message" && git push

# Vercel auto-deploys from main branch
```

---

## PENDING TASKS (in priority order)

### 1. Button Styling — DONE
All primary CTAs now use `btnHero()` metallic gradient. Full list: Surprise Me, Generate This Month's Dates, Schedule This Date, Schedule It, Shuffle & Restart, Let's Find Her Dates, Quiz Next/Finish, PartnerScreen Continue, Unlock My Dates, Debrief Save, Send Invite (both mystery + real modals), Got It (tooltip dismiss). Secondary/small buttons intentionally left as `btn()`.

### 2. q10/q11 Text Matching in scoreDate() — DONE
Free-text quiz answers are now fuzzy-matched against each date's title, description, variations, vibes, and category. Tokenizer strips punctuation, removes 80+ stop words, and filters short words. q10 (best date so far) gives +3 on match, q11 (want to try) gives +4 on match (higher weight = explicit intent).

### 3. Remaining Brand Guidelines
- **UI texture/warmth**: Subtle grain overlays, more depth in cards, warm glow effects
- **Brand voice copy updates**: Review all user-facing text for consistency with Vela's tone (confident, slightly irreverent, like a buddy who actually plans good dates)
- **Landing page alignment**: The Welcome screen could be more polished to match the brand

### 4. Future Ideas (discussed but not committed to)
- Logo/wordmark integration throughout the app (header already has it)
- More date library content
- Seasonal rotation improvements
- Backend/database for actual user persistence (currently all localStorage)

---

## Quiz Questions Reference (q1-q13)
- q1: Energy level (single) — Homebody / Balanced / Active / Adventurous
- q2: Ideal Friday night (single) — Couch+movie / Restaurant / Out with friends / Spontaneous
- q3: Vibes (multi) — Romantic, Playful, Creative, Athletic, Intellectual, Chill, Bougie, Spontaneous
- q4: Physical activity comfort (single) — Light walks / Moderate / Anything / More active than me
- q5: Food allergies (multi) — Dairy, Gluten, Peanuts, Tree nuts, Shellfish, Eggs, Soy, Sesame, None
- q6: Food preferences (multi) — Vegetarian, Vegan, Pescatarian, Keto, No pork, No red meat, Halal, Kosher, No restrictions
- q7: Alcohol (single) — Doesn't drink / Occasional / Loves trying / Can out-drink me
- q8: Cuisine favorites (multi) — Italian, Mexican, Japanese, Thai, Indian, Mediterranean, American, Korean, French, Chinese
- q9: Food dislikes (free text)
- q10: Best date so far (free text) ← NOT YET USED IN SCORING
- q11: Things they want to try (free text) ← NOT YET USED IN SCORING
- q12: Budget (single) — Under $20 / $50 / $100 / Over $100 / Mix it up
- q13: Date frequency (single) — 1x/2x/3x per month / Every week

---

## Key Design Decisions Already Made
- Dark mode only (warm dark, not cold)
- Burnished copper as the signature accent color
- Metallic gradient for primary CTAs (matching the logo)
- No tutorial overlay — contextual tooltips instead
- Partner personality reveal as a dedicated screen in onboarding
- Mission banner (dismissible) instead of long intros
- Swipe interface for date discovery
- Mystery invite concept (hide date details from partner)
- AI plan prompt generator (copy prompt to paste into ChatGPT/Claude)
- Anticipation/hype notification system
- Single-file React architecture (intentional for simplicity)

---

## Testing the App Fresh
To test as a new user, clear localStorage:
```javascript
// In browser console
Object.keys(localStorage).filter(k => k.startsWith("vela_")).forEach(k => localStorage.removeItem(k));
location.reload();
```

This document reflects the exact state of the codebase as of commit c1857e5.
