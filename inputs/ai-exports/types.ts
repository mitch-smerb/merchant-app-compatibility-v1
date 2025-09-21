/**
 * TypeScript interfaces for Plink app data structures
 * These interfaces define the shape of data returned from API calls
 */

// Navigation Types
export type ActiveTab = "Area Reach" | "Neighborhood Reach" | "Current Shoppers" | "Incentives Controller" | "Billing";

// Area Audience Screen Types
export interface AreaData {
  totalReach: number;
  activeShoppers: number;
  growthRate: number;
  engagementRate: number;
}

export interface DemographicSegment {
  name: string;
  percentage: number;
  color: string;
}

export interface LocationData {
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Zone Screen Types
export interface ZoneMetrics {
  coverage: number;
  density: number;
  competition: number;
  opportunity: number;
}

export interface ZoneInsight {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  description: string;
  action?: string;
}

// Shoppers Screen Types
export interface ShopperMetrics {
  totalShoppers: number;
  newShoppers: number;
  returningShoppers: number;
  averageSpend: number;
  visitFrequency: number;
}

export interface ShopperSegment {
  name: string;
  count: number;
  percentage: number;
  averageSpend: number;
  visitFrequency: number;
}

// Incentives Screen Types
export interface IncentiveData {
  totalSpent: number;
  totalSaved: number;
  activeCampaigns: number;
  performance: number;
}

export interface CampaignData {
  id: string;
  name: string;
  type: 'percentage' | 'fixed' | 'bogo';
  value: number;
  budget: number;
  spent: number;
  conversions: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
}

// Billing Screen Types
export interface BillingData {
  currentPeriod: {
    start: string;
    end: string;
    amount: number;
    status: 'current' | 'overdue' | 'paid';
  };
  usage: {
    impressions: number;
    clicks: number;
    conversions: number;
  };
  purchases: {
    count: number;
    average: number;
    visitMultiplier: number;
  };
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand?: string;
  isDefault: boolean;
}

// Chart Data Types
export interface ChartDataPoint {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  comparison?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: string;
  code: number;
  timestamp: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// User Context Types
export interface UserData {
  id: string;
  businessName: string;
  contactEmail: string;
  location: LocationData;
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
  };
}