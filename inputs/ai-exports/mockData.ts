/**
 * Centralized mock data for Plink app
 * This provides consistent mock responses for development and testing
 * Replace with real API calls when backend is connected
 */

import {
  AreaData,
  ZoneMetrics,
  ShopperMetrics,
  IncentiveData,
  BillingData,
  CampaignData,
  DemographicSegment,
  LocationData,
  UserData,
  ApiResponse
} from './types';

// Helper to simulate API response structure
function mockApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

// Helper to simulate API delay
export function simulateApiDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Area Audience Mock Data
export const mockAreaData: AreaData = {
  totalReach: 45823,
  activeShoppers: 12467,
  growthRate: 12.5,
  engagementRate: 68.2,
};

export const mockDemographics: DemographicSegment[] = [
  { name: 'Young Adults (18-34)', percentage: 35, color: '#334bc1' },
  { name: 'Middle-aged (35-54)', percentage: 40, color: '#30CCD5' },
  { name: 'Seniors (55+)', percentage: 25, color: '#737373' },
];

export const mockLocation: LocationData = {
  city: 'Austin',
  state: 'TX',
  coordinates: { lat: 30.2672, lng: -97.7431 },
};

// Zone Mock Data
export const mockZoneMetrics: ZoneMetrics = {
  coverage: 85,
  density: 92,
  competition: 67,
  opportunity: 78,
};

// Shoppers Mock Data
export const mockShopperMetrics: ShopperMetrics = {
  totalShoppers: 12467,
  newShoppers: 1847,
  returningShoppers: 10620,
  averageSpend: 47.85,
  visitFrequency: 2.3,
};

// Incentives Mock Data
export const mockIncentiveData: IncentiveData = {
  totalSpent: 8420,
  totalSaved: 15680,
  activeCampaigns: 7,
  performance: 156.2,
};

export const mockCampaigns: CampaignData[] = [
  {
    id: '1',
    name: 'Summer Savings',
    type: 'percentage',
    value: 15,
    budget: 5000,
    spent: 3420,
    conversions: 187,
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: '2', 
    name: 'New Customer Welcome',
    type: 'fixed',
    value: 10,
    budget: 2000,
    spent: 1580,
    conversions: 94,
    status: 'active',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
  },
];

// Billing Mock Data
export const mockBillingData: BillingData = {
  currentPeriod: {
    start: '2024-08-01',
    end: '2024-08-31',
    amount: 342.18,
    status: 'current',
  },
  usage: {
    impressions: 125430,
    clicks: 8767,
    conversions: 1205,
  },
  purchases: {
    count: 847,
    average: 52.35,
    visitMultiplier: 1.8,
  },
};

// User Mock Data
export const mockUserData: UserData = {
  id: 'user_123',
  businessName: 'Local Coffee Co.',
  contactEmail: 'owner@localcoffee.com',
  location: mockLocation,
  subscription: {
    plan: 'Professional',
    status: 'active',
    nextBilling: '2024-09-15',
  },
};

// Mock API Services (using mock data)
export const mockApi = {
  area: {
    getAreaData: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockAreaData);
    },
    getDemographics: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockDemographics);
    },
    getLocation: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockLocation);
    },
  },
  
  zone: {
    getZoneMetrics: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockZoneMetrics);
    },
    getZoneInsights: async () => {
      await simulateApiDelay();
      return mockApiResponse([]);
    },
  },
  
  shoppers: {
    getShopperMetrics: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockShopperMetrics);
    },
    getShopperSegments: async () => {
      await simulateApiDelay();
      return mockApiResponse([]);
    },
  },
  
  incentives: {
    getIncentiveData: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockIncentiveData);
    },
    getCampaigns: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockCampaigns);
    },
  },
  
  billing: {
    getBillingData: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockBillingData);
    },
    getPaymentMethods: async () => {
      await simulateApiDelay();
      return mockApiResponse([]);
    },
  },
  
  user: {
    getUserProfile: async () => {
      await simulateApiDelay();
      return mockApiResponse(mockUserData);
    },
  },
};