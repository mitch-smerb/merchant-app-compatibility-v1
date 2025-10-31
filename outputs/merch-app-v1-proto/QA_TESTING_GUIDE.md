# **QA Testing Guide**

[Foundation \- git 3c9d1fd](#foundation---git-3c9d1fd)

[Development Server](#development-server)

[Mobile Viewport](#mobile-viewport)

[Build Process](#build-process)

[UI Components \- git eb74cdf](#ui-components---git-eb74cdf)

[Button Components (src/ui/button.tsx)](#button-components-\(src/ui/button.tsx\))

[Form Components (src/ui/input.tsx, src/ui/select.tsx)](#form-components-\(src/ui/input.tsx,-src/ui/select.tsx\))

[Layout Components (src/ui/card.tsx)](#layout-components-\(src/ui/card.tsx\))

[Common Components \- git 4e95222](#common-components---git-4e95222)

[Navigate to any analytics screen](#navigate-to-any-analytics-screen)

[ResponsiveContainer Test](#responsivecontainer-test)

[ScreenHeader Brand Test](#screenheader-brand-test)

[Business Logic \- git 97fa59c](#business-logic---git-97fa59c)

[Mock Data Validation](#mock-data-validation)

[TypeScript Validation](#typescript-validation)

[Main Screens \- git a8dd256](#main-screens---git-a8dd256)

[Core Functionality](#core-functionality)

[Critical Updates to Test:](#critical-updates-to-test:)

[Page Wrappers \- git 034d96b](#page-wrappers---git-034d96b)

[Test these direct URLs:](#test-these-direct-urls:)

[Route Parameters](#route-parameters)

[V0 Content \- git 4452eeb](#v0-content---git-4452eeb)

[Content Migration](#content-migration)

[Interactive Elements](#interactive-elements)

[Navigation \- git d200c61](#navigation---git-d200c61)

[Bottom Navigation Flow](#bottom-navigation-flow)

[Hamburger Menu Flow](#hamburger-menu-flow)

[Cross-Navigation Test](#cross-navigation-test)

[Documentation \- git 3523a6a](#documentation---git-3523a6a)

[Installation Instructions](#installation-instructions)

[Architecture Documentation](#architecture-documentation)

Integration [works seamlessly.](#heading=h.423g1772jtr4)

[When Pedro finds issues, use this format:](#heading=h.v5jvgyvysc24)

git checkout feature/v1-proto-split  
npm install  
npm start  
Primary: Chrome DevTools with mobile simulation  
Secondary: Safari, Firefox, Edge  
Mobile Devices: iPhone SE, iPhone 14, iPad, Android phones

## **Foundation \- git 3c9d1fd** {#foundation---git-3c9d1fd}

### **Development Server** {#development-server}

\[ \] npm start launches without errors  
\[ \] Hot reload works when editing files  
\[ \] No console warnings about configuration

### **Mobile Viewport** {#mobile-viewport}

\[ \] Open Chrome DevTools → Device Mode  
\[ \] Test iPhone SE (375x667) \- should not have horizontal scroll  
\[ \] Test iPad (768x1024) \- should scale appropriately  
\[ \] Zoom to 200% \- text remains readable

### **Build Process** {#build-process}

\[ \] npm run build completes successfully  
\[ \] Generated files are optimized and minified  
Expected Result: Clean development environment with proper mobile viewport configuration.

## **UI Components \- git eb74cdf** {#ui-components---git-eb74cdf}

Navigate to: Browser console → Run test commands

### **Button Components (src/ui/button.tsx)** {#button-components-(src/ui/button.tsx)}

\[ \] Primary button renders with correct brand color  
\[ \] Secondary and destructive variants work  
\[ \] Hover states are visually distinct  
\[ \] Focus states show proper outline for accessibility

### **Form Components (src/ui/input.tsx, src/ui/select.tsx)** {#form-components-(src/ui/input.tsx,-src/ui/select.tsx)}

\[ \] Text inputs accept focus and text entry  
\[ \] Select dropdowns open/close properly=  
\[ \] Validation states (error, success) display correctly

### **Layout Components (src/ui/card.tsx)** {#layout-components-(src/ui/card.tsx)}

\[ \] Cards have consistent padding and borders  
\[ \] Card headers and content align properly

Expected Result: All UI components render consistently with Plink brand styling.

## **Common Components \- git 4e95222** {#common-components---git-4e95222}

This is the main bug fix \- test carefully

### **Navigate to any analytics screen** {#navigate-to-any-analytics-screen}

\[ \] Look for stat cards (metric display cards)  
\[ \] CRITICAL: Verify zero spacing between card header and content  
\[ \] Header should touch content with no gap  
\[ \] Compare with screenshots if available

### **ResponsiveContainer Test** {#responsivecontainer-test}

\[ \] App width never exceeds 430px on mobile  
\[ \] Desktop shows proper max-width constraint  
\[ \] Horizontal scrolling never occurs

### **ScreenHeader Brand Test** {#screenheader-brand-test}

\[ \] Plink logo consistent size across all screens  
\[ \] Brand color matches specification (\#334bc1)  
\[ \] Typography follows Montserrat font family  
Expected Result: Consistent spacing (especially StatCard fix), responsive layout, brand compliance.

## **Business Logic \- git 97fa59c** {#business-logic---git-97fa59c}

### **Mock Data Validation** {#mock-data-validation}

\[ \] No "undefined" or "null" displayed in UI  
\[ \] All numeric values are realistic (not obviously fake)  
\[ \] Percentages add up correctly where applicable  
\[ \] Date ranges are logical and recent

### **TypeScript Validation** {#typescript-validation}

\[ \] npm run build completes without type errors  
\[ \] Browser console shows no type-related warnings  
\[ \] IntelliSense works properly in VS Code

Expected Result: All components display realistic data without type errors.

## **Main Screens \- git a8dd256** {#main-screens---git-a8dd256}

This is the core functionality test. Most important commit for UX validation.

### **Core Functionality** {#core-functionality}

\[ \] Logo Test: Plink logo matches other screens (size, color, position)  
\[ \] Card Structure: Billing cards match design patterns from other screens  
\[ \] Key Metric: $117.50 displays with proper formatting and color  
\[ \] Navigation: Bottom nav shows "Billing" as active tab  
\[ \] Responsive: Layout works on mobile and desktop  
\[ \] Navigation Fix: Bottom navigation works correctly (this was a major bug)  
\[ \] Active Tab: Proper tab highlighting  
\[ \] Cost Controls: Budget controls and settings display  
\[ \] Charts: Cost trend visualizations render  
\[ \] Geographic Data: Area metrics and audience data display  
\[ \] Visualizations: Charts and geographic elements render  
\[ \] Responsive: Mobile layout maintains readability  
\[ \] Customer Metrics: Demographics and behavior data display  
\[ \] Segmentation: Customer segment visualizations work  
\[ \] Data Integrity: All metrics show realistic values  
\[ \] Zone Data: Local market performance metrics  
\[ \] Comparisons: Zone comparison charts function  
\[ \] Market Insights: Competitive analysis displays

### **Critical Updates to Test:** {#critical-updates-to-test:}

\[ \] Menu Opens/Closes: Smooth animation, no glitches  
\[ \] Campaign Center: Links to https://business.dev.plink.ai (opens new tab)  
\[ \] Demo Item: Now functional (was "coming soon")  
\[ \] FAQ Item: Now functional (was "coming soon")  
\[ \] No Green Circles: Availability indicators removed  
\[ \] No Theme Toggle: Light/dark theme option removed

Expected Result: All 5 analytics screens function properly with consistent branding and fixed navigation issues.

## **Page Wrappers \- git 034d96b** {#page-wrappers---git-034d96b}

URL Navigation

### **Test these direct URLs:** {#test-these-direct-urls:}

http://localhost:5173/billing  
http://localhost:5173/analytics/area-audience  
http://localhost:5173/analytics/neighborhood  
http://localhost:5173/analytics/current-shoppers  
http://localhost:5173/incentives  
\[ \] Each URL loads the correct screen  
\[ \] Browser back/forward buttons work  
\[ \] No 404 errors or blank screens

### **Route Parameters** {#route-parameters}

\[ \] Page titles display correctly  
\[ \] Component props pass through properly  
\[ \] No routing conflicts or loops  
Expected Result: Clean URL routing with proper Ionic-React integration.

## **V0 Content \- git 4452eeb** {#v0-content---git-4452eeb}

Access: Hamburger Menu → Demo

### **Content Migration** {#content-migration}

\[ \] All original V0 What's Plink content is present  
\[ \] Product image (whatisplink-page.png) displays properly  
\[ \] Image is appropriately sized for mobile and desktop  
\[ \] Text content is readable and properly formatted

### **Interactive Elements** {#interactive-elements}

\[ \] Demo interactions trigger toast notifications  
\[ \] Notifications appear and disappear correctly  
\[ \] No JavaScript errors in console during interactions

#### **Access: Hamburger Menu → FAQ**

Content Completeness  
\[ \] All 7 FAQ sections are present  
\[ \] Each section contains original V0 help content  
\[ \] Content is accurate and helpful

#### **Accordion Functionality**

\[ \] FAQ sections expand when clicked  
\[ \] Previously open sections collapse when opening new ones  
\[ \] Smooth animations without layout shifts

#### **Contact Support Features**

\[ \] Email links open default mail client  
\[ \] Scheduling links work (if implemented)  
\[ \] External support links open in new tabs

Expected Result: Complete V0 content migration with enhanced interactive features.

## **Navigation \- git d200c61** {#navigation---git-d200c61}

This commit ties everything together \- test all navigation paths.

### **Bottom Navigation Flow** {#bottom-navigation-flow}

Start at any screen → Test each bottom tab:  
Area Reach → Neighborhood Reach → Current Shoppers → repeat  
\[ \] Each tap changes screen immediately  
\[ \] Active tab highlighting updates correctly  
\[ \] No broken navigation states

### **Hamburger Menu Flow** {#hamburger-menu-flow}

Open menu → Test each item:  
Incentives → Billing → Campaign Center → Demo → FAQ  
\[ \] All internal links work properly  
\[ \] Campaign Center opens Business Portal in new tab  
\[ \] Menu closes after selection  
\[ \] No dead or broken links

### **Cross-Navigation Test** {#cross-navigation-test}

Start at Billing → Open hamburger → Select Demo →  
Use bottom nav → Go to Area Reach → Repeat  
\[ \] Navigation state remains consistent  
\[ \] No conflicts between navigation systems  
\[ \] URL updates correctly for each screen  
Expected Result: Seamless navigation between all app areas with no dead ends or broken states.

## **Documentation \- git 3523a6a** {#documentation---git-3523a6a}

### **Installation Instructions** {#installation-instructions}

\[ \] Following MIGRATION\_NOTES.md setup works correctly  
\[ \] All dependencies install without conflict  
\[ \] Build and dev commands work as documented

### **Architecture Documentation** {#architecture-documentation}

\[ \] Technical decisions are clearly explained  
\[ \] Component relationships are documented  
\[ \] Migration path from V0 is clear  
Expected Result: Complete, accurate documentation for development team.  
Success Criteria: Smooth journey with no broken links, consistent branding, and   
informative content at each step.  
Success Criteria: Fast navigation, data loads quickly, external Business Portal integration works seamlessly.

\[ \] Initial Load: App loads within 3 seconds on 3G connection  
\[ \] Navigation Speed: Screen transitions feel instant  
\[ \] Memory Usage: No memory leaks during extended usage  
\[ \] Battery Impact: Reasonable power consumption on mobile  
\[ \] Keyboard Navigation: Tab through all interactive elements  
\[ \] Screen Reader: Test with VoiceOver (Mac) or NVDA (Windows)  
\[ \] Focus Management: Focus indicators are visible and logical  
\[ \] Color Contrast: All text meets WCAG accessibility standards  
\[ \] Touch Targets: All buttons/links are easily tappable (44px minimum)  
\[ \] Orientation: App works in both portrait and landscape  
\[ \] Safe Areas: Content respects iPhone notch and home indicator  
\[ \] Scrolling: Smooth scroll performance, no bouncing issue

When Pedro finds issues, use this format:  
\[ \] All screens load without errors  
\[ \] Navigation works consistently  
\[ \] Mobile responsive design functions properly  
\[ \] Plink branding is consistent throughout  
\[ \] StatCard spacing fix is confirmed working  
\[ \] Performance is acceptable across devices  
\[ \] Accessibility standards are met  
\[ \] V0 content migration is complete and accurate  
\[ \] External integrations (Business Portal) work properly  
\[ \] Animations and transitions are smooth  
\[ \] Code organization follows best practices  
\[ \] TypeScript usage is comprehensive  
\[ \] Build optimization is effective

This comprehensive testing guide ensures Engineering and QA can thoroughly validate every aspect of the V1 prototype while understanding the product context behind each technical decision.

