/**
 * Services entry point
 * Exports all API services and types for easy importing
 */

// Export all types
export * from './types';

// Export API services
export { api } from './api';

// Export mock data (for development)
export { mockApi, simulateApiDelay } from './mockData';
export {
  mockAreaData,
  mockZoneMetrics,
  mockShopperMetrics,
  mockIncentiveData,
  mockBillingData,
  mockCampaigns,
  mockDemographics,
  mockLocation,
  mockUserData,
} from './mockData';

// Configuration for switching between mock and real API
export const USE_MOCK_API = process.env.REACT_APP_USE_MOCK_API !== 'false';

// Main API export - switches between mock and real based on environment
export const plinkApi = USE_MOCK_API ? 
  (await import('./mockData')).mockApi : 
  (await import('./api')).api;