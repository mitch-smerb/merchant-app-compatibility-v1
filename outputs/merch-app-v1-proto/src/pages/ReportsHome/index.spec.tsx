import { render } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import ReportsHomePage from './index';

jest.mock('@/features/businesses/hooks', () => ({
  useGetBusinesses: jest.fn(),
  useBusinessStore: jest.fn()
}));

jest.mock('@/features/reports-auth/hooks', () => ({
  useReportsAuthStore: jest.fn(),
  usePostReportsLogout: jest.fn(),
}));

jest.mock('@/features/reports/hooks', () => ({
  useGetReportsDashboards: jest.fn(),
  usePostReportsGuestToken: jest.fn()
}));

const { useGetBusinesses, useBusinessStore } = require('@/features/businesses/hooks');
const { useReportsAuthStore, usePostReportsLogout } = require('@/features/reports-auth/hooks');
const { useGetReportsDashboards, usePostReportsGuestToken } = require('@/features/reports/hooks');

beforeEach(() => {
  // Setup dos mocks
  (useReportsAuthStore as unknown as jest.Mock).mockReturnValue({
    auth: {
      principalType: 'BusinessUser',
      merchantLoginId: 1,
      role: 'admin'
    }
  });

  (useBusinessStore as unknown as jest.Mock).mockReturnValue({
    selectedBusiness: { merchantLoginId: 1 },
    setSelectedBusiness: jest.fn()
  });

  (useGetBusinesses as jest.Mock).mockReturnValue({
    data: {
      businesses: [
        { merchantLoginId: 1, name: 'Test Business' }
      ]
    },
    isLoading: false,
    error: null
  });

  (useGetReportsDashboards as jest.Mock).mockReturnValue({
    data: { dashboardIds: ['dashboard-id-1', 'dashboard-id-2'] },
    isLoading: false,
    error: null,
    refetch: jest.fn(() => Promise.resolve({
      data: { dashboardIds: ['dashboard-id-1', 'dashboard-id-2'] }
    }))
  });

  (usePostReportsGuestToken as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn(() => Promise.resolve({})),
    isPending: false,
    error: null
  });

  (usePostReportsLogout as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn(() => Promise.resolve({})),
    isPending: false,
    error: null
  });
});

jest.mock('@preset-sdk/embedded', () => {
  const originalModule = jest.requireActual('@ionic/react');
  return {
    ...originalModule,
    embedDashboard: () => undefined
  };
});

jest.mock('@ionic/react', () => {
  const originalModule = jest.requireActual('@ionic/react');
  return {
    ...originalModule,
    getPlatforms: () => ['desktop']
  };
});

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => ({})
  };
});

const renderReportsHomePage = () => {
  const wrapper = createWrapper();
  return render(<ReportsHomePage />, { wrapper });
};

describe('<ReportsHome />', () => {
  it('renders dashboards containers', async () => {
    const { findByTestId } = renderReportsHomePage();

    const dashboardContainer1 = await findByTestId(
      'dashboard-container-dashboard-id-1'
    );
    const dashboardContainer2 = await findByTestId(
      'dashboard-container-dashboard-id-2'
    );

    expect(dashboardContainer1).toBeDefined();
    expect(dashboardContainer2).toBeDefined();
  });
});
