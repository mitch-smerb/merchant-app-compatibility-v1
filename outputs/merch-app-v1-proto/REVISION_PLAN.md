# Merchant App V1 - Comprehensive Revision Plan

---
**Status:** IN REVIEW (Mitch reviewing feedback, then collaborative implementation)
**Last Updated:** October 30, 2025
**Source:** Consolidated feedback from Plink team + AI design experts (Figma Make, GPT-5)
**Implementation Approach:** Group changes logically → propose best-in-class UI/UX → iterate with Plink requirements → implement
---

## Executive Summary

This revision plan addresses critical SMB psychology gaps in the Plink merchant app. While the technical execution is excellent, the app currently speaks in internal/technical language rather than merchant language. These revisions will transform it into a merchant-confidence-building advertising dashboard.

**Core Strategy:** Shift from technical jargon to business language, add advertising context throughout, provide competitive benchmarking, show visual campaign connection, and simplify terminology.

---

## Priority Framework

### 🚨 CRITICAL (Must Fix - User Confusion)
Issues causing immediate user confusion and blocking comprehension.

### 🎯 HIGH IMPACT (Business Value Communication)
Features that significantly improve value perception and engagement.

### 💰 MEDIUM (Polish & Features)
Enhancements that complete the SMB app experience.

---

## 🚨 CRITICAL PRIORITY CHANGES

### 1. Welcome/Landing Screen (NEW)
**Status:** New component required
**Rationale:** App assumes merchants remember what Plink does. SMB reality: they sign up, forget details, need constant value reinforcement.

#### Core Changes
- Create new `WelcomeScreen.tsx` component
- Implement two-phase onboarding for first-time users:
  - **Phase 1:** Educational carousel (with "don't show again" checkbox)
    - How Plink works: Receives data → Segments → Creates campaigns → Publishes
    - Why Plink is better: ROI-based, best attention, only locals, no robots
  - **Phase 2:** Status dashboard (always shown)
    - Hero: "✅ Your Plink Advertising is Active"
    - Sub-hero: "Reaching {45,823} local shoppers with targeted campaigns"

#### Design Pattern
**Three-card overview:**

**Card A - Status:**
- "✓ Ads running"
- "✓ Priority placement: Active — {Neighborhood}"
- Status indicators with checkmarks

**Card B - Reach (30d):**
- "{XX,XXX} purchase-verified, human, local shoppers"
- Badge: "✓ Purchase-verified, human, local shoppers"

**Card C - Impressions (30d):**
- "{XXX,XXX} in logged-in sessions (~30% higher attention)"
- Badge: "✓ Logged-in delivery — ~30% higher attention"

**CTA:** "See Your Advertising Performance >"

#### Optional Enhancement (V2)
- Ad Campaign carousel showing 3-4 active campaign cards
- Thumbnail, campaign name, "About this campaign" popover
- Eye candy, not required for V1

**Dependencies:** None
**Files:** New: `WelcomeScreen.tsx`, `OnboardingCarousel.tsx`

---

### 2. Advertising Language Integration
**Status:** Copy changes across all screens
**Rationale:** This is advertising analytics that doesn't feel like advertising. Merchants think in terms of "customers," "sales," "advertising results."

#### Screen Header Changes

**Current → Revised:**
- "Area Reach" → "Advertising Reach (Area)"
  - Subheader: "{Area label}"

- "Neighborhood Reach" → "Advertising Reach (Neighborhood)"
  - Subheader: "Priority placement in {Neighborhood}"

- "Current Shoppers" → "Your Current Shoppers"
  - Subheader: "Identified & Protected (30d)"

#### Navigation Updates
- Bottom nav tabs: **Area • Neighborhood • Shoppers**
- Keep labels short but ensure advertising context in headers
- Fix navigation highlighting (currently broken in Incentives screen)

**Dependencies:** All screen components
**Files:**
- `AreaAudienceScreen.tsx`
- `NeighborhoodAudienceScreen.tsx`
- `CurrentShoppersScreen.tsx`
- `Navigation.tsx` / `BottomNav.tsx`

---

