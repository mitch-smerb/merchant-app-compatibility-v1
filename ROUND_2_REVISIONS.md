# Round 2 Revisions - Stakeholder Feedback Implementation

**Status:** In Progress
**Last Updated:** 2025-10-31
**Goal:** Near-final app (95% complete) by Friday midday for team demo
**Demo Date:** Tuesday Nov 4th - Columbia Credit Union
**Production:** November 14th

---

## Strategic Context

### Core Finding
The app delivers strong functional value but communicates in internal rather than merchant language. It shows technical excellence but misses key small-business psychology cues. The next iteration must translate technical success into business clarity.

### Fundamental Shift Required
Every screen needs to answer three merchant questions:
1. **"Is this working?"** (Is my advertising effective?)
2. **"How well am I doing?"** (Am I beating my competitors?)
3. **"What should I do next?"** (What action should I take?)

### Mindset Change
Stop being humble/technical. Act like Facebook Ads or Google Ads - confident, bold claims about exposure quality. Create distinctive "proof metrics" that only Plink can provide. This is a mature advertising platform, not an experiment.

---

## Implementation Workflow

**Our Process:**
1. Mitch provides a section of stakeholder feedback
2. Claude proposes best-in-class UI/UX solutions
3. Mitch adds Plink-specific requirements/constraints
4. Iterate until solution is solid
5. Claude implements in code
6. Repeat for next section

---

## Current Implementation: Overview Screen & Carousel

### The Problem This Solves
Merchants open the app and don't know what they're looking at. They don't remember what Plink is or what they signed up for. The landing page must re-sell the program in three seconds and set the tone for a confident, results-proven advertising platform.

### Strategic Intent
- **Orientation:** "Plink is live, my advertising is working, and this app shows me proof"
- **Psychological handshake:** "We've got you. Your advertising is running. You're part of something big"
- **Narrative foundation:** The Overview Screen defines the narrative for the whole app
- **Merchant-friendly:** Speak in business results, not advertising metrics

---

## Critical Path Implementation

### ✅ Task 1.1: Create Living Spec Document
**Status:** COMPLETE
**File:** `ROUND_2_REVISIONS.md` (this document)

---

### 🔄 Task 2: Audiences Screen (Default Landing)

#### Task 2.1: Update Area Audience as Default Landing
**File:** `src/pages/AreaAudience/index.tsx` (existing)
**Route:** `/area-audience` → rename to `/audience`
**Priority:** CRITICAL PATH

**Changes:**
1. Rename route from `/area-audience` to `/audience`
2. Keep all existing content (KPIs, metrics, visualizations)
3. Make this the default landing screen (remove Overview screen concept)
4. Add space for Announcement Footer (replaces bottom nav initially)
5. Add space for muted Info link (persistent after first visit)

#### Task 2.2: Design System Specifications

**Install and use @plink/ui-library for new components:**
```bash
npm install @plink/ui-library  # ✅ INSTALLED
```

**Import components and tokens:**
```tsx
import { Heading, Text, colors, fontSize, fontWeight } from '@plink/ui-library';
```

**Typography Specifications:**

**Fonts (from @plink/ui-library + Design System):**
- **Headings/Display:** Montserrat (400, 500, 600, 700) - use for headings
- **Body:** Open Sans (400, 500, 600, 700) - use for body text
- **Interface/UI:** Inter (500, 700) - per design system, but @plink/ui-library doesn't include it yet
  - **Fallback:** Use Open Sans for UI elements until Inter is added to library

**Type Scale (from Design System):**
- **H-Large:** 36px (2.25rem) - `size="4xl"`
- **H-Med:** 30px (1.875rem) - `size="3xl"`
- **H-Small:** 24px (1.5rem) - `size="2xl"`
- **Body L:** 18px (1.125rem) - `size="lg"`
- **Body M:** 16px (1rem) - `size="base"`
- **Body S:** 14px (0.875rem) - `size="sm"`
- **Caption:** 12px (0.75rem) - `size="xs"`

**Component Usage:**

- **Announcement Footer headline:**
  - Component: `<Heading as="h2" size="2xl" weight="semibold">`
  - Size: `1.5rem` (24px - H-Small from design system)
  - Weight: `600` (semibold - Montserrat)
  - Line height: `tight` (1.25)
  - Color: `#ffffff` (white on primary blue background)

