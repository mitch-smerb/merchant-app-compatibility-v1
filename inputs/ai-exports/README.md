# Plink Mobile App

A mobile-first SMB application providing verified ultra-local advertising inside trusted digital channels.

## 🚀 Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Theme Support**: Light and dark theme support with user preference persistence
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS v4
- **Backend Ready**: Structured service layer ready for API integration
- **TypeScript**: Full TypeScript support for type safety
- **Component Library**: Comprehensive reusable component system

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **shadcn/ui** for UI components
- **Radix UI** for accessible primitives
- **Lucide React** for icons
- **Recharts** for data visualization
- **Sonner** for toast notifications

## 📁 Project Structure

```
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
├── index.html                 # HTML template
├── components/                # React components
│   ├── common/               # Shared components
│   ├── ui/                   # shadcn/ui components
│   └── [screens]/            # Main screen components
├── services/                 # API and data services
├── styles/                   # Global styles and CSS
├── utils/                    # Utility functions
├── docs/                     # Documentation
└── guidelines/               # Design and development guidelines
```

## 🎨 Design System

### Brand Colors
- **Primary**: #334bc1 (Plink Blue)
- **Accent**: #30CCD5 (Cyan)
- **Success**: #22C55E
- **Warning**: #F59E0B
- **Error**: #EF4444

### Typography
- **Headings**: Montserrat (600-700 weight)
- **Body**: Open Sans (400-600 weight)
- **Labels/Buttons**: Inter (500 weight)

### Layout
- Responsive design: 430px (mobile) → 600px (sm) → 800px (lg) → 1000px (xl)
- Consistent spacing and component patterns

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd plink-mobile-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Screens

The app includes several main screens:

1. **Area Reach** - Geographic audience analysis
2. **Neighborhood Reach** - Local zone targeting
3. **Current Shoppers** - Customer insights and behavior
4. **Incentives Controller** - Campaign and incentive management
5. **Billing** - Account and billing management

## 🔌 Backend Integration

The app is structured to easily integrate with a backend API:

### Current State (Frontend-Ready)
- Mock data services in `/services/mockData.ts`
- TypeScript interfaces in `/services/types.ts`
- API service layer in `/services/api.ts`

### To Connect to Real Backend
1. Update environment variables in `.env`:
```env
VITE_API_BASE_URL=https://your-api.com
VITE_API_TOKEN=your_api_token
VITE_USE_MOCK_API=false
```

2. Replace mock data calls with real API calls in components
3. Implement loading states with Skeleton components
4. Add error handling with toast notifications

## 📋 Development Guidelines

See [Guidelines.md](./guidelines/Guidelines.md) for detailed development standards including:
- Typography system and usage
- Component patterns and standards
- Theme system implementation
- Color system and semantic variables
- Layout and responsive design standards
- Backend integration patterns

## 🎯 Key Features

### Theme System
- Automatic light/dark theme detection
- User preference persistence
- CSS custom properties for theme-aware styling

### Component System
- Reusable UI components following design system
- Consistent patterns for data display
- Responsive design principles

### Navigation
- Bottom navigation for main screens
- Hamburger menu for secondary features
- Proper active state management

### Data Visualization
- Charts and graphs using Recharts
- Consistent color schemes
- Mobile-optimized data displays

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

Please refer to the development guidelines and follow the established patterns when contributing to this project.