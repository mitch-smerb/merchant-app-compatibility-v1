# **App Review**

[Overview](#overview)

[V1 Offer — What We Promised](#v1-offer-—-what-we-promised)

[What the Prototype Shows to Validate the Offer](#what-the-prototype-shows-to-validate-the-offer)

[Success Criteria for This Prototype (Aligned to V1 Offer)](#success-criteria-for-this-prototype-\(aligned-to-v1-offer\))

[App Review](#app-review)

[Epic: Technical Infrastructure](#epic:-technical-infrastructure)

[Epic: Design System](#epic:-design-system)

[Epic: Design System](#epic:-design-system-1)

[Epic: Data Management](#epic:-data-management)

[Epic: User Interfaces](#epic:-user-interfaces)

[Epic: Technical Architecture](#epic:-technical-architecture)

[Epic: User Experience](#epic:-user-experience)

[Epic: Development Process](#epic:-development-process)

# **Overview** {#overview}

The Merchant App V1 Prototype is a demonstration build—not production—created to validate an AI-Native workflow from design → prototype → refactor → engineering review under the guidance of a non-technical PM. It upgrades V0 (basic viewing and limited local-vs-national insight) toward what a paying subscriber expects in V1: clear proof that Plink is delivering the V1 Offer and a foundation we can integrate into the existing app.

What V1 must demonstrate right now

* The product visibly delivers the V1 Offer (detailed below).  
* Incentives & Billing are transparent and actionable.  
* Basic, decision-ready analytics render reliably.  
* The code structure aligns closely enough with V0 to be integrated after review, with all gaps documented.

Purpose of this prototype: engineering review and feedback (fit, gaps, UI/UX direction, integration plan). It is not intended for production as-is.

---

### **V1 Offer — What We Promised** {#v1-offer-—-what-we-promised}

1. Wide-Area Reach & Exposure to High-Value Local Shoppers  
   * Show merchants their audience size and reach across the local trade area.  
   * Emphasize high-value local spenders—not just impressions.

2. Audience Verification via Spend Signals *(human \+ local, not bots or mis-targeted)*  
   * Use real payment/spend data to confirm audiences are human and locally active, reducing wasted spend.

3. Ultra-Targeting & Priority Placement *(favor heavy local spenders)*  
   * Prioritize exposure to top spenders in the neighborhood; demonstrate who’s getting priority and why.

   * Enable future controls (slices/segments) consistent with this targeting model.

4. Profit Protection — Treat Current Shoppers Differently  
   * Isolate current shoppers to avoid over-discounting them; reflect this policy in analytics and targeting intent.

5. Profit Protection — Tight Incentive Control (Leakage/Transfer)  
   * Make it clear incentives are tightly controlled to prevent leakage (unintended redemptions) and transfer (discounts moving to behavior that would have happened anyway).  
   * Billing should reflect these protections (clear view of costs vs. protected value).

---

### **What the Prototype Shows to Validate the Offer** {#what-the-prototype-shows-to-validate-the-offer}

* Analytics (Basic, Actionable):  
   Screens for Area Reach, Neighborhood/Zone, and Current Shoppers that:  
  * visualize audience size and local coverage,  
  * highlight high-value local spenders,  
  * mark current shoppers separately (for profit-protection awareness).

* Incentives & Billing:  
  * Incentives screen communicates tight control posture (copy and UI affordances; actions may be limited in prototype).  
  * Billing shows transparent costs aligned to controlled incentives and verified, local, human audiences.

---

### **Success Criteria for This Prototype (Aligned to V1 Offer)** {#success-criteria-for-this-prototype-(aligned-to-v1-offer)}

* Offer Visibility: A merchant can point to where the app proves each promise above (reach, verification, priority, protections).  
* Data Cues: Labels/legends or badges indicate verified local human audiences and current-shopper isolation.

* Controls/Copy: Incentives and targeting screens (or stubs) reflect tight control and priority placement intent.  
* Billing Alignment: Billing view corresponds to the control posture (no ambiguous “open-ended” discount exposure).  
* Integratability: Runs in V0 shell, routes/auth consistent; Gap Report lists data fields/APIs needed to make verification, targeting, and protections fully real.  
* AI-Native Workflow Proven: Non-technical PM \+ AI produced reviewable code; engineering can proceed with a clear Merchant App V1 Prototype integration plan to Merchant App v0 resulting in Merchant App V1  
* Advance toward design system and component first builds \- nothing hardcoded, nothing that is not componentized unless time to create component does not make sense.

# **App Review** {#app-review}

These Epics are AI generated. Please review

### **Epic: Technical Infrastructure** {#epic:-technical-infrastructure}

\[ \] Project uses modern React \+ Vite \+ TypeScript stack  
\[ \] Tailwind CSS v4 with Plink design system implemented where available  
\[ \] Mobile viewport properly configured for responsive design  
\[ \] Dependencies aligned with current Plink standards  
\[ \] Development server supports hot module replacement

Test Environment: npm start → localhost: \[5173\]  
\- ✅ App loads without console errors  
\- ✅ Mobile viewport renders correctly on device simulation  
\- ✅ Hot reload works when editing components  
\- ✅ Build process completes successfully with npm run build

### **Epic: Design System** {#epic:-design-system}

\[ \] Complete shadcn/ui component system available  
\[ \] All components follow accessibility standards (ARIA, keyboard nav)  
\[ \] Components integrate seamlessly with Tailwind CSS  
\[ \] Form controls, navigation, and feedback components included  
\[ \] Consistent styling utilities (cn, variants) available

Test: Component consistency and accessibility  
\- ✅ Button variants render correctly (primary, secondary, destructive)  
\- ✅ Form inputs accept focus and keyboard navigation  
\- ✅ Modal dialogs can be opened/closed properly  
\- ✅ Accordion components expand/collapse smoothly  
\- ✅ Chart components display sample data correctly

### **Epic: Design System** {#epic:-design-system-1}

\[ \] Plink brand colors and typography consistently applied  
\[ \] ResponsiveContainer ensures proper mobile layout  
\[ \] StatCard component displays metrics with correct spacing  
\[ \] ScreenHeader maintains consistent page structure  
\[ \] Navigation components match design specifications

Test: Visual consistency and brand compliance  
\- ✅ Plink logo appears consistently sized across all screens  
\- ✅ Primary brand color (\#334bc1) used correctly for CTAs  
\- ✅ Card headers have zero spacing gap (critical spacing fix)  
\- ✅ Typography scales properly on mobile devices  
\- ✅ Navigation maintains fixed positioning at bottom  
\- ✅StatCard Spacing: 

### **Epic: Data Management** {#epic:-data-management}

\[ \] TypeScript interfaces for all business entities  
\[ \] Comprehensive mock data covering all use cases  
\[ \] Location services for geographic features  
\[ \] Data structures match expected API responses  
\[ \] Mock data supports all analytics screens

Test: Data integrity and type safety  
\- ✅ All components render without TypeScript errors  
\- ✅ Mock metrics display realistic values and ranges  
\- ✅ Location data populates geographic features  
\- ✅ Chart data renders properly formatted  
\- ✅ No console warnings about missing or invalid data

### **Epic: User Interfaces** {#epic:-user-interfaces}

* Area Screen Story: As a merchant, I need to see the reach Plink is providing me so that I can verify that I am receiving exposure to a local high value shopper audience.  
  * Key Metrics: Reach (30d), Impressions (30d)  
  * Visualizations: Local Market Share (30d)  
  * Actions: TBD  
* Neighborhood Screen Story: As a merchant, I need see my neighborhood reach so that I can validate that I am receiving priority access to Local Shopper spending in my neighborhood.  
  * Key Metrics: neighborhood name, local shopper spend (30d), ave. txns/shopper, ave spend/per shopper  
  * Visualizations: Comparison between Priority Audience and Average Shopper  
  * Actions: TBD  
* Shoppers Screen Story: As a merchant, I need to see that Local Shoppers that already frequent my business are separated from other customers.  
  * Key Metrics:    
    * Number of Local Shoppers that made purchase at the business (30d), spend (30d), Transactions (30d)  
    * Campaigns:  
      * \# Recognize Regulars  
      * \# Boost Avg Spend  
      * \# Boost Frequency  
      * \# Recover Lapsed  
    * Shopper Comparison  
      * Frequency comparison, trend  
      * Transaction comparison, trend  
      * Spend comparison, trend  
      * Transaction size, trend  
  * Visualizations: TBD  
  * Actions: TBD  
* Campaign Center Story: As a merchant I need to be able to review the campaigns in the campaign center  
  * Action: in Hamburger menu select Campaign Center and be directed to Campaign Center without login  
* Incentives Controller Story: As a merchant, I need to see the amount I am spending on incentives, the campaign activity detail, and my campaign parameters so that I can validate that Plink is protecting my profit.   
  * Key Metrics:  
    *  Incentive spend, clicks, redemptions, average incentive rate.   
    * Redemptions transactions and the incentive offered  
    * Rules and conditions of each campaign type  
  * Visualizations:   
  * Actions: click to see redemption details, click to see campaign parameters  
* Billing Screen Story: As a merchant, I need to see my account billing information so that I can track the cost of my Plink program.  
  * Key Metrics:   
    * last month total  
    * the details of how the pricing tier and caps are applied to arrive at the billing  
  * Actions: TBD  
  * Visualization: Summary pf statistics taht the merchant receives  
* Demo Screen Story: As a merchant I need to be able to see what my ad looks like in the FI user interface  
  * Content: Complete demo walkthrough with interactive elements  
  * Assets: Product screenshot (whatisplink-page.png)  
  * Actions: Interactive demo with toast notifications  
* FAQ Story: As a merchant I need to have a resource to answer my questions and contact customer support.  
  * Content: 7 FAQ sections covering common questions  
  * UI: Collapsible accordion interface for easy browsing  
  * Actions: Contact support via email, schedule support calls  
  * External Links: Support resources and documentation

Test Flow: Navigate through each screen via bottom navigation  
\- ✅ All screens load with correct data displayed  
\- ✅ Bottom navigation highlights correct active tab  
\- ✅ Responsive layout works on mobile and desktop  
\- ✅ No broken images or missing data  
\- ✅ Plink branding consistent across all screens  
\- ✅ What's Plink demo loads with all content visible  
\- ✅ Demo image displays properly at correct size  
\- ✅ FAQ sections expand/collapse smoothly  
\- ✅ All 7 FAQ sections contain original V0 content  
\- ✅ Contact support links function correctly  
\- ✅ External links open in new tabs/windows

### **Epic: Technical Architecture** {#epic:-technical-architecture}

\[ \] All screens have corresponding Ionic page wrappers  
\[ \] Route parameters pass correctly to components  
\[ \] Back navigation functions properly  
\[ \] Page transitions are smooth  
\[ \] Review mode pages support multi-step workflows

### 

Test: Navigation and routing  
\- ✅ Direct URL navigation works for all routes  
\- ✅ Browser back/forward buttons function correctly  
\- ✅ Page transitions don't cause layout shifts  
\- ✅ Route parameters are passed and accessible  
\- ✅ Deep linking works for shared URLs

### **Epic: User Experience** {#epic:-user-experience}

Bottom Navigation: Primary screens (Area Reach, Neighborhood Reach, Current Shoppers)  
Hamburger Menu: Secondary features (Incentives, Billing, Demo, FAQ, Business Portal)  
External Integration: Business Portal link (https://business.dev.plink.ai)  
\[ \] Bottom navigation highlights active screen  
\[ \] Hamburger menu opens/closes smoothly  
\[ \] External links open in new tab/window  
\[ \] Navigation labels match user mental models  
\[ \] All menu items are accessible and functional

Test All Navigation Paths:  
\- ✅ Bottom nav: Tap each tab, verify screen changes and active state  
\- ✅ Hamburger menu: Open menu, verify all items visible and clickable  
\- ✅ External Business Portal link opens correctly  
\- ✅ Demo and FAQ menu items navigate to correct screens  
\- ✅ Menu closes when selecting item or tapping outside  
\- ✅ Navigation works consistently across all screen sizes  
\- ✅ Campaign Center now links to external Business Portal without login

### **Epic: Development Process** {#epic:-development-process}

MIGRATION\_NOTES.md: V0 to V1 transition guide  
Technical architecture comparison  
Component mapping and integration patterns  
Development setup instructions  
Review checklist for engineering team  
✅ Installation instructions are accurate and complete  
✅ Architecture decisions are clearly explained  
✅ Migration notes cover all major changes  
✅ Development workflow is documented  
✅ Review guidelines are provided for engineering team  
\[ \] All screens load without errors  
\[ \] Navigation works between all screens  
\[ \] Data displays correctly across all components  
\[ \] Interactive elements respond appropriately  
\[ \] External links function properly  
\[ \] Responsive design works on mobile and desktop  
\[ \] Plink branding is consistent throughout  
\[ \] Typography and spacing follow design system  
\[ \] Loading states and transitions are smooth  
\[ \] Accessibility standards are met  
\[ \] No console errors or warnings  
\[ \] TypeScript compilation successful  
\[ \] Build process completes without issues  
\[ \] Performance is acceptable on target devices  
\[ \] Code follows established patterns and standards  
\[ \] Chrome (primary)  
\[ \] Safari (mobile focus)  
\[ \] Firefox (secondary)  
\[ \] Edge (secondary)

Routing/Authentication Integration: Verify compatibility with existing auth system  
Menu Behavior: Ensure hamburger menu and navigation work as expected  
Visual Parity: Confirm styling matches design specifications  
Mobile Responsiveness: Test across different screen sizes  
Component Architecture: Review common component patterns  
Data Flow: Verify mock data integration patterns  
Performance: Check for any rendering or memory issues  
Accessibility: Validate keyboard navigation and screen readers  
Code Organization: Review file structure and naming conventions  
TypeScript Usage: Validate type definitions and interfaces  
CSS Architecture: Review Tailwind usage and custom styles

* Build Configuration: Verify Vite and bundling setup  
* API Integration Timeline: When will real APIs replace mock data?  
* Authentication Flow: How should this integrate with existing login system?  
* Deployment Strategy: What's the plan for staging and production releases?  
* Performance Requirements: What are the target load times and metrics?  
* Browser Support: What's the minimum browser compatibility requirement?  
* Mobile Strategy: Will this become a PWA or native app wrapper?

This prototype represents a complete foundation that can be iteratively enhanced with real data and additional features as the product roadmap evolves.

