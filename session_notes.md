# Session Notes - merchant-app-compatibility-v1

## 2025-10-31
**Status:** COMPLETE - Announcement Footer & Carousel Spec Finalized
**Duration:** ~3 hours
**Next:** Implementation of Announcement Footer, Carousel, and Info Link components
**Blockers:** None - spec is fully finalized with all design decisions resolved

**Session Overview:**
This session focused on processing Round 1 stakeholder feedback and creating a comprehensive implementation specification for the merchant app's landing experience. The goal is a near-final app (95% complete) by Friday midday for team demo, with Columbia Credit Union demo on Nov 4th.

**Strategic Context:**
- **Core Problem:** App shows right data but speaks in "Plink language" not "merchant language"
- **Key Insight:** Merchants don't remember what Plink is and need re-orientation every session
- **Solution Approach:** Announcement Footer + optional carousel education (not blocking)

**Major Decisions:**

1. **REMOVED: Overview Screen Concept**
   - Original plan: New `/overview` landing page with hero headline, proof cards, performance banner
   - Replaced with: Announcement Footer pattern (less intrusive, preserves working KPIs)

2. **REMOVED: Auto-popup Carousel**
   - Original plan: Carousel auto-appears 3-4 seconds after landing
   - Replaced with: User-initiated only (via "Quick tour" button or Info link)
   - Rationale: Avoid interrupting merchants, give full control

3. **REMOVED: Floating "?" Help Button**
   - Replaced with: Muted Info link that appears after first visit