### 3. Navigation Fixes
**Status:** Bug fix required
**Rationale:** Broken highlighting and inconsistent navigation undermines user confidence.

#### Issues to Fix
- Incentives Controller bottom nav highlights wrong tab
- Should highlight **Shoppers** when inside Incentives
- Ensure consistent tab behavior across all screens
- Headers and nav tabs must align everywhere

**Dependencies:** Navigation component architecture
**Files:** `BottomNav.tsx`, `IncentiveControllerScreen.tsx`

---

### 4. Terminology Clarification
**Status:** Copy and component changes
**Rationale:** Merchant-friendly language removes barriers to comprehension.

#### Key Term Changes

**"Bank-Authenticated" → Alternative Needed:**
- **Challenge:** Merchants need to understand they're saving 30% by avoiding bots
- **Recommended:** "Purchase-verified, human, local shoppers"
- **Badge copy:** "✓ Purchase-verified, human, local shoppers"
- **Context:** "You're beating out the bots!" framing

**"Priority Placement" → Add Explainer:**
- Merchants won't remember this term
- Add expandable under Neighborhood header:
  - **"What is Priority Placement?" ▸**
  - Content: "Your ads get first position with shoppers spending in {Neighborhood}. Slots are limited."
- Repeat small shield icon near badges for visual association
- Build into consistent explainer pattern system

**"Local Market Share" → Rename:**
- **Issue:** Title and UI don't read clearly
- **Option A (recommended for V1):** "Local vs Other Spend (30d)"
  - Bar: Local (blue) | Other (neutral)
  - Caption: "Used to target local spenders (vs national)"
  - Badge: "✓ Targets using local vs national spend"
- **Option B (future):** "Local Heartbeat (30d)" with sparkline

**Dependencies:** Copy system, badge component
**Files:** Badge system, explainer components, all screen copy

---

## 🎯 HIGH IMPACT CHANGES

### 5. Campaign Carousel - Visual Advertising Connection
**Status:** New component
**Rationale:** This is advertising that doesn't show ads. Merchants want to see actual ads running, not just metrics.

#### Implementation
**Location:** Area Reach screen (first screen after landing)

**Component:** "Your Active Ad Campaigns" section
- 3-4 Plink campaign cards in carousel
- Seasonal/cultural theme graphics (Ring In the New Year, Fall Savings, etc.)
- Campaign status indicators: "Campaign created • Protection on • Publishing"
- Tap card for campaign description popup
- Reinforces "these are your ads running"

#### Content Structure
For each campaign, Plink outputs:
- Campaign content (parameters, graphics, text)
- Campaign collateral (email, social, print content)
- Thematic graphic representing live campaign

**Question to resolve:** What presentation drives merchant satisfaction? The goal is showing work done on their behalf without requiring them to leave the app.

**Optional V2 additions:**
- Campaign performance (clicks, impressions, conversions - **need Plink definition**)
- Ad spend vs results clear ROI connection - **need Plink context definition**

**Dependencies:** Campaign data API, graphics assets
**Files:** New: `CampaignCarousel.tsx`, update: `AreaAudienceScreen.tsx`

---

### 6. Priority Placement Explainers
**Status:** New explainer component
**Rationale:** Value clarification for competitive advantage.

#### Pattern Implementation
Create `PriorityExplainer` collapsible component:
- Icon system: Shield icon for exclusivity/priority
- "What is Priority Placement?" expandable
- "Learn about your competitive advantage >" link pattern
- Consistent with explainer system across app

#### Placement
- Neighborhood screen: Under header
- Repeated shield icon near relevant badges
- Tooltip on hover/tap for mobile
- "Why this matters to your business" framing

**Dependencies:** Explainer pattern system
**Files:** New: `PriorityExplainer.tsx`, `ExplainerPattern.tsx`

---

### 7. Merchant Benchmarking
**Status:** New feature (deferred to V2 with MVP approach)
**Rationale:** "Am I doing better than my competitors?" is the #1 SMB question.

#### Proposed Implementation
**"How You Compare" card:**
- Top/Middle/Bottom thirds by category
- Metrics: Spend / Transactions / Frequency / Visitors
- Actionable insights based on position