- **Announcement Footer buttons:**
  - Component: `<Text size="base" weight="semibold">`
  - Size: `1rem` (16px - Body M)
  - Weight: `600` (semibold)
  - Color: `#ffffff` (white)
  - Font: Open Sans

- **Info link text:**
  - Component: `<Text size="sm" weight="normal">`
  - Size: `0.875rem` (14px - Body S)
  - Weight: `400` (normal)
  - Color: `#737373` (muted gray)
  - Font: Open Sans
  - Style: Underline on "growing your verified Local Reach" portion

- **Carousel slide headlines:**
  - Component: `<Heading as="h2" size="2xl" weight="bold">`
  - Size: `1.5rem` (24px - H-Small)
  - Weight: `700` (bold - Montserrat)
  - Color: `#1C1C1C` (black)

- **Carousel slide body:**
  - Component: `<Text size="base" weight="normal">`
  - Size: `1rem` (16px - Body M)
  - Weight: `400` (normal - Open Sans)
  - Color: `#737373` (secondary text gray)

**Typography Usage Rules (from Design System):**
- **Primary text:** `#1C1C1C` (Open Sans 400/500)
- **Secondary text:** `#737373` (Open Sans 400/500)
- **Headings:** `#1C1C1C` (Montserrat 600/700)

**Color Palette from @plink/ui-library + Plink Design System:**

**Primary Colors:**
```tsx
colors.primary[500]    // #334BC1 - Plink primary blue (matches design system)
colors.primary[600]    // #2a3ea1 - Primary hover (close to design system #293d9c)
colors.accent[500]     // #30CCD5 - Plink accent cyan (matches design system)
```

**Neutrals:**
```tsx
colors.white           // #FFFFFF - White (matches design system)
colors.black           // #1C1C1C - Black (matches design system)
colors.neutral[50]     // #FAFAFA - Very light gray
colors.neutral[100]    // #F5F5F5 - Light gray background (matches design system)
colors.neutral[500]    // #737373 - Medium gray text (matches design system)
colors.neutral[600]    // #525252 - Dark gray text
colors.neutral[700]    // #404040 - Dark gray (matches design system)
colors.neutral[900]    // #1C1C1C - Almost black text (matches design system)
```

**Semantic Colors:**
```tsx
colors.success[500]    // #22C55E - Green for success (matches design system)
colors.success[50]     // #bff4d3 - Light green background
colors.success[700]    // #17843f - Darker green for contrast
colors.error[500]      // #EF4444 - Red for errors (matches design system)
colors.warning[500]    // #F59E0B - Orange for warnings (matches design system)
```

**Design System Overrides (from Plink Design System .md):**
- **Primary Hover:** Use `#293d9c` instead of `colors.primary[600]` for exact brand match
- **Input Background:** `#ededed` (design system) instead of `colors.neutral[100]`
- **Input Border:** `#DDE4EA` (design system)
- **Chart Gridlines:** Use `#f5f5f5` (design system)
- **Card Radius:** `14-18px` (design system) instead of default Tailwind
- **App Background:** `#f5f5f5` (design system)

**Colors for Announcement Footer & Components:**
- **App background:** `#f5f5f5` (design system - light gray)
- **Card background:** `#ffffff` (white)
- **Card border:** `#E5E5E5` or `#DDE4EA` (design system input border)
- **Card shadow:** Subtle shadow, `14-18px` border radius
- **Announcement Footer background:** `#334bc1` (primary blue - DECISION: bold for attention)
- **Announcement Footer hover:** `#293d9c` (primary hover from design system)
- **Announcement Footer text:** `#ffffff` (white)
- **Primary text:** `#1C1C1C` (black - design system)
- **Secondary text:** `#737373` (medium gray - design system)
- **Button background (primary):** `#334bc1`
- **Button text:** `#ffffff`
- **Button hover:** `#293d9c` (design system hover)
- **Button border (secondary):** `1px border #334bc1`
- **Info link color:** `#737373` (muted gray)

**Spacing (using Tailwind classes with existing setup):**
- **Card padding:** `p-6` (1.5rem / 24px)
- **Card gap (between cards):** `gap-4` (1rem / 16px)
- **Section spacing:** `mb-6` (1.5rem / 24px)
- **Icon size:** `w-6 h-6` (1.5rem / 24px) for card icons
- **Container padding:** `px-6` (1.5rem / 24px) horizontal

