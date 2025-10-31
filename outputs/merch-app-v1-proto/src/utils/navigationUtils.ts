import { routes } from '../shared/constants';

export const getNavigationMap = () => ({
  // Bottom navigation items
  'Area Reach': routes.areaAudience,
  'Neighborhood Reach': routes.neighborhood,
  'Current Shoppers': routes.localShoppers,
  // Hamburger menu items
  'Incentives Controller': routes.incentives,
  'Billing': routes.billing,
  'Demo': routes.whatsPlinkDemo,
  'FAQ': routes.faq,
  // Alternative mappings
  'Incentive Controller': routes.incentives,
});

export const handleNavigation = (tab: string, history: any) => {
  console.log('Navigate to:', tab);

  const navigationMap = getNavigationMap();

  if (navigationMap[tab as keyof typeof navigationMap]) {
    history.push(navigationMap[tab as keyof typeof navigationMap]);
  }
};