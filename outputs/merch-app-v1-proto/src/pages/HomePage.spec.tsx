import { createWrapper } from '@/utils/tests-wrapper';
import { render } from '@testing-library/react';
import HomePage from './HomePage';
import {
  testCompetitiveUpdates,
  testMerchant
} from '@test/test-server-handler';
import { useAuthTokenStore } from '@features/auth/hooks';
import { usePatchCompetititveUpdate } from '../features/competitive-updates/hooks';

// Mock dos hooks do TanStack Query
jest.mock('@features/merchant/hooks', () => ({
  useGetMerchant: jest.fn()
}));

jest.mock('@features/competitive-updates/hooks', () => ({
  useGetCompetitiveUpdates: jest.fn(),
  usePatchCompetititveUpdate: jest.fn(),
}));

// Mock do Zustand store
jest.mock('@features/auth/hooks', () => ({
  useAuthTokenStore: jest.fn()
}));

const { useGetMerchant } = require('@features/merchant/hooks');
const { useGetCompetitiveUpdates } = require('@features/competitive-updates/hooks');

describe('<HomePage />', () => {
  beforeEach(() => {
    (useAuthTokenStore as unknown as jest.Mock).mockReturnValue({
      authToken: { merchantId: 123 }
    });

    (usePatchCompetititveUpdate as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(() => Promise.resolve({})),
      isPending: false,
      error: null
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows merchant info and competitive cards', async () => {
    // Mock dos hooks do TanStack Query
    (useGetMerchant as jest.Mock).mockReturnValue({
      data: testMerchant,
      isLoading: false,
      error: null
    });

    (useGetCompetitiveUpdates as jest.Mock).mockReturnValue({
      data: testCompetitiveUpdates,
      isLoading: false,
      error: null
    });

    const Wrapper = createWrapper();

    const { findByText, findAllByTestId } = render(
      <Wrapper>
        <HomePage />
      </Wrapper>
    );

    const merchantName = await findByText(testMerchant.name);
    const cards = await findAllByTestId('update-card');

    expect(merchantName).toBeDefined();
    expect(cards).toHaveLength(3);
  });

});