4. **ADOPTED: Announcement Footer Pattern**
   - Replaces bottom nav on first visit
   - Slides up after 5 seconds (allows KPI scanning first)
   - Double height (~128px) with two actions: "Quick tour" and "Continue"
   - Primary blue background (#334bc1) for attention
   - One-time per announcement (localStorage: `hasSeenAnnouncement_v1`)

**Design System Integration:**
- Installed @plink/ui-library (v0.1.0) npm package
- Merged specs from @plink/ui-library + Plink Design System .md
- Where conflicts exist, design system .md takes precedence
- Key overrides:
  - Primary hover: #293d9c (exact brand match)
  - Card radius: 14-18px (design system spec)
  - Input background: #ededed
  - Typography: Montserrat (headings), Open Sans (body), Inter (UI - fallback to Open Sans)

**Components Designed:**

1. **Announcement Footer (`AnnouncementFooter.tsx`)**
   - Height: 128px (double standard nav)
   - Background: #334bc1 (primary blue)
   - Animation: Slide-up from bottom, 5s delay, 300-400ms ease-out
   - Headline: "Plink grows your verified local shopper reach."
   - Buttons:
     - "Quick tour" (primary): White bg, blue text, inverts on hover
     - "Continue" (secondary): Transparent, white border, inverts on hover
   - Dismiss "✕" button (top-left)
   - Complete Tailwind classes documented in spec

2. **Info Link (`InfoLink.tsx`)**
   - Position: Fixed bottom-20 (above nav), centered
   - Background: Semi-transparent white with backdrop blur
   - Text: "Info: growing your verified Local Reach."
   - Color: Muted gray (#737373), changes to primary blue on hover
   - One-time use (disappears after clicked)
   - localStorage: `hasViewedInfo_v1`

3. **Onboarding Carousel (`OnboardingCarousel.tsx`)**
   - 4 slides: Verified data → Local targeting → Banking apps → Results dashboard
   - Card: White, 16px radius, shadow-xl, 400px max-width, 32px padding
   - Icons: 64px (w-16 h-16)
   - User-initiated only (no auto-popup)
   - Different exit behavior based on entry point:
     - From Announcement Footer → Navigate to `/audience`
     - From Info link → Stay on current page
   - Swipeable mobile, arrow navigation desktop
   - Keyboard accessible (ESC, arrows)

4. **State Management Hook (`useAnnouncementState.ts`)**
   - localStorage flags: `hasSeenAnnouncement_v1`, `hasViewedInfo_v1`
   - Version-specific for future announcements
   - Render logic:
     ```typescript
     if (!hasSeenAnnouncement_v1) {
       // Show Announcement Footer (slides up after 5s)
     } else if (!hasViewedInfo_v1) {
       // Show muted Info link
     } else {
       // Show nothing (standard bottom nav only)
     }
     ```

**Navigation Changes:**
- Route rename: `/area-audience` → `/audience`
- Default landing: `/audience` (existing Area Audience page, no new screen needed)
- Existing Area Audience content stays intact (no refactoring)

**UI/UX Decisions (as Design Expert):**

**1. Announcement Footer Background: Primary Blue (#334bc1)**
- Rationale: Bold, attention-grabbing, establishes brand authority
- High contrast with white text ensures readability
- Light cyan would be too subtle for first-impression moment

**2. Animation: Slide-up (not fade-in)**
- Rationale: Creates visual interest, aligns with mobile patterns (bottom sheets)
- Slide-up suggests "rising/arriving" (positive psychology)
- Better catches peripheral vision than fade
- Timing: 5s delay allows KPI scanning, 300-400ms duration feels smooth

**3. Info Link Position: Centered, Fixed above Nav**
- Rationale: Natural eye flow (content → info link → nav)
- Centered = balanced, non-intrusive
- Fixed position = always discoverable without scrolling
- Above nav = clearly separate, won't be mistaken for tab

**4. Button Hierarchy:**
- Primary ("Quick tour"): White bg, blue text (maximum contrast on blue background)
- Secondary ("Continue"): Transparent, white border (lower visual weight)
- Both invert on hover for clear feedback

**5. Carousel Styling:**
- 16px radius (within 14-18px design system range)
- Shadow-xl for modal elevation
- 400px max-width (readable mobile, not overwhelming desktop)
- 32px padding for generous breathing room

**Typography Specifications:**
- Announcement headline: Montserrat 24px (H-Small), semibold (600), white
- Buttons: Open Sans 16px (Body M), semibold (600)
- Info link: Open Sans 14px (Body S), normal (400), muted gray
- Carousel headlines: Montserrat 24px, bold (700), black
- Carousel body: Open Sans 16px, normal (400), secondary gray

**Color Usage:**
- Primary: #334BC1 (from @plink/ui-library, matches design system)
- Primary hover: #293d9c (design system override)
- Accent: #30CCD5
- Neutrals: #1C1C1C (black), #737373 (medium gray), #f5f5f5 (light gray)
- Success: #22C55E, Error: #EF4444, Warning: #F59E0B
- App background: #f5f5f5 (design system)

**Files Created:**
- ✅ `ROUND_2_REVISIONS.md` - Comprehensive living spec document (441 lines)
  - Strategic context from stakeholder feedback
  - Complete component specifications with Tailwind classes
  - Design system integration notes
  - Implementation timeline and success criteria
  - Progress tracking

**Files to Create (Implementation):**
- `src/components/AnnouncementFooter.tsx`
- `src/components/InfoLink.tsx`
- `src/components/OnboardingCarousel.tsx`
- `src/hooks/useAnnouncementState.ts`

**Files to Modify (Implementation):**
- `src/shared/Router.tsx` (rename route)
- `src/pages/RootPage.tsx` (update redirect)
- `src/pages/AreaAudience/index.tsx` (integrate components)

**Research Conducted:**
1. **Slot-based Navigation Architecture** - Researched best practices from Linear, Stripe, Notion for content-agnostic routing patterns (recommended for future iteration flexibility, moved to backlog)
2. **Carousel UX Timing** - Found UX research: 5-7 seconds minimum for auto-rotating carousels, 2 seconds too short (causes annoyance)
3. **SMB Onboarding Patterns** - Researched Toast, Square approaches (results-first with optional education)

**Package Installations:**
- ✅ `@plink/ui-library@0.1.0` installed
  - Provides: Heading, Text components, colors object, design tokens
  - Fonts: Montserrat (headings), Open Sans (body)
  - Auto-injects CSS (no separate import needed)

**Workflow Established:**
1. Mitch provides feedback section
2. Claude proposes best-in-class UI/UX solutions
3. Mitch adds Plink-specific constraints
4. Iterate until solid
5. Claude implements in code
6. Repeat for next section

**Estimated Implementation Timeline:**
- Route updates: 15 minutes
- Carousel component: 1-2 hours
- Announcement Footer: 1 hour
- Info Link: 30 minutes
- Integration & testing: 1 hour
- **Total: ~4-5 hours**

**Success Criteria Defined:**
- ✅ Merchant sees KPIs immediately (Announcement Footer doesn't cover content)
- ✅ Value proposition reinforced once (slides up after 5s)
- ✅ Optional education available but not blocking
- ✅ User-controlled (no auto-interruptions)
- ✅ Persistent reminder available (Info link after first visit)
- ✅ One-time per announcement (localStorage)
- ✅ Professional animation (300-400ms slide-up)
- ✅ Accessible (keyboard nav, screen readers, ARIA labels)

**Backlog Items:**
- Slot-based navigation refactoring (for future iteration flexibility)
- Graphics Design Subagent creation (reusable across FC projects)
- Analytics tracking (carousel views, info link clicks, announcement engagement)
- Other feedback sections: Campaign carousel visual proof, Priority Placement explainers, Merchant benchmarking, Charts simplification, Billing transparency, Terminology replacement

**Key Learnings:**
1. **Design approach shift:** From "new Overview screen" to "announcement layer on existing screen" - less invasive, preserves working code
2. **User control:** Auto-popup carousel replaced with user-initiated - respects merchant's time
3. **Progressive disclosure:** Announcement Footer → Info link → Standard nav (degrades gracefully)
4. **Design system precedence:** When @plink/ui-library conflicts with design system .md, .md wins
5. **Component reusability:** Using @plink/ui-library for new components only (no refactoring of existing code)

**Documentation Quality:**
- Living spec document with complete implementation details
- All Tailwind classes documented
- Component structure code snippets provided
- Typography scale mapped to design system
- Color palette with hex values and usage notes
- Animation timing and easing specified
- Accessibility requirements documented

**Ready for Implementation:**
- ✅ All design decisions finalized
- ✅ Complete component specifications
- ✅ Tailwind classes documented
- ✅ Color and typography tokens defined
- ✅ Animation timing specified
- ✅ localStorage strategy defined
- ✅ Success criteria established
- ✅ File structure planned

**Next Session:**
- Begin implementation of Announcement Footer component
- Create Onboarding Carousel with 4 slides
- Build Info Link with one-time use logic
- Integrate into AreaAudience page
- Test complete flow (announcement → carousel → info link)

---

## 2025-10-30
**Status:** COMPLETE - Major file cleanup and project restructure
**Duration:** ~1 hour
**Next:** Begin feedback processing and UI/UX iteration with Mitch
**Blockers:** None - awaiting Mitch's feedback document review

**Completed:**
- Created timestamped backup before all changes (~705MB saved)
- Deleted system cruft (.DS_Store files, .obsidian, empty directories)
- Deleted 3 duplicate V0 reference copies (violated architecture)
- Deleted 703MB node_modules from Inputs/ai-exports (wrong location)
- Deleted outputs/prototype/ and outputs/prototype-code/ (empty/redundant)
- Created archive directory structure (outputs/archive-docs, Inputs/archive-docs)
- Archived 14 historical documents (status docs, conflicting ai-exports docs)
- Updated .gitignore (added .cursor, .obsidian, archive directories)
- Updated root README.md (reflects development phase, not compatibility phase)
- Added status header to REVISION_PLAN.md (IN REVIEW status)
- Created comprehensive app-level README.md with setup instructions
- Verified Pedro/Thiago refactoring already in place (theme/, components/, pages/)
- Build verified successful (3.3s, no errors)

**Key Achievements:**
- Reduced project from messy experimental state to clean, production-ready structure
- Established 12 core procedural documents (one source of truth per topic)
- Eliminated conflicting documentation (multiple READMEs, status docs)
- Applied "docs as code" principle - clarity = AI velocity
- File structure now supports rapid iteration for product-market fit

**Project Transformation:**
- FROM: Experimental AI prototyping with trial-and-error artifacts
- TO: Production development repository with clear standards and rapid iteration capability

**Ready for Next Phase:**
- Collaborative feedback processing (Mitch finishing review → grouping → UI/UX iteration)
- Demo preparation for Nov 4 Columbia Credit Union presentation
- Production launch targeting Nov 14, 2025

---

## 2025-10-09
**Status:** Created CLAUDE.md with session management instructions
**Next:** Follow FC standards on future sessions
**Blockers:** None

**Completed:**
- Created CLAUDE.md with session start instructions (read FC standards from project_behaviors.md)
- Added session end protocol: write to session_notes.md, write to FC projects.md, confirm completion
- Refined endsession steps based on feedback (removed automatic folder timestamp step)
