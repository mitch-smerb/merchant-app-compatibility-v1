# Plink Mobile App Design Guidelines

## Typography System

**CRITICAL: Never explicitly set font families in Tailwind classes**
- The CSS globals.css file handles all typography automatically
- Use semantic HTML elements (h1, h2, h3, h4, p) and they will be styled correctly
- Only use explicit font classes when overriding is absolutely necessary

### Typography Hierarchy
- **H1**: var(--text-h-large) Montserrat 700 (used for main numbers/stats)
- **H2**: var(--text-h-med) Montserrat 600 (used for screen titles)
- **H3**: var(--text-h-small) Montserrat 600 (used for section headings)  
- **H4**: var(--text-body-l) Open Sans 600 (used for card titles)
- **Body**: var(--text-body-m) Open Sans 400 (used for main content)
- **Caption**: var(--text-body-s) Open Sans 400 (used for secondary text)

## Screen Structure Standards

### Header Pattern
```tsx
<div className="bg-card px-6 py-4 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <h1 className="text-primary font-bold text-[24px]">Plink</h1>
    <HamburgerMenu onNavigate={onNavigate} />
  </div>
  
  <div className="flex items-center gap-2">
    {/* Icon optional - only when screen has specific function */}
    <h2 className="text-foreground text-[24px]">Screen Title</h2>
  </div>
</div>
```

### Card Titles
- Always use: `<CardTitle className="text-foreground text-[18px]">Title</CardTitle>`
- Never use explicit font families in CardTitle
- Consistent 18px size for all card titles

### Section Headings
- Use: `<h3 className="text-foreground text-[18px] mb-3 px-1">Heading</h3>`
- Never use explicit font families

## Navigation Standards

### Top Navigation Tabs
- Only used for main content screens (Area Reach, Neighborhood Reach, Current Shoppers)
- Hamburger menu screens (Incentives Controller, Billing) should NOT have top tabs

### Bottom Navigation
- 3-tab system: Area Reach, Neighborhood Reach, Current Shoppers  
- Highlight active tab with `text-primary` color
- Hamburger screens should NOT highlight any bottom nav tab

## Theme System
The app supports both light and dark themes using CSS custom properties that automatically adapt based on the `.dark` class.

### Theme Configuration
- **Provider**: `<ThemeProvider defaultTheme="light" storageKey="plink-ui-theme">`
- **Toggle Component**: `<ThemeToggle />` available for user theme switching
- **Storage**: Theme preference persisted in localStorage as "plink-ui-theme"

### Theme-Aware Development
- **ALWAYS use semantic color variables** (e.g., `text-foreground`, `bg-card`) instead of hardcoded hex values
- Colors automatically adapt between light/dark themes
- Test components in both themes during development

## Color System
### Light Theme (Default)
- Primary: var(--primary) | #334BC1 (brand blue)
- Secondary: var(--secondary) | #30CCD5 (accent cyan)
- Success: var(--success) | #22C55E 
- Warning: var(--warning) | #F59E0B
- Error: var(--destructive) | #EF4444
- Text Primary: var(--foreground) | #1C1C1C
- Text Secondary: var(--muted-foreground) | #737373
- Background: var(--background) | #f0fcfd
- Cards: var(--card) | #FFFFFF

### Dark Theme
- Primary: var(--primary) | #60a5fa (light blue)
- Secondary: var(--secondary) | #38bdf8 (light cyan)
- Text Primary: var(--foreground) | #f1f5f9
- Text Secondary: var(--muted-foreground) | #94a3b8
- Background: var(--background) | #0f172a
- Cards: var(--card) | #1e293b

## Layout Standards
- **Responsive Layout**: 
  - Mobile: max-w-[430px] (base)
  - Small: max-w-[600px] (sm:)
  - Large: max-w-[800px] (lg:)
  - Extra Large: max-w-[1000px] (xl:)
- Padding: 24px (px-6) for main content
- Card spacing: 16px gap between cards
- Card radius: var(--radius) for main cards, smaller elements use radius-sm/md
- Bottom padding: 80px (pb-20) to account for fixed footer

## Backend Integration Standards

### API Service Architecture
- Create `/services` directory for API calls and data fetching
- Use consistent error handling and response formatting
- Implement proper TypeScript interfaces for API responses
- Centralize API configuration (base URLs, headers, auth tokens)

### Data Flow Pattern
```tsx
// Recommended pattern for data-heavy components
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchData()
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

### Loading States
- Use `<Skeleton />` components from shadcn/ui for content loading
- Show loading states for all async operations
- Maintain layout structure during loading to prevent shift

### Error Handling
- Use `toast` from sonner for user-facing error messages
- Implement retry mechanisms for failed requests
- Provide fallback content when data is unavailable
- Log errors for debugging while showing user-friendly messages

### State Management
- Use React's built-in state for simple component-level data
- Consider Context API for shared app-wide state (user data, theme, etc.)
- Keep navigation state separate from data state
- Implement optimistic updates where appropriate

### Backend Integration Checklist

#### ✅ **Completed (Foundation Ready)**
- [x] API service layer created in `/services`
- [x] TypeScript interfaces defined for all API responses
- [x] Centralized mock data structure
- [x] Environment variable support for API configuration
- [x] Error handling infrastructure (toast system in place)

#### 🔄 **Ready for Implementation (When Backend Available)**
- [ ] Replace mock data with real API calls in components
- [ ] Loading states implemented with Skeleton components
- [ ] Error handling with toast notifications in components
- [ ] Authentication flow (if required)
- [ ] Data caching strategy implemented

#### 📋 **Current Implementation Status**
The app currently uses hardcoded mock data in components. To connect to a real backend:

1. **Update environment variables** in `.env`:
   ```
   REACT_APP_API_BASE_URL=https://your-api.com
   REACT_APP_API_TOKEN=your_api_token
   REACT_APP_USE_MOCK_API=false
   ```

2. **Replace component data patterns** from:
   ```tsx
   // Current: hardcoded data
   const data = { totalReach: 45823, ... };
   ```
   
   To:
   ```tsx
   // Backend-ready: API integration
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   
   useEffect(() => {
     plinkApi.area.getAreaData()
       .then(response => setData(response.data))
       .catch(setError)
       .finally(() => setLoading(false));
   }, []);
   ```

3. **Add loading states** with Skeleton components
4. **Implement error handling** with toast notifications

## Component Standards
- Use semantic HTML elements and rely on globals.css for typography
- Cards use consistent shadow-sm and border-0 styling
- Icons use lucide-react with consistent sizing (w-4 h-4 for inline, w-5 h-5 for headers)
- Tooltips provide contextual help without cluttering interface
- Numbers use tabular-nums for proper alignment