// Shared location/neighborhood data
// 🔄 REPLACE: This should be replaced with an API call to get merchant's actual location
export const locationData = {
  neighborhood: "Altamonte Springs", // 🔄 REPLACE: API call to GET /api/merchant/{id}/location
  city: "Altamonte Springs",         // 🔄 REPLACE: API call to GET /api/merchant/{id}/location
  state: "FL"                        // 🔄 REPLACE: API call to GET /api/merchant/{id}/location
};

export const getNeighborhood = () => locationData.neighborhood;

/**
 * 🔧 FOR DEVELOPERS: Replace this with actual API integration
 * 
 * Example implementation:
 * 
 * export const getLocationData = async (merchantId: string) => {
 *   const response = await fetch(`/api/merchant/${merchantId}/location`);
 *   return response.json();
 * };
 * 
 * export const getNeighborhood = async (merchantId: string) => {
 *   const locationData = await getLocationData(merchantId);
 *   return locationData.neighborhood;
 * };
 */