#### Endorphin Strategy
**Challenge:** Only 20% can be in top 20%

**Solution:** Change the denominator
- Plink has selected crème of the crop to pursue
- Compare against larger base of identified merchants
- Multiple cohort comparisons allow more merchants to receive good news
  - Top 20% of cohort 1 (category + area)
  - Top 20% of cohort 2 (category nationally)
  - Top 20% of cohort 3 (area all categories)

**Examples:**
- "You're in the TOP 25% of restaurants in Austin"
- "Your customers spend 23% more than average"
- "You rank #3 in customer loyalty in your area"

**Dependencies:** Benchmarking data system, cohort definitions
**Files:** New: `MerchantBenchmarking.tsx` (V2)
**Status:** Deferred - needs data infrastructure

---

### 8. Chart Improvements - Visual Clarity
**Status:** Component updates
**Rationale:** Make performance differences unmistakable.

#### Neighborhood Comparison Chart Enhancement
**Current issue:** +23% advantage not visually obvious

**Improvements:**
- **Card title:** "Your Audience Value vs Average (30d)"
- **Bars:**
  - "Priority audience" (bold blue #334bc1)
  - "Average neighborhood shopper" (muted gray)
- **Label above bars:** "+23%" (large, numeric, not just in badge)
- **Badge:** "✓ Priority audience spent +23% vs average (30d)"
- Make 23% difference look visually significant (bar height/color contrast)

**Optional merge:**
- Move "Avg # txns/shopper" and "Avg spend/shopper" above chart as compact tiles
- Main card becomes clean "Audience Spending Behavior"

**Dependencies:** Chart component library
**Files:** `NeighborhoodAudienceScreen.tsx`, chart components

---

## 💰 MEDIUM PRIORITY CHANGES

### 9. Billing Enhancements - Pricing Transparency
**Status:** Component updates
**Rationale:** Trust & ROI clarity, complete SMB app experience.

#### Core Enhancements
**Value summary line (add under total):**
- "$1,350 sales from Local Shoppers (30d) → $117.50 fee"
- Clear ROI connection

**"What You Got" bullets:**
- Map 1-to-1 to app badges:
  - Reach: "{XX,XXX} purchase-verified shoppers"
  - Impressions: "{XXX,XXX} logged-in sessions"
  - Priority: "Exclusive placement in {Neighborhood}"
  - Purchases: "{XXX} protected customer transactions"

**Download invoice CTA:**
- Add button for invoice download

#### Pricing States to Support
1. **Min fee month:** $59 display
2. **Intro discount:** $29 flat for N months
3. **Cap reached:** Badge display when $199 cap hit
4. **Monthly cap:** Show "Cap: $199" (configurable per merchant)
5. **Incentives included:** "Incentive costs included in your fee" or "Included up to $X"

**Configuration:**
- Add `config.pricing` for per-merchant overrides (JSON/flag)
- Allows showing cap/discounts without DB changes

**Dependencies:** Pricing data, configuration system
**Files:** `BillingScreen.tsx`, pricing config

---

### 10. Shoppers Screen Refinements
**Status:** Copy and badge updates
**Rationale:** Language clarity, proof + safeguard positioning.

#### Header Updates
- Title: "Your Current Shoppers"
- Subtitle: "Identified & Protected (30d)"
- Rationale: Advertising app that protects revenue by separating customers is a unique value prop

#### Copy Refinements
**Campaigns section:**
- "Campaigns" → "Automated campaigns running"
- Helper text: "Count = live shoppers eligible right now"
- Alternative: Link to FAQ
- Add: "On by default" indicator

**Badges:**
- Keep: "✓ Incentives require incremental spend"
- Add helper caption: "Current shoppers must spend more than before to earn rewards"
- Comparison: "✓ Your shoppers spend more than average"
- Add baseline note: "baseline = program average"

**Dependencies:** Badge system
**Files:** `CurrentShoppersScreen.tsx`

---

### 11. Incentives Messaging - Expectation Management
**Status:** Component updates
**Rationale:** Avoid "coupon clippers" fear, address low redemption concerns.

#### Guardrail Strip (add to top)
**Visual indicators:**
- "Spend controls on"
- "Incremental spend required"
- "Per-shopper limits active"

#### New Metrics
- **Net Incentive Spend (30d)** tile
- **Effective Rate:** (incentive ÷ verified sales)

#### Messaging Framework
**"Exposure vs Redemption" explainer:**
- "Your reach: 15,000 | Your redemptions: 12" framing
- "Plink drives awareness, not just coupons" messaging
- Success metrics beyond redemptions

#### Pagination
- For long lists: "Show last 30 days"
- "View earlier in Campaign Center" link

#### Navigation Fix
- Bottom nav should highlight **Shoppers** when inside Incentives

**Dependencies:** Incentive metrics calculation
**Files:** `IncentiveControllerScreen.tsx`

---

## CONSISTENCY & DESIGN PATTERNS

### Badge System Standardization
**Create `ClaimBadge` component with single source of truth**

#### Standard Badge Copy (✓ prefix, state-confirmed voice):
- ✓ Purchase-verified, human, local shoppers
- ✓ Logged-in delivery — ~30% higher attention
- ✓ Targets using local vs national spend
- ✓ Priority placement active — {Neighborhood}
- ✓ Priority audience spent +23% vs average (30d)
- ✓ Current shoppers identified & separated
- ✓ Incentives require incremental spend
- ✓ Program shoppers outspend program average

**Implementation:**
- Build one `ClaimBadge` component
- Source copy from single map/config
- Future-proofs for personalized content integration

**Files:** New: `ClaimBadge.tsx`, `badgeContent.ts`

---

### Time Window Standardization
**Issue:** Visual clutter from repeated time indicators

#### Rules:
- Default: **(30d)** across app
- Put window **only in card title** (e.g., "Reach (30d)")
- Don't repeat "(30d)" in values or badges (unless comparison - keep in +23% badge)
- Exception: Incentives uses **MTD**
  - Label "MTD" in card title
  - Add helper line: "Resets on {date}"
  - Don't mix windows without clear labels

**Question:** Can we indicate time in one place to reduce visual clutter?

**Files:** All screen components, time formatting utilities

---

### Number Formatting Consistency
**Create `formatShortNumber` and `formatCurrencyShort` utilities**

#### Standards:
- Shorten big values: **$2.85M**, **$67.3K**, **7.2%**
- Consistent decimals: 0 or 1 everywhere (choose one)
- Apply same formatter across:
  - Spend displays
  - Fee calculations
  - Badges
  - All numeric values

**Files:** New: `formatters.ts`, apply across all components

---

### Explainer Pattern System
**Create consistent explainer UI across app**

#### Pattern Components:
- 🔵 Info icon + "Learn more" expandable
- Tooltip on hover/tap (mobile-friendly)
- "Why this matters to your business" framing
- Action-oriented insights

#### Icon System:
- ✓ for "proven" states
- 🛡️ Shield for Priority/exclusivity
- 🎯 Target for targeting features
- 📊 Graph for attention/performance
- Adds variety without noise

**Files:** New: `ExplainerPattern.tsx`, `Tooltip.tsx`

---

### Micro Consistency

#### Capitalization:
- Sentence case in badges
- Title case in headers/cards

#### Icons:
- Same size/weight in all badges
- Consistent color usage

#### Spacing:
- 16px outer rhythm
- Stat cards equal height in pairs
- Consistent padding across cards

#### Accessibility:
- Bump pastel backgrounds to meet WCAG AA for 12-14px text
- Ensure sufficient contrast ratios
- Maintain focus indicators

**Files:** Design system, global styles

---

## SMB PSYCHOLOGY PRINCIPLES (Future Enhancements)

### 1. Competitive Benchmarking System ⭐
**Status:** Deferred to V2
Covered in High Impact #7 above

---

### 2. ROI-Focused Metrics Reframing
**Status:** Incremental improvement
**Current:** Technical metrics like "Coverage: 85%, Density: 92%"

**Needed:** Business outcome reframing
- "Your ads reach 85% of your target customers"
- "High customer density — 92% — delivers better ad performance"
- "Estimated monthly revenue impact: $2,847"

**Dependencies:** Revenue impact calculation model
**Files:** Metric display components
**Priority:** Medium (V1.5)

---

### 3. Social Proof Elements
**Status:** Missing, needs specific recommendation
**Rationale:** Social proof completely absent

**Examples suggested:**
- "Similar businesses see 34% increase in foot traffic"
- "Average Plink merchant gains 127 new customers/month"
- "Your performance vs. typical first 3 months" chart

**Question:** What Plink-specific social proof fits constraints and objectives?

**Dependencies:** Aggregate merchant data, privacy considerations
**Priority:** Medium (V2)

---

### 4. Value Explainers for Metrics
**Status:** Part of explainer pattern system
**Covered in consistency section above**

**Mobile-friendly tooltip pattern:**
- "Why this matters" explanation
- "What good looks like" benchmark
- "How to improve" action item

---

### 5. Business Impact Calculations
**Status:** Needs definition
**Rationale:** Provide CLV context for advertising value

**Examples:**
- "12,467 protected customers" → "Est. value: $47,000/month"
- "68.2% engagement" → "23% above restaurant average"
- "156% performance" → "ROI: $3.20 for every $1 spent"

**Plink-specific metrics needed:**
- CLV of Local Shopper in their audience
- Value of protected customer
- Frame as "advertising to customers worth $X" rather than standalone CLV

**Dependencies:** CLV calculation model, category benchmarks
**Priority:** High (V2)

---

### 6. Differentiation Framing
**Status:** Copy refinement
**Pattern:** Frame unique advantages with "Only Plink" language

**Examples:**
- Current: "Targets using local vs national spend"
- Revised: "**Only Plink** targets using local vs national spend"

**Additional:**
- "You're winning attention: Banking channels deliver 30% greater attention than social media"
- Emphasize bot-free environment as unique advantage

**Dependencies:** Competitive analysis validation
**Files:** Copy throughout app
**Priority:** Medium (V1.5)

---

## ACTION-ORIENTED INSIGHTS (Philosophical Conflict)

### The Conflict
**SMB App Pattern:** Businesses want insights paired with actions they can take
**Plink Philosophy:** "We do the work for you" — merchant doesn't need to do anything

### The Resolution
**Approach:** Meet customer where they are — show reasoning, show action taken

#### UI Pattern: Reasoning Steps (OpenAI-style)
**Visual flow showing:**
1. **Insight:** "Reviewing data to see where you are in frequency"
2. **Analysis:** "Merchants in your category: X purchases in Y days. You: A purchases in B days"
3. **Action taken:** "Plink is shifting to highlighting Frequency Campaigns"
4. **Result:** "You are now running a Fall Special encouraging frequency"

**Merchant options:**
- "Alert us if greater frequency is not your goal"
- "Did we make a mistake on category?"
- "Here's what you could do elsewhere in your business" (data-driven suggestions)

### Implementation Status
**Priority:** Medium (V2)
**Requirements:**
- Define action MVP
- Design reasoning visualization
- Merchant override/feedback mechanism

**Files:** New reasoning display component
**Dependencies:** AI decision-making transparency system

---

## CONFLICTS & QUESTIONS TO RESOLVE

### 1. Area Reach Screen Title
**Options:**
- A: "Your Advertising Performance" (suggested - uses word "performance" head-on)
- B: "Your Advertising Reach" (current with "advertising" added)
- C: "Local Shopping Trends" (alternative suggested)

**Decision needed:** Which best answers merchant's #1 question "is it performing?"

---

### 2. Neighborhood Screen Title
**Options:**
- A: "Your Priority Targeting" (positioning as prioritized audience)
- B: "Advertising Reach (Neighborhood)" (consistent with Area)
- C: "Your Priority Audience" (audience-focused)

**Decision needed:** Emphasize priority placement or maintain consistency?

---

### 3. Campaign Performance Metrics
**Questions:**
- How does Plink define conversions?
- What constitutes success in Plink context?
- How to present ad spend vs results ROI?

**Blocker:** Need Plink-specific definitions before implementing campaign carousel details

---

### 4. Campaign Carousel Presentation
**Question:** What presentation of campaign work drives merchant satisfaction?

**Available content:**
- Campaign parameters, graphics, text
- Campaign collateral (email, social, print)
- Thematic graphics (seasonal/cultural)
- Status indicators

**Decision needed:** Balance between showing work done vs. keeping merchant in app

---

### 5. Brevity vs. Completeness in Badges
**Issue:** Badge copy is excellent but may be too long

**Question:** Should badges be shorter for visual simplicity?

**Examples:**
- Current: "✓ Purchase-verified, human, local shoppers"
- Shorter: "✓ Verified local shoppers" (with explainer for details)

**Decision needed:** Prioritize self-explanatory vs. scannable

---

### 6. Time Window Display Location
**Question:** Can we indicate time in one place to reduce visual clutter?

**Principle:** UI simplicity paramount, only necessary characters on screen

**Options:**
- A: Only in card titles (recommended)
- B: Global time indicator (single location)
- C: Current approach (repeated)

**Decision needed:** Balance clarity vs. simplicity

---

### 7. Action-Oriented Insights Implementation
**Conflict:** SMB pattern vs. Plink "we do the work" philosophy

**Options:**
- A: Full reasoning display (shows thinking + action taken)
- B: Results-only (what we did, not why)
- C: Hybrid (reasoning available on request)

**Decision needed:** How transparent should AI decision-making be?

---

### 8. Social Proof Specifics
**Question:** What Plink-specific social proof fits our constraints?

**Considerations:**
- Privacy requirements
- Data availability
- Accuracy/defensibility
- Merchant segment differences

**Decision needed:** Specific implementation examples

---

### 9. "Local Market Share" Replacement
**Options:**
- A: "Local vs Other Spend (30d)" — fast, clear (recommended V1)
- B: "Local Heartbeat (30d)" — brand-forward, sparkline (V2)
- C: Replace entire section with different metric

**Decision needed:** V1 approach (A likely) and V2 roadmap

---

### 10. ClaimBadge Future-Proofing
**Question:** Does this pattern future-proof for personalized content integration?

**Consideration:** As app develops more data, will single badge system support:
- Dynamic personalization
- A/B testing
- Merchant-specific messaging

**Decision needed:** Architecture review for scalability

---

## DEFERRED/EXCLUDED ITEMS

### Excluded from V1
1. **Merchant Benchmarking** — Requires data infrastructure (V2)
2. **Action-Oriented Insights reasoning UI** — Philosophical alignment needed (V2)
3. **Social Proof elements** — Specific implementation undefined (V2)
4. **Business Impact Calculations** — CLV model needed (V2)
5. **"Local Heartbeat" visualization** — Brand enhancement (V2)
6. **Campaign performance metrics** — Conversion definitions needed (V1.5)
7. **ROI-focused metric reframing** — Revenue model needed (V1.5)

### Deferred Questions
1. Campaign carousel detailed presentation
2. Plink conversion definitions
3. Social proof specific examples
4. CLV calculation methodology
5. Action insight implementation approach

---

## IMPLEMENTATION ROADMAP

### Phase 1: Critical Fixes (Week 1-2)
**Goal:** Remove user confusion, establish context

1. Welcome/Landing Screen
   - Build WelcomeScreen.tsx
   - Educational carousel (first-time)
   - Status dashboard (always shown)

2. Advertising Language Integration
   - Update all headers
   - Update all subheaders
   - Standardize nav tabs

3. Navigation Fixes
   - Fix Incentives highlighting
   - Ensure consistent behavior

4. Terminology Clarification
   - Replace "bank-authenticated"
   - Add Priority Placement explainer
   - Rename "Local Market Share"

**Success metrics:**
- Users understand advertising context immediately
- No confusion about screen purposes
- Navigation works consistently

---

### Phase 2: High Impact Features (Week 3-4)
**Goal:** Communicate business value clearly

5. Campaign Carousel
   - Build CampaignCarousel.tsx
   - Integrate campaign graphics
   - Add tap-for-details

6. Priority Placement Explainers
   - Build explainer pattern system
   - Implement shield icon system
   - Add expandable components

7. Chart Improvements
   - Enhance neighborhood comparison
   - Make +23% visually significant
   - Improve color contrast

**Success metrics:**
- Merchants see their ads visually
- Competitive advantages clear
- Performance differences obvious

---

### Phase 3: Polish & Completion (Week 5-6)
**Goal:** Complete SMB app experience

8. Billing Enhancements
   - Add value summary
   - Support all pricing states
   - Add invoice download

9. Shoppers Screen Refinements
   - Update copy
   - Add helper text
   - Clarify badges

10. Incentives Messaging
    - Add guardrail strip
    - New metrics
    - Expectation management

11. Consistency Implementation
    - ClaimBadge component
    - Number formatting
    - Time windows
    - Micro consistency

**Success metrics:**
- Pricing fully transparent
- Incentive expectations realistic
- Professional, consistent feel

---

### Phase 4: Future Enhancements (V2)
**Goal:** Advanced SMB psychology features

- Merchant Benchmarking system
- Business Impact Calculations
- Social Proof elements
- Action-Oriented Insights reasoning UI
- ROI-focused metric reframing

**Prerequisites:**
- Data infrastructure
- CLV calculation model
- Competitive analysis
- Philosophical alignment on merchant actions

---

## DEPENDENCIES MATRIX

### External Dependencies
- **Campaign data API:** Campaign carousel (Phase 2)
- **Graphics assets:** Campaign visuals (Phase 2)
- **Pricing configuration:** Billing states (Phase 3)
- **Benchmarking data:** Merchant comparison (V2)
- **CLV model:** Business impact (V2)

### Internal Dependencies
- **Badge system:** Multiple screens depend on ClaimBadge
- **Explainer pattern:** Priority placement, tooltips, all screens
- **Navigation architecture:** All screens depend on consistent nav
- **Formatters:** All numeric displays depend on standard formatting
- **Time window constants:** All metrics depend on standard periods

### Sequential Dependencies
1. **Badge system** must exist before screen refinements
2. **Explainer pattern** must exist before Priority Placement explainers
3. **Navigation fixes** must precede screen-specific updates
4. **Number formatters** must exist before chart improvements

---

## ACCEPTANCE CRITERIA

### Critical Priority (Must Have)
- ✅ Welcome screen shows advertising context immediately
- ✅ First-time users see educational carousel
- ✅ All screens use advertising language in headers
- ✅ Navigation highlights correct tab on all screens
- ✅ "Bank-authenticated" replaced with merchant-friendly term
- ✅ Priority Placement has clear explainer
- ✅ "Local Market Share" renamed and clarified

### High Impact (Should Have)
- ✅ Campaign carousel shows 3-4 active ads with visuals
- ✅ Priority Placement uses shield icon consistently
- ✅ Neighborhood comparison shows +23% visually clearly
- ✅ Explainer pattern system implemented
- ✅ Chart color contrast meets WCAG AA

### Medium Priority (Nice to Have)
- ✅ Billing shows value summary and all pricing states
- ✅ Shoppers screen has "Protected" terminology
- ✅ Incentives shows guardrails and expectation messaging
- ✅ ClaimBadge component used throughout
- ✅ Number formatting consistent across app
- ✅ Time windows standardized

### Future (V2)
- ⬜ Merchant benchmarking shows competitive position
- ⬜ Business impact calculations show CLV context
- ⬜ Social proof elements validate performance
- ⬜ Action-oriented insights show reasoning

---

## KEY PRINCIPLES (Design Philosophy)

### 1. Business Language Over Technical Jargon
- Merchants think: "customers," "sales," "advertising results"
- Not: "area reach," "coverage," "density"
- Every term must answer: "What does this mean for my business?"

### 2. Advertising Context Everywhere
- This is an advertising dashboard — make it explicit
- Show ads, not just metrics
- Connect numbers to campaign visuals
- Reinforce value at every touchpoint

### 3. Competitive Benchmarking
- SMB #1 question: "Am I doing better than competitors?"
- Provide context for all numbers
- Show rankings, comparisons, peer performance
- Give endorphins through strategic cohort selection

### 4. Visual Campaign Connection
- Show actual ads running
- Campaign carousel is eye candy that matters
- Visual proof > numeric proof for SMBs
- Reinforce "we're doing work for you"

### 5. Simplify Without Dumbing Down
- 8th grade reading level for copy
- But sophisticated in insight
- Clear explainers for complex concepts
- Mobile-friendly tooltips

### 6. "We Do The Work" Philosophy
- Show reasoning, show action taken
- Merchant doesn't need to do anything
- But transparency builds trust
- Action recommendations frame as "you could" not "you must"

### 7. Validate and Celebrate
- "You're crushing it" messaging
- Performance confirmation
- Status badges that reassure
- ROI clarity builds confidence

### 8. One Question Per Screen
- Each screen answers one core question
- Clear hierarchy of information
- Single CTA or next step
- Reduce cognitive load

---

## QUESTIONS FOR MITCH

### Strategic Decisions Needed
1. **Area Reach title:** "Your Advertising Performance" vs alternatives?
2. **Neighborhood title:** "Your Priority Targeting" vs "Advertising Reach (Neighborhood)"?
3. **Badge brevity:** Keep detailed or shorten with explainers?
4. **Time window display:** One location or card titles?
5. **Campaign carousel:** What presentation drives satisfaction without requiring merchant to leave app?

### Definitions Required
1. How does Plink define conversions for campaign performance?
2. What metrics constitute "success" in Plink context?
3. How to calculate/present ad spend vs results ROI?
4. CLV calculation methodology for Local Shoppers?
5. What social proof examples fit Plink constraints?

### Philosophical Alignment
1. How transparent should AI decision-making be?
2. Action-oriented insights: Show reasoning or results-only?
3. Merchant actions: Encourage or maintain "we do it all" positioning?
4. Social proof: What claims can we make/defend?

### Technical Validation
1. Does ClaimBadge architecture future-proof for personalization?
2. Campaign data API: What's available for carousel?
3. Graphics assets: What exists for campaign visuals?
4. Pricing states: What data is in DB vs needs configuration?

---

## SUCCESS METRICS (How We'll Know It Works)

### User Comprehension
- Merchants immediately understand app is for advertising
- No confusion about screen purposes
- Clear understanding of unique value props (Priority, Protected, etc.)
- Navigation flows naturally

### Value Communication
- Merchants see their ads running (visual connection)
- Competitive advantages clearly understood
- ROI and business impact transparent
- Performance differences visually obvious

### Professional Experience
- Consistent terminology and patterns
- Professional business tool feeling
- Accessible but sophisticated
- Mobile-friendly throughout

### Confidence Building
- Status confirmation reduces anxiety
- Pricing transparency builds trust
- Explainers answer questions proactively
- Realistic expectations prevent disappointment

---

## FINAL NOTES

### What Makes This Plan Work
1. **Prioritization:** Critical fixes first, enhancements later
2. **Dependencies:** Clear understanding of what blocks what
3. **Conflicts identified:** No surprises during implementation
4. **Deferred items:** V2 roadmap clear
5. **Acceptance criteria:** Know when we're done

### What's Different From Original Feedback
1. **Consolidated duplicates:** Single source for each change
2. **Resolved contradictions:** Clear decisions on conflicts
3. **Added context:** Why each change matters
4. **Organized by impact:** Not just by screen
5. **Implementation ready:** Specific files, components, patterns

### Next Steps
1. **Mitch review:** Answer questions, resolve conflicts, approve approach
2. **Technical scoping:** Estimate effort for each phase
3. **Design iteration:** Figma updates for new components
4. **Development sprints:** Implement by priority phases
5. **Validation:** Test with merchant focus group

---

**This revision plan transforms the Plink merchant app from a technically excellent tool into a merchant-confidence-building advertising dashboard that speaks the language of small business success.**
