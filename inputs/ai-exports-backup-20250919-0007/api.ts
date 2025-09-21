/**
 * API service layer for Plink app
 * Centralized API calls and data fetching logic
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
  ApiResponse,
  ApiError,
  UserData
} from './types';

// API Configuration
const API_CONFIG = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://api.plink.com',
  version: 'v1',
  timeout: 10000,
};

// Headers for API requests
const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN || 'YOUR_API_KEY_HERE'}`,
  'X-App-Version': '1.0.0',
});

// Generic API request wrapper
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseUrl}/${API_CONFIG.version}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(),
        ...options.headers,
      },
      // timeout: API_CONFIG.timeout, // Note: timeout is not part of standard fetch RequestInit
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown API error',
      code: 500,
      timestamp: new Date().toISOString(),
    } as ApiError;
  }
}

// Area Audience API calls
export const areaApi = {
  getAreaData: () => apiRequest<AreaData>('/area/metrics'),
  getDemographics: () => apiRequest<DemographicSegment[]>('/area/demographics'),
  getLocation: () => apiRequest<LocationData>('/area/location'),
};

// Zone API calls  
export const zoneApi = {
  getZoneMetrics: () => apiRequest<ZoneMetrics>('/zone/metrics'),
  getZoneInsights: () => apiRequest<Record<string, unknown>[]>('/zone/insights'),
};

// Shoppers API calls
export const shoppersApi = {
  getShopperMetrics: () => apiRequest<ShopperMetrics>('/shoppers/metrics'),
  getShopperSegments: () => apiRequest<Record<string, unknown>[]>('/shoppers/segments'),
};

// Incentives API calls
export const incentivesApi = {
  getIncentiveData: () => apiRequest<IncentiveData>('/incentives/overview'),
  getCampaigns: () => apiRequest<CampaignData[]>('/incentives/campaigns'),
  createCampaign: (campaign: Partial<CampaignData>) => 
    apiRequest<CampaignData>('/incentives/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaign),
    }),
  updateCampaign: (id: string, updates: Partial<CampaignData>) =>
    apiRequest<CampaignData>(`/incentives/campaigns/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
};

// Billing API calls
export const billingApi = {
  getBillingData: () => apiRequest<BillingData>('/billing/current'),
  getPaymentMethods: () => apiRequest<Record<string, unknown>[]>('/billing/payment-methods'),
  updatePaymentMethod: (methodId: string) =>
    apiRequest<Record<string, unknown>>(`/billing/payment-methods/${methodId}/default`, {
      method: 'PATCH',
    }),
};

// User API calls
export const userApi = {
  getUserProfile: () => apiRequest<UserData>('/user/profile'),
  updateUserProfile: (updates: Partial<UserData>) =>
    apiRequest<UserData>('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
};

// Health check
export const healthApi = {
  ping: () => apiRequest<{ status: string }>('/health'),
};

// Export all APIs
export const api = {
  area: areaApi,
  zone: zoneApi,
  shoppers: shoppersApi,
  incentives: incentivesApi,
  billing: billingApi,
  user: userApi,
  health: healthApi,
};