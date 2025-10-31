import { render, waitFor, fireEvent } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import { useGetDynamicMembershipPrice } from '@/features/dynamic-membership-price/hooks';
import DynamicPriceSignupPage from './index';
import flags from '@/shared/flags';

jest.mock('@/api/api-client', () => ({
  api: {
    get: jest.fn()
  }
}));

jest.mock('@/features/dynamic-membership-price/hooks', () => ({
  useGetDynamicMembershipPrice: jest.fn()
}));

jest.mock('@/shared/flags');

jest.mock('react-router', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => ({
      search: ''
    }),
    useHistory: () => ({
      push: () => null
    })
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

const renderDynamicPriceBusinessSignupPage = () => {
  const Wrapper = createWrapper();

  return render(
    <Wrapper>
      <DynamicPriceSignupPage />
    </Wrapper>
  );
};

describe('<DynamicPriceBusinessSignup />', () => {
  it('shows default page data', async () => {
    flags.requireAddressOnSignup = false;

    (useGetDynamicMembershipPrice as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {}
    });

    const {
      findByText,
      getByPlaceholderText,
      getAllByPlaceholderText,
      queryByTestId,
      findAllByText,
      queryByPlaceholderText
    } = renderDynamicPriceBusinessSignupPage();

    const firstNameInput = await getByPlaceholderText('First Name');
    const lastNameInput = await getByPlaceholderText('Last Name');
    const businessNameInput = await getByPlaceholderText('DBA Name');
    const emailInput = await getByPlaceholderText('Email');
    const phoneInput = await getByPlaceholderText('Phone');
    const numberOfLocationsInput = getByPlaceholderText('# of Locations');
    const streetAddressInput = queryByPlaceholderText('Street Address');
    const cityInput = queryByPlaceholderText('City');
    const stateInput = queryByPlaceholderText('State');
    const zipCodeInput = getAllByPlaceholderText('Zip Code');
    const submitButton = await findByText('Submit');
    const firstPriceLabel = await findByText('Plink Membership Price');
    const secondPriceLabel = await findAllByText('Your Price Today');
    const thirdPriceLabel = await findByText('Price Once Audience is Complete');
    const errorMessage = await queryByTestId('error-message');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(businessNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
    expect(numberOfLocationsInput).toBeDefined();
    expect(streetAddressInput).toBeNull();
    expect(cityInput).toBeNull();
    expect(stateInput).toBeNull();
    expect(zipCodeInput).toHaveLength(1);
    expect(firstPriceLabel).toBeDefined();
    expect(secondPriceLabel).toHaveLength(2);
    expect(thirdPriceLabel).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(errorMessage).toBeNull();
  });

  it('shows default data w/ business address fields', async () => {
    flags.requireAddressOnSignup = true;

    (useGetDynamicMembershipPrice as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: {}
    });

    const {
      findByText,
      getByPlaceholderText,
      getAllByPlaceholderText,
      queryByTestId,
      findAllByText
    } = renderDynamicPriceBusinessSignupPage();

    const firstNameInput = await getByPlaceholderText('First Name');
    const lastNameInput = await getByPlaceholderText('Last Name');
    const businessNameInput = await getByPlaceholderText('DBA Name');
    const emailInput = await getByPlaceholderText('Email');
    const phoneInput = await getByPlaceholderText('Phone');
    const numberOfLocationsInput = getByPlaceholderText('# of Locations');
    const streetAddressInput = getByPlaceholderText('Street Address');
    const cityInput = getByPlaceholderText('City');
    const stateInput = getByPlaceholderText('State');
    const zipCodeInput = getAllByPlaceholderText('Zip Code');
    const submitButton = await findByText('Submit');
    const firstPriceLabel = await findByText('Plink Membership Price');
    const secondPriceLabel = await findAllByText('Your Price Today');
    const thirdPriceLabel = await findByText('Price Once Audience is Complete');
    const errorMessage = await queryByTestId('error-message');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(businessNameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(phoneInput).toBeDefined();
    expect(numberOfLocationsInput).toBeDefined();
    expect(streetAddressInput).toBeDefined();
    expect(cityInput).toBeDefined();
    expect(stateInput).toBeDefined();
    expect(zipCodeInput).toHaveLength(2);
    expect(firstPriceLabel).toBeDefined();
    expect(secondPriceLabel).toHaveLength(2);
    expect(thirdPriceLabel).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(errorMessage).toBeNull();
  });

  it('shows error message when invalid value is submitted', async () => {
    const { getByTestId, findByText } = renderDynamicPriceBusinessSignupPage();

    const submitButton = await findByText('Submit');

    fireEvent.submit(submitButton);

    await waitFor(() => expect(getByTestId('error-message')).toBeDefined());
  });
});
