# VELA Launch Roadmap

**This Weekend - Free Launch - Amazon Affiliate Revenue**
Print this out. Check things off. Ship it.
vallotaventures.com

---

## DAY 1 — Thursday: Fix & Finalize

**Goal: Get every technical issue resolved. Zero warnings. Zero missing pieces.**

### Block 1: Critical Fixes (1 hour)

- [ ] **Update manifest.json with Vela branding** (2 min)
  - Change short_name to 'Vela', name to 'Vela — Date Night, Figured Out', theme_color to '#141414', background_color to '#141414'. Keep icon paths as-is.

- [ ] **Fix unused rateDate variable (build warning)** (2 min)
  - In src/App.js, find the rateDate function that is assigned but never used. Either remove it entirely if it's dead code, or add an eslint-disable comment if we plan to use it later. Then run `CI=false npx react-scripts build` and confirm zero warnings.

- [ ] **Fix splash image alt text** (1 min)
  - In src/App.js, find the vela-icon-splash.png img tag and change `alt=''` to `alt='Vela logo'`. Accessibility fix.

- [ ] **Add React Error Boundary to App root** (15 min)
  - Add an ErrorBoundary class component to src/App.js that catches errors and shows a friendly 'Something went wrong, tap to reload' screen styled with Vela theme (dark background #141414, copper text #D68853). Wrap the main App return in this ErrorBoundary.

- [ ] **Create privacy policy page (Amazon Associates requirement)** (30 min)
  - Add a privacy policy screen accessible from the profile tab. Cover: what data we collect (name, email, quiz answers stored in localStorage), Amazon Associates affiliate links, no selling data to third parties, contact email dvallota12@gmail.com. Style with Vela theme. Add 'Privacy Policy' link in profile tab footer.

### Block 2: Code Quality Sweep (30 min)

- [ ] **Run production build — confirm zero errors AND zero warnings** (5 min)
  - Run: `CI=false npx react-scripts build`. If there are ANY warnings, fix them. Then run WITHOUT CI=false to see all warnings. Fix every single one. Perfectly clean build.

- [ ] **Audit all localStorage reads — confirm try/catch on every one** (10 min)
  - Search App.js for every localStorage.getItem and localStorage.setItem call. Confirm each one is wrapped in try/catch. localStorage can throw in private browsing mode.

- [ ] **Test the full user flow end-to-end** (15 min)
  - Clear localStorage, walk through: splash > partner name > quiz (all 13 questions) > unlock screen > vibe reveal > dashboard. Then test: scheduling a date, sending a mystery invite, Surprise Me mode, library, profile tab.

### Block 3: Performance & Polish (30 min)

- [ ] **Check bundle size — identify any bloat** (5 min)
  - Main JS bundle should be under 200KB gzipped. If bigger, look for opportunities to reduce.

- [ ] **Add sitemap.xml for SEO** (5 min)
  - Create public/sitemap.xml with a single entry for https://vallotaventures.com/. Update public/robots.txt to reference the sitemap.

- [ ] **Test Open Graph preview** (5 min)

- [ ] **Verify all Amazon affiliate links work** (10 min)
  - Click through 3-4 date ideas with materials. Confirm Amazon search URL includes `tag=vallotaventur-20` and loads correctly.

---

## DAY 2 — Friday: Deploy & Test

**Goal: Ship to production. Test on real devices. Fix anything that breaks.**

### Block 1: Commit & Deploy (15 min)

- [ ] **Commit all changes with clear message** (5 min)
  - Stage all modified files. Commit: 'Launch prep: privacy policy, error boundary, manifest branding, code cleanup'. Push to main.

- [ ] **Verify Vercel auto-deploy completes** (5 min)

- [ ] **Check live site at vallotaventures.com** (5 min)

### Block 2: Real Device Testing (45 min)

- [ ] iPhone Safari — full flow test (15 min)
- [ ] iPhone Chrome — full flow test (15 min)
- [ ] Android Chrome (if available) — full flow test (10 min)
- [ ] Quiz scroll on small screens (5 min)
- [ ] Multi-select quiz options wrap without overflow (2 min)
- [ ] Swipe cards in Surprise Me mode (2 min)
- [ ] Mystery invite email link works (5 min)
- [ ] Affiliate links open Amazon correctly on mobile (2 min)

### Block 3: Fix Mobile Bugs (1-2 hours, if needed)

- [ ] Fix any layout/overflow issues found on mobile (varies)
- [ ] Fix any touch/interaction issues (varies)
- [ ] Re-deploy after fixes (5 min)

---

## DAY 3 — Saturday: Soft Launch

**Goal: Get real humans using it. Collect feedback. Amazon clicks start flowing.**

### Block 1: Share with Inner Circle (1 hour)

- [ ] Text 10 friends/couples the link personally (20 min)
- [ ] Post to your personal Instagram story (10 min)
- [ ] Write a genuine post for Twitter/X (15 min)
- [ ] Share in any group chats (couples groups, friend groups) (10 min)
- [ ] Ask 3 people to try the full quiz and give honest feedback (5 min)

### Block 2: Content Creation (1-2 hours)

- [ ] Record TikTok #1: 'I built an app that plans date nights' (20 min)
- [ ] Record TikTok #2: 'Date night ideas under $20 that she'll love' (20 min)
- [ ] Record TikTok #3: Screen recording of the quiz + vibe reveal (15 min)
- [ ] Post all 3 — hashtags: #datenight #dateideas #couplegoals #relationship (10 min)
- [ ] Submit to r/SideProject on Reddit with your build story (20 min)

### Block 3: Monitor & Iterate (ongoing)

- [ ] Check Amazon Associates dashboard for clicks (5 min)
- [ ] Collect feedback from friends — write down top 3 complaints (15 min)
- [ ] Fix the #1 most-reported issue immediately (30 min)

---

## DAY 4+ — Sunday & Next Week

**Goal: Keep momentum. Start building toward premium tier.**

### Sunday

- [ ] Post 2 more TikToks based on what performed Saturday (30 min)
- [ ] Reply to any comments or DMs about Vela (15 min)
- [ ] Review feedback and prioritize fixes for Monday (20 min)

### Next Week: Backend & Premium

- [ ] **Set up Firebase/Supabase project — raw event capture** (1 hour)
  - Auth (email/password) + single events table. Pipe ALL user actions into it unstructured: swipes (left/right + date ID), schedules, completions, ratings, debrief responses, quiz answers, affiliate link clicks. Timestamps on everything. No schema optimization yet — just capture so you're not losing data from day one. Keep localStorage as offline cache, backend as source of truth.

- [ ] **Wire up event logging in App.js** (1-2 hours)
  - Add a simple `logEvent(type, payload)` function that writes to the backend. Hook it into: quiz completion, date swipe, date schedule, date complete, rating submit, debrief submit, material link click, Surprise Me usage. Fire-and-forget — don't block the UI.

- [ ] **Set up Stripe account + RevenueCat** (1 hour)

- [ ] **Build the paywall — gate features behind premium** (2 hours)
  - Free tier: partner quiz, vibe reveal, 5 date recommendations. Premium unlocks: full 154+ date library, Surprise Me mode, mystery invites, AI planner, date memories, hype texts. Upgrade screen: $9.99/mo or $59.99/yr.

- [ ] **Add Vercel Analytics or Google Analytics** (15 min)

- [ ] **Post 3-5 TikToks this week** (2 hours)

### Later: Structure the Data & Learn

- [ ] **After 2-3 weeks of real users, analyze raw event data** (2 hours)
  - Pull the unstructured event log. Answer: which dates get swiped right most? Which get scheduled but never completed? Which get the highest ratings? What vibe types are most common?

- [ ] **Build admin dashboard** (1 day)
  - Date performance table: times shown, swipe-right rate, schedule rate, avg rating, completion rate. User cohort view: total users, retention, common vibe types, avg dates/month.

- [ ] **First quarterly content rotation** (2 hours)
  - Use admin data to identify the 10 worst-performing dates. Cut them. Add 10 fresh ones with full metadata (materials, budget, category, tips, variations). Update MATERIAL_LINKS for new materials.

- [ ] **Smart personalization (v2)** (ongoing)
  - Move scoreDate() server-side with real aggregate data. Collaborative filtering: "users with similar vibe profiles also loved X." A/B test new dates against existing catalog.

---

*Ship it. Don't overthink it.*
