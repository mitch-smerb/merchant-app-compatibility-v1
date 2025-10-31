import { render, waitFor, fireEvent } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import UpgradeMembershipPage from './index';
import flags from '@shared/flags';
import { useGetMembershipPrice } from '@features/membership-price/hooks';

jest.mock('@/api/api-client', () => ({
  api: {
    get: jest.fn()
  }
}));

jest.mock('@features/membership-price/hooks', () => ({
  useGetMembershipPrice: jest.fn()
}));

jest.mock('@shared/flags');

jest.mock('react-router', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useParams: () => ({
      token: ''
    }),
    useLocation: () => ({
      search: ''
    }),
    useHistory: () => ({
      push: () => null
    })
  };
});


const renderUpgradeBusinessPage = () => {
  const Wrapper = createWrapper();
  return render(
    <Wrapper>
      <UpgradeMembershipPage />
    </Wrapper>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<UpgradeBusinessPage />', () => {
  it('shows default page data', async () => {
    flags.requireAddressOnSignup = false;

    (useGetMembershipPrice as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {}
    });

    const { getByPlaceholderText } = renderUpgradeBusinessPage();

    const firstNameInput = await getByPlaceholderText('First Name');
    const lastNameInput = await getByPlaceholderText('Last Name');
    const businessNameInput = await getByPlaceholderText('DBA Name');
    const emailInput = await getByPlaceholderText('Email');
    const phoneInput = await getByPlaceholderText('Phone');
    const numberOfLocationsInput = getByPlaceholderText('# of Locations');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(businessNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
    expect(numberOfLocationsInput).toBeDefined();
  });

  it('shows default page data w/ business address fields', async () => {
    flags.requireAddressOnSignup = true;

    (useGetMembershipPrice as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {}
    });

    const { getByPlaceholderText } = renderUpgradeBusinessPage();

    const firstNameInput = await getByPlaceholderText('First Name');
    const lastNameInput = await getByPlaceholderText('Last Name');
    const businessNameInput = await getByPlaceholderText('DBA Name');
    const emailInput = await getByPlaceholderText('Email');
    const phoneInput = await getByPlaceholderText('Phone');
    const numberOfLocationsInput = getByPlaceholderText('# of Locations');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(businessNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
    expect(numberOfLocationsInput).toBeDefined();
  });

  it('shows error message when invalid value is submitted', async () => {
    const { getByTestId, findByText } = renderUpgradeBusinessPage();

    const submitButton = await findByText('Submit Upgrade');

    fireEvent.submit(submitButton);

    await waitFor(() => expect(getByTestId('error-message')).toBeDefined());
  });
});