**Component Usage:**
- Use `<Heading>` and `<Text>` from `@plink/ui-library` for all text
- Use `colors` object for inline styles when needed
- **DO NOT refactor existing screens** - only use for new Overview components
- Follow design tokens from library for consistency
- Leverage existing Tailwind classes for spacing, layout, shadows

#### Task 2.3: Mock Data
**File:** Update `src/shared/mockData.ts`

Add to centralized mock data:
```typescript
export const overviewMockData = {
  activeCampaignsCount: 3,
  campaignsDetail: "New customer acquisition + Current customer retention campaigns, each with multiple optimized variations",
  localReach30d: 45823,
  impressions30d: 287425,
  performanceBenchmark: "+23%", // above average
  performanceBenchmarkLabel: "above average"
};
```

**Important:** Keep ALL mock data in `mockData.ts` for easy swap to real endpoints later.

---

### 🔄 Task 3: Onboarding Carousel

#### Task 3.1: Carousel Component
**File:** `src/components/OnboardingCarousel.tsx`
**Priority:** CRITICAL PATH

**Behavior:**
- Type: Full-screen modal overlay
- Trigger: First-time app visit (localStorage: `hasSeenOnboarding`)
- Always accessible via floating "?" help button

#### Task 3.2: Carousel Flow & Timing

**UX Flow: Results First with Delayed Overlay**

1. Merchant logs in → Overview screen loads with data immediately visible
2. **3-4 seconds later:** Carousel overlay fades in (if `hasSeenOnboarding !== true`)
   - **Research finding:** 2 seconds too short (causes annoyance), 5-7 seconds for auto-rotating carousels
   - **Our use case:** 3-4 seconds lets merchant scan results first without feeling interrupted
3. Merchant can:
   - Dismiss immediately (X button top-right)
   - Swipe/click through 4 slides
   - Check "Don't show again" on final slide
4. Floating "?" button (top-right) always available to re-launch carousel

**Why 3-4 seconds:**
- Addresses concern: "merchant engaging with numbers → popup covers it = annoying"
- Allows initial scan of metrics before education layer appears
- Respects returning merchants who remember Plink
- Pattern used by Toast, Square, other SMB platforms

#### Task 3.3: Carousel Slides

**Slide 1: Verified Purchase Data**
- **Headline:** "Plink uses verified purchase data"
- **Body:** "Before Plink, 30% of ad budgets reached people who don't shop locally."
- **Visual:** Data/verification icon (from @plink/ui-library or Lucide)
- **Progress dots:** ● ○ ○ ○
- **Navigation:** Next button →

**Slide 2: Real Local Shoppers**
- **Headline:** "Targets real local shoppers near your business"
- **Body:** "Every audience member is verified — over 25% of traffic on other platforms is bots."
- **Visual:** Location/target icon
- **Progress dots:** ● ● ○ ○
- **Navigation:** ← Back | Next →

**Slide 3: Banking Apps**
- **Headline:** "Runs your ads inside digital banking apps"
- **Body:** "Delivers 40% higher attention than social media feeds."
- **Visual:** Banking app mockup icon
- **Progress dots:** ● ● ● ○
- **Navigation:** ← Back | Next →

**Slide 4: Results Dashboard**
- **Headline:** "Shows you the results here"
- **Body:** "Track reach, engagement, and campaign performance in real time."
- **Visual:** Dashboard/chart icon
- **Progress dots:** ● ● ● ●
- **Checkbox:** ☐ "Don't show this again"
- **Button:** "Get Started →" (closes carousel, sets localStorage flag)
- **Navigation:** ← Back

**Carousel Design Specs:**
- **Max-width:** 400px
- **Positioning:** Centered on screen
- **Background overlay:** Semi-transparent backdrop (rgba for darkness/blur)
- **Slide background:** White card with shadow
- **Typography:** [Use @plink/ui-library typography tokens]
- **Icon size:** [TBD from design system]
- **Spacing:** [TBD from design system]
- **Transitions:** Smooth fade/slide animations
- **Mobile:** Swipeable
- **Desktop:** Arrow buttons for navigation
- **Exit:** X button top-right (always visible)

---

### 🔄 Task 4: Announcement Footer (Replaces Performance Banner)

