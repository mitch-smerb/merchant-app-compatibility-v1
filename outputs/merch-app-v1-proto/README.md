# Plink Merchant App V1

## Overview
The Plink Merchant App V1 is a React-based web application providing small business owners with an intuitive dashboard to track their Plink advertising performance, understand their reach, and manage campaigns.

**Tech Stack:** React 18 + Ionic React + Vite + TypeScript + Tailwind CSS + shadcn/ui

## Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
App runs at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
merch-app-v1-proto/
├── src/
│   ├── api/              # API client and types
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui design system
│   ├── features/         # Feature modules (auth, business, reports)
│   ├── pages/            # Route components
│   │   ├── AreaAudience/      # Analytics dashboard
│   │   ├── Neighborhood/      # Priority placement
│   │   ├── Billing/           # Transparent costs
│   │   ├── Incentive/         # Cost control
│   │   ├── LocalShoppers/     # Current shoppers
│   │   ├── WhatsPlink/        # Demo/explainer
│   │   └── FAQ/               # Help content
│   ├── theme/            # Design tokens (colors, fonts)
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
├── PRODUCT_STORIES.md    # User stories and acceptance criteria
├── REVISION_PLAN.md      # UI/UX revision specifications
├── QA_TESTING_GUIDE.md   # Testing procedures
├── MIGRATION_NOTES.md    # V0→V1 technical migration
├── gaps.md               # Data/API gaps
└── package.json          # Dependencies and scripts
```

## Core Features

### Current V1 Screens
- **Area Audience** - Analytics showing reach and engagement metrics
- **Neighborhood Reach** - Priority placement status and coverage
- **Billing** - Transparent cost breakdowns
- **Incentive Cost Control** - Budget management
- **Local Shoppers** - Current active shoppers viewing ads

### V0 Legacy Screens (Retained)
- Reports Home/Login/Help
- Business Signup/Confirmation
- Scan Page
- FAQ and "What's Plink" demo

## Architecture

### Design System
- **UI Components:** shadcn/ui + Radix UI primitives
- **Styling:** Tailwind CSS 4.1.4 + Styled Components
- **Theming:** Centralized in `src/theme/` (colors, fonts)
- **Mobile:** Ionic React containers for mobile responsiveness

### State Management
- **Client State:** Zustand 5.0.6
- **Server State:** React Query (TanStack Query 5.81.5)

### Data Layer
- **Current:** Mock data in `src/mockData.ts`
- **Target:** Real API integration (see `gaps.md` for data requirements)

### Routing
- React Router v6
- Private routes with authentication
- Integrated with V0 navigation patterns

## Key Documentation

### Product & Requirements
- **[PRODUCT_STORIES.md](./PRODUCT_STORIES.md)** - User stories with acceptance criteria
- **[REVISION_PLAN.md](./REVISION_PLAN.md)** - Comprehensive UI/UX revision plan (1,012 lines)

### Technical Specifications
- **[MIGRATION_NOTES.md](./MIGRATION_NOTES.md)** - V0→V1 technical migration details
- **[gaps.md](./gaps.md)** - Data/API gaps and requirements
- **[QA_TESTING_GUIDE.md](./QA_TESTING_GUIDE.md)** - Systematic testing approach

### AI Development Context
- **[CLAUDE.md](./CLAUDE.md)** - AI agent instructions for this app

## Development Workflow

### Current Phase: Active Development
1. **Feedback Processing** - Incorporating consolidated feedback from team + experts
2. **UI/UX Iteration** - Implementing REVISION_PLAN.md changes
3. **Mock Data Development** - Building realistic data layer
4. **Demo Preparation** - Ensuring demo-ready state for stakeholder validation

### Upcoming Phases
1. **Data Integration** - Replace mocks with real API connections
2. **QA Testing** - Comprehensive testing per QA_TESTING_GUIDE.md
3. **Production Deployment** - Web-accessible to customers (Nov 14, 2025 target)

## Key Principles

### SMB Psychology Focus
The app is designed around small business owner needs:
- Business language over technical jargon
- Visual advertising connections (show actual ads)
- Competitive benchmarking ("Am I doing better?")
- Constant value reinforcement
- ROI-focused metrics

### AI-Native Development
- Documentation is treated as code (clarity = velocity)
- Rapid iteration cycles for product-market fit
- Demo capability as first-class feature
- Claude Code-powered development

## Demo Mode
The app supports demo mode for stakeholder presentations:
- Demo links in hamburger menu and FAQ
- "View My Demo" components in ReportsHelp
- Mock data system for realistic demos
- Demo state modal handling

## Environment Configuration
See `.env.example` for required environment variables.

## Integration Status

### Completed
✅ AI components wrapped in Ionic page containers
✅ Routing integrated with V0 patterns
✅ shadcn/ui + Ionic coexistence
✅ Authentication integration (PrivateRoute)
✅ Design system centralized
✅ Build passing successfully

### Outstanding (See gaps.md)
❌ Currency/percentage formatters
❌ Time window helpers (MTD, 30d standardization)
❌ API documentation (OpenAPI/Swagger)
❌ Data validation layer
❌ Warehouse views/data pipeline
❌ Caching strategy
❌ Timezone handling

## Build Performance
- **Load Time:** ~654ms for analytics pages
- **Build Tool:** Vite 6.2.0 (optimized for speed)

## Milestones
- **Nov 4, 2025:** Demo for Columbia Credit Union presentation
- **Nov 14, 2025:** V1 production launch (web-accessible to customers)

## Contributing
This is an internal Plink project. For development questions, see CLAUDE.md for AI agent context or consult the engineering team.

## License
Proprietary - Plink Inc.