#### Task 4.1: Announcement Footer Component
**File:** `src/components/AnnouncementFooter.tsx`
**Priority:** CRITICAL PATH

**Goal:** Reinforce value proposition once without covering KPIs or interrupting flow. Create method for announcing new features over time.

**What It Is:**
On first visit when there's something new to announce, the bottom navigation temporarily becomes an Announcement Footer with two actions.

**When It Shows (Trigger):**
- First visit after installation or update with notable announcement
- Appears once per announcement for each merchant
- Remember whether merchant has seen/acted on announcement (localStorage)

**Visual Spec:**
```
┌─────────────────────────────────────────────────┐
│  ✕                                              │
│                                                 │
│  "Plink grows your verified                    │
│  local shopper reach."                          │
│                                                 │
│  [Quick tour]  [Continue]                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Design (✅ FINALIZED):**
- **Height:** Double standard nav height (~128px vs ~64px)
- **Background:** `#334bc1` (primary blue - bold, attention-grabbing)
- **Text color:** `#ffffff` (white - high contrast)
- **Border radius:** `0px` (full-width footer, no radius on sides)
- **Top border:** Optional `1px solid rgba(255,255,255,0.2)` for subtle separation

**Animation (✅ FINALIZED):**
- **Trigger:** 5 seconds after page load
- **Motion:** Slide-up from bottom (translate-y from 100% to 0%)
- **Duration:** 300-400ms
- **Easing:** ease-out (Tailwind: `transition-transform duration-300 ease-out`)
- **Behavior:** Screen content pushes up (adjust padding-bottom from `pb-16` to `pb-32`)

**Layout:**
- **Dismiss "✕" button:**
  - Position: Top-left, `absolute top-4 left-4`
  - Size: `w-6 h-6` icon
  - Color: White with `opacity-80`, hover `opacity-100`

- **Headline:**
  - Typography: Montserrat 24px (H-Small), semibold (600)
  - Color: White (#ffffff)
  - Alignment: Centered
  - Max-width: `max-w-md` (448px) for readability
  - Margin: `mx-auto mb-4`

- **Buttons container:**
  - Layout: Flex row, centered, gap-3
  - Buttons: Equal width on mobile, auto on desktop
  - Padding: `px-6` horizontal

**Copy:**
- **Headline:** "Plink grows your verified local shopper reach."
- **Primary button:** "Quick tour"
- **Secondary button:** "Continue"
- **Dismiss:** "✕" at top-left

**Button Specifications (✅ FINALIZED):**

**"Quick tour" button (Primary):**
```tsx
// Visual design
Background: #ffffff (white)
Text: #334bc1 (primary blue)
Font: Open Sans, 16px (Body M), semibold (600)
Padding: px-6 py-3 (24px horizontal, 12px vertical)
Border radius: rounded-lg (8px)
Shadow: None (on colored background)

// Hover state
Background: #f5f5f5 (light gray)
Text: #334bc1 (primary blue - unchanged)
Transition: 150ms ease

// Tailwind classes
className="bg-white text-primary-500 font-semibold px-6 py-3 rounded-lg
           hover:bg-neutral-100 transition-colors duration-150"
```

**"Continue" button (Secondary):**
```tsx
// Visual design
Background: transparent
Border: 1px solid #ffffff (white)
Text: #ffffff (white)
Font: Open Sans, 16px (Body M), semibold (600)
Padding: px-6 py-3 (24px horizontal, 12px vertical)
Border radius: rounded-lg (8px)

// Hover state
Background: #ffffff (white)
Text: #334bc1 (primary blue)
Border: 1px solid #ffffff (white - unchanged)
Transition: 150ms ease

// Tailwind classes
className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg
           hover:bg-white hover:text-primary-500 transition-all duration-150"
```

**Dismiss "✕" button:**
```tsx
// Visual design
Background: transparent
Icon: X from lucide-react
Size: w-6 h-6 (24px)
Color: #ffffff with opacity-80
Stroke width: 2

// Hover state
Opacity: 100
Background: rgba(255,255,255,0.1) (subtle highlight)

// Tailwind classes
className="absolute top-4 left-4 w-6 h-6 text-white opacity-80
           hover:opacity-100 hover:bg-white/10 rounded transition-all duration-150"
```

**Interaction Rules:**
1. **Primary action ("Quick tour"):**
   - Opens the carousel
   - After carousel completes, routes to `/audience`
   - Standard bottom nav re-appears

2. **Secondary action ("Continue"):**
   - Routes directly to `/audience`
   - Standard bottom nav appears
   - Skip carousel

3. **Dismiss ("✕"):**
   - Same behavior as "Continue"
   - Routes to `/audience`
   - Standard bottom nav appears

4. **Never show again:**
   - Implied by any action (tap or dismiss)
   - Store in localStorage: `hasSeenAnnouncement_v1` = true

**Accessibility:**
- Footer is focusable but does not steal focus on load
- ESC key closes (same as ✕)
- ARIA labels for all interactive elements
- Keyboard navigation between buttons

#### Task 4.2: Muted Info Link (After First Visit)
**File:** `src/components/InfoLink.tsx` or inline in Audiences page
**Priority:** CRITICAL PATH

**What It Is:**
After first visit, replace the Announcement Footer with a muted inline link.

**Copy:**
"Info: growing your verified Local Reach."

**Behavior:**
- Clicking opens the carousel
- **One-time only:** Once clicked, link does not return
- Store in localStorage: `hasViewedInfo_v1` = true

**Visual Spec (✅ FINALIZED):**

**Position:**
- Fixed position: `fixed bottom-20` (80px from bottom, above 64px nav)
- Full width: `w-full`
- Centered text: `text-center`
- Z-index: Above content, below modals
- Background: `bg-white/80 backdrop-blur-sm` (subtle, readable over content)
- Padding: `py-2` (8px vertical)

**Typography:**
- Component: `<Text size="sm" weight="normal">`
- Font: Open Sans, 14px (Body S), normal (400)
- Color: `#737373` (muted gray)
- Line height: normal

**Link Styling:**
```tsx
// Full text: "Info: growing your verified Local Reach."
// "Info:" = plain text, no underline
// "growing your verified Local Reach" = clickable link, underlined

// Plain prefix
"Info: "
Color: #737373
No underline

// Link portion
"growing your verified Local Reach."
Color: #737373 (same gray - subtle)
Underline: text-decoration underline
Underline color: currentColor with opacity-50

// Hover state
Color: #334bc1 (primary blue - shows it's interactive)
Underline: text-decoration underline
Underline color: #334bc1
Transition: 150ms ease

// Tailwind classes
<span className="text-neutral-500">Info: </span>
<button
  className="text-neutral-500 underline decoration-neutral-500/50
             hover:text-primary-500 hover:decoration-primary-500
             transition-colors duration-150"
>
  growing your verified Local Reach.
</button>
```

**Component Structure:**
```tsx
<div className="fixed bottom-20 w-full text-center bg-white/80 backdrop-blur-sm py-2 z-10">
  <Text size="sm" weight="normal">
    <span className="text-neutral-500">Info: </span>
    <button
      onClick={handleInfoClick}
      className="text-neutral-500 underline decoration-neutral-500/50
                 hover:text-primary-500 hover:decoration-primary-500
                 transition-colors duration-150 cursor-pointer"
    >
      growing your verified Local Reach.
    </button>
  </Text>
</div>
```

**State / Memory:**
```typescript
// localStorage flags
hasSeenAnnouncement_v1: boolean  // Has seen Announcement Footer
hasViewedInfo_v1: boolean        // Has clicked Info link

// Render logic
if (!hasSeenAnnouncement_v1) {
  // Show Announcement Footer (slides up after 5 seconds)
} else if (!hasViewedInfo_v1) {
  // Show muted Info link
} else {
  // Show nothing (standard bottom nav only)
}
```

#### Task 4.3: Carousel Integration with Announcement Footer
**Behavior Changes:**

**From Announcement Footer:**
- "Quick tour" button opens carousel
- After carousel completes (last slide "Get Started" or dismiss):
  - Navigate to `/audience`
  - Show standard bottom nav
  - Set `hasSeenAnnouncement_v1 = true`

**From Info Link:**
- Link opens carousel
- After carousel completes:
  - Stay on `/audience` (already there)
  - Show standard bottom nav
  - Set `hasViewedInfo_v1 = true`
  - Remove Info link permanently

**Carousel Exit Behavior:**
- When opened from Announcement Footer → Navigate to `/audience`
- When opened from Info link → Stay on current page
- Standard bottom nav always returns after carousel closes

---

### 🔄 Task 5: Navigation Updates (Critical Path Only)

#### Task 5.1: Router Changes
**File:** `src/shared/Router.tsx`

**Changes required:**
1. Rename route from `/area-audience` to `/audience`
2. Set `/audience` as default landing (replace current `/area-audience` redirect from `/reports/home`)
3. Update redirect logic in RootPage to point to `/audience`

**Not in critical path (BACKLOG):**
- Slot-based navigation refactoring
- Add additional tabs to bottom navigation
- Other route restructuring

---

### 🔄 Task 6: Layout & Integration

#### Task 6.1: Audiences Screen Layout
**Changes to existing `/area-audience` page:**
- Keep all existing content (KPIs, StatCards, visualizations)
- Adjust bottom padding to accommodate dynamic footer
  - Default: `pb-16` (standard bottom nav)
  - With Announcement Footer: `pb-32` (double height)
  - With Info link: `pb-20` (slightly more than standard)

#### Task 6.2: Component Hierarchy
```tsx
<ResponsiveContainer>
  <ScreenLayout>
    <AudiencesScreen>
      {/* Existing AreaAudience content */}
      <ScreenHeader />
      <ScreenContent>
        <StatCards />
        {/* ...existing KPIs and charts... */}
      </ScreenContent>

      {/* Dynamic footer logic */}
      {!hasSeenAnnouncement_v1 ? (
        <AnnouncementFooter
          onQuickTour={() => openCarousel({ source: 'announcement' })}
          onContinue={() => dismissAnnouncement()}
          onDismiss={() => dismissAnnouncement()}
        />
      ) : !hasViewedInfo_v1 ? (
        <InfoLink onClick={() => openCarousel({ source: 'info' })} />
      ) : (
        <BottomNavigation activeTab="audience" onNavigate={handleNavigate} />
      )}
    </AudiencesScreen>
  </ScreenLayout>
</ResponsiveContainer>

{/* Carousel overlay (conditionally shown) */}
{isCarouselOpen && (
  <OnboardingCarousel
    onComplete={() => handleCarouselComplete()}
    onDismiss={() => handleCarouselDismiss()}
  />
)}
```

#### Task 6.3: Accessibility
- Announcement Footer: Focusable but doesn't steal focus on load
- ESC key closes Announcement Footer or Carousel
- Carousel: Keyboard navigation (arrows, Enter, ESC)
- Screen reader friendly labels for all interactive elements
- Focus management: trap focus in carousel when open
- Proper ARIA labels and roles

---

## Backlog (Not Critical Path)

### Navigation Architecture
- **Slot-based navigation implementation** (recommended pattern from research)
- **NAVIGATION.md documentation** (maps content to slots)
- **Bottom navigation updates** (add Overview tab)
- **contentMapping.ts** (single source of truth for screen arrangement)

### Graphics Design Subagent
- **Create reusable Graphics Design Subagent** for FC projects
- **Carousel slide illustrations** (SVG, integrated with Plink design system)
- **Scope:** Graphics only (creating, selecting, modifying, documenting)
- **Context:** Merchant, bank, channel partner, consumer audiences
- **Uses:** `@plink/ui-library` design tokens

### Analytics
- Track carousel view rate
- Track "Don't show again" rate
- Track "?" help button usage
- Track time on overview screen

---

## Key Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| **Landing screen** | `/audience` (existing Area Audience page) | Keep working KPIs, add announcement layer |
| **Overview screen** | REMOVED | Replaced with Announcement Footer pattern |
| **Performance banner** | REMOVED | Replaced with Announcement Footer |
| **Announcement Footer** | Slides up after 5 seconds, double nav height | Draws attention without blocking KPIs initially |
| **Footer timing** | 5 second delay before slide-up | UX research: allows KPI review first |
| **Carousel trigger** | "Quick tour" button or Info link | Optional education, not blocking |
| **Carousel timing (if auto-shown)** | N/A - user-initiated only | Removed auto-popup, fully user-controlled |
| **Info link** | One-time use, muted style | Persistent reminder after announcement dismissed |
| **localStorage flags** | `hasSeenAnnouncement_v1`, `hasViewedInfo_v1` | Version-specific for future announcements |
| **Mock data** | Centralized in `mockData.ts` | Easy endpoint swap later |
| **Design system** | Install `@plink/ui-library`, use for new components only | Don't refactor existing code |
| **Navigation refactor** | BACKLOG | Focus on Announcement Footer first |
| **Floating "?" button** | REMOVED | Replaced with muted Info link |

---

## Open Questions

### ✅ Design System Specifications - RESOLVED
All typography, color, and spacing specifications have been extracted from `@plink/ui-library` and documented in Task 2.2.

### ✅ Product Decisions - RESOLVED
1. **Floating "?" button:** REMOVED - replaced with muted Info link
2. **Carousel auto-popup:** REMOVED - user-initiated only (via "Quick tour" or Info link)
3. **Performance banner:** REMOVED - replaced with Announcement Footer
4. **Landing screen:** `/audience` (existing Area Audience, renamed route)

### ✅ Design Decisions - RESOLVED (UI/UX Expert Decisions)

**1. Announcement Footer Background Color: `#334bc1` (Primary Blue)**
- **Rationale:** Bold, attention-grabbing color that establishes brand authority
- High contrast with white text ensures readability
- Communicates importance and professionalism
- Light cyan would be too subtle for this critical first-impression moment

**2. Announcement Footer Animation: Slide-up from bottom**
- **Rationale:** Creates visual interest and draws eye to footer naturally
- Aligns with mobile UI patterns (similar to bottom sheets, action panels)
- Slide-up motion suggests "rising" or "arriving" which feels positive
- More dynamic than fade-in, better catches peripheral vision
- **Timing:** 5 seconds after page load (allows KPI scanning first)
- **Duration:** 300-400ms ease-out for smooth, professional feel
- **Behavior:** Content pushes up (no overlay) - maintains spatial consistency

**3. Info Link Position: Centered, above bottom navigation**
- **Rationale:**
  - Natural eye flow: Users scan content top-to-bottom, then see link before nav
  - Centered = balanced, non-intrusive
  - Above nav = clearly separate from navigation, won't be mistaken for a tab
  - Fixed position (doesn't scroll) = always discoverable without scrolling back up
- **Specific placement:**
  - Position: `fixed bottom-20` (80px from bottom, just above 64px nav)
  - Width: `w-full text-center`
  - Padding: `py-2` (8px vertical breathing room)
  - Background: Transparent or subtle `bg-white/80` with backdrop blur for readability over content

**4. Button Styling: Primary vs Secondary (Announcement Footer)**
- **"Quick tour" (primary action):**
  - Style: Primary button
  - Background: White (#ffffff)
  - Text: Primary blue (#334bc1)
  - Hover: Light gray background (#f5f5f5)
  - **Rationale:** Inverted colors create maximum contrast on blue background, draws eye as primary CTA

- **"Continue" (secondary action):**
  - Style: Secondary button
  - Background: Transparent
  - Border: 1px solid white (#ffffff)
  - Text: White (#ffffff)
  - Hover: White background with primary blue text (inverted)
  - **Rationale:** Lower visual weight = secondary action, but still accessible

**5. Carousel Card Styling:**
- **Background:** White (#ffffff)
- **Border radius:** `16px` (within 14-18px design system range, Tailwind `rounded-2xl`)
- **Shadow:** Tailwind `shadow-xl` for modal elevation
- **Max-width:** 400px (readable on mobile, not overwhelming on desktop)
- **Padding:** `p-8` (32px) for generous breathing room
- **Icon size:** `w-16 h-16` (64px) - large enough to be meaningful, not overwhelming

---

## Success Criteria

**Merchant Experience:**
- [ ] Merchant sees KPIs immediately without obstruction (Announcement Footer doesn't cover content)
- [ ] Value proposition reinforced once (Announcement Footer slides up after 5 seconds)
- [ ] Optional education ("Quick tour") available but not blocking
- [ ] "Continue" option for merchants who want to skip education
- [ ] After first visit, subtle Info link available for merchants who want education later
- [ ] Carousel is user-initiated only (no auto-popup interruptions)
- [ ] Clear navigation to `/audience` as default landing

**Announcement Footer (MVP):**
- [ ] Replaces bottom nav on first visit when announcement is active
- [ ] Slides up after 5 seconds (draws attention without blocking KPIs)
- [ ] "Quick tour" opens carousel, then navigates to `/audience`
- [ ] "Continue" skips carousel, navigates to `/audience`
- [ ] "✕" dismiss behaves same as "Continue"
- [ ] Footer never shows again after any action (localStorage flag)
- [ ] Screen content pushes up (no overlay on KPIs)
- [ ] Double height of standard bottom nav (~128px)

**Info Link (After First Visit):**
- [ ] Muted inline link appears after Announcement Footer dismissed
- [ ] Clicking opens carousel
- [ ] Link disappears permanently after clicked (one-time use)
- [ ] localStorage persistence works

**Carousel:**
- [ ] 4 slides with clear value proposition
- [ ] Swipeable on mobile, arrow navigation on desktop
- [ ] Keyboard accessible (ESC to close, arrows to navigate)
- [ ] Screen reader friendly
- [ ] Different exit behavior based on entry point (Announcement vs Info link)
- [ ] localStorage persistence works

**Technical:**
- [ ] Route renamed from `/area-audience` to `/audience`
- [ ] `/audience` is default landing screen
- [ ] Carousel localStorage flags work (`hasSeenAnnouncement_v1`, `hasViewedInfo_v1`)
- [ ] All mock data centralized in `mockData.ts` (if needed)
- [ ] Responsive across mobile/tablet/desktop
- [ ] Uses `@plink/ui-library` components for new elements only
- [ ] HMR updates work smoothly
- [ ] Existing Area Audience content unchanged

**Design System:**
- [ ] Announcement Footer uses Plink typography (Montserrat headings, Open Sans body)
- [ ] Proper color usage from `@plink/ui-library` tokens
- [ ] Spacing follows design system scale
- [ ] Accessible (keyboard nav, screen readers, focus management, ARIA labels)

---

## Implementation Notes

### Package Installation
```bash
cd outputs/merch-app-v1-proto
npm install @plink/ui-library  # ✅ INSTALLED
```

### Files to Create
- [ ] `src/components/AnnouncementFooter.tsx` - Announcement footer component
- [ ] `src/components/InfoLink.tsx` - Muted info link component
- [ ] `src/components/OnboardingCarousel.tsx` - 4-slide carousel
- [ ] `src/hooks/useAnnouncementState.ts` - localStorage management for announcement/info flags

### Files to Modify
- [ ] `src/shared/Router.tsx` - Rename `/area-audience` to `/audience`, update default redirect
- [ ] `src/pages/RootPage.tsx` - Redirect to `/audience`
- [ ] `src/pages/AreaAudience/index.tsx` - Integrate Announcement Footer, Info Link, and carousel logic

### Files NOT to Modify (unless necessary)
- Existing AreaAudience content/KPIs (keep intact)
- Other page components (Shoppers, Neighborhood, etc.)
- Existing UI components (unless conflicts arise)
- Bottom nav component (will be conditionally replaced by Announcement Footer)

---

## Progress Tracking

**Current Status:** ✅ Spec fully finalized with all design decisions resolved
**Next Action:** Begin implementation
**Blocker:** None

**Timeline:**
- [x] Task 1.1: Living spec ✅ COMPLETE
- [x] Design system specs ✅ COMPLETE (`@plink/ui-library` installed and documented)
- [x] Spec updated to Announcement Footer approach ✅ COMPLETE
- [ ] Task 2: Rename route to `/audience`, update redirects (READY TO START)
- [ ] Task 3: Carousel component (READY TO START)
- [ ] Task 4: Announcement Footer component (READY TO START - minor questions remain)
- [ ] Task 5: Info Link component (READY TO START)
- [ ] Task 6: Integration into AreaAudience page (PENDING - depends on Task 3, 4, 5)

**Estimated Timeline:**
- Route updates: 15 minutes
- Carousel component: 1-2 hours
- Announcement Footer: 1 hour
- Info Link: 30 minutes
- Integration & testing: 1 hour
- **Total:** ~4-5 hours

---

## Future Feedback Sections (Not Yet Addressed)

From stakeholder feedback document:
- Campaign Carousel visual proof
- Priority Placement explainers
- Merchant benchmarking
- Charts simplification
- Billing transparency
- Shoppers screen copy
- Incentives messaging
- Terminology replacement (throughout app)
- Navigation highlighting fixes

**Process:** After Overview screen is complete, Mitch will provide next feedback section for iteration.
