import { createWrapper } from '@/utils/tests-wrapper';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { ionFireEvent, waitForIonicReact } from '@ionic/react-test-utils';
import { useGetMembershipPrice } from '@/features/membership-price/hooks';
import { usePostRegisterBusiness, useGetPaymentToken, usePostRegistrationInProgress } from '@/features/business/hooks';
import { AppContextProvider } from '@/shared/AppContext';
import StaticPriceSignupPage from './index';
import flags from '@/shared/flags';


jest.mock('@/api/api-client', () => ({
  api: {
    get: jest.fn()
  }
}));

jest.mock('@/features/business/hooks', () => ({
  usePostRegisterBusiness: jest.fn(),
  useGetPaymentToken: jest.fn(),
  usePostRegistrationInProgress: jest.fn(),
}))

jest.mock('@/features/membership-price/hooks', () => ({
  useGetMembershipPrice: jest.fn()
}));

jest.mock('@shared/flags');

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

const renderStaticPriceBusinessSignupPage = () => {
  const Wrapper = createWrapper()
  return render(
    <Wrapper>
      <StaticPriceSignupPage />
    </Wrapper>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  (useGetMembershipPrice as jest.Mock).mockReturnValue({
    isLoading: false,
    error: null,
    data: {
      default: { monthlyTotalPrice: 99.99, monthlyPerStorePrice: 99.99, plan: 'basic' },
      promoCodeApplied: null,
    },
  });
  (usePostRegisterBusiness as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({ success: true }),
    isPending: false,
  });
  (useGetPaymentToken as jest.Mock).mockReturnValue({
    data: { statusCode: 0, paymentId: '123', cardPaymentToken: 'token123' },
    isLoading: false,
  });
  (usePostRegistrationInProgress as jest.Mock).mockReturnValue({
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
  });
});

describe('<StaticPriceBusinessSignup />', () => {
  it('shows default page data', async () => {
    flags.requireAddressOnSignup = false;

    const {
      findByText,
      getByPlaceholderText,
      getAllByPlaceholderText,
      queryByTestId,
      findAllByText,
      queryByPlaceholderText
    } = renderStaticPriceBusinessSignupPage();

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
    const promoCodeInput = getByPlaceholderText('QWERTY');
    const submitButton = await findByText('Submit');
    const firstPriceLabel = await findByText('Plink Membership Price');
    const secondPriceLabel = await findAllByText('Your Price');
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
    expect(promoCodeInput).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(firstPriceLabel).toBeDefined();
    expect(secondPriceLabel).toHaveLength(2);
    expect(errorMessage).toBeNull();
  });

  it('shows default page data w/ business address fields', async () => {
    flags.requireAddressOnSignup = true;

    (useGetMembershipPrice as jest.Mock).mockReturnValue({
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
    } = renderStaticPriceBusinessSignupPage();

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
    const promoCodeInput = getByPlaceholderText('QWERTY');
    const submitButton = await findByText('Submit');
    const firstPriceLabel = await findByText('Plink Membership Price');
    const secondPriceLabel = await findAllByText('Your Price');
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
    expect(promoCodeInput).toBeDefined();
    expect(submitButton).toBeDefined();
    expect(firstPriceLabel).toBeDefined();
    expect(secondPriceLabel).toHaveLength(2);
    expect(errorMessage).toBeNull();
  });

  it('shows error message when invalid value is submitted', async () => {
    const { getByTestId, findByText } = renderStaticPriceBusinessSignupPage();

    const submitButton = await findByText('Submit');

    fireEvent.submit(submitButton);

    await waitFor(() => expect(getByTestId('error-message')).toBeDefined());
  });

  // TODO: update IonInput to use e.detail.value (see admin-app), so fireEvent.ionChange works
  it.skip('shows success message on submit', async () => {
    const { getByPlaceholderText, findByText } =
      renderStaticPriceBusinessSignupPage();
    await waitForIonicReact();

    const firstNameInput = await getByPlaceholderText('First Name');
    const lastNameInput = await getByPlaceholderText('Last Name');
    const businessNameInput = await getByPlaceholderText('DBA Name');
    const emailInput = await getByPlaceholderText('Email');
    const phoneInput = await getByPlaceholderText('Phone');

    const fakeEmail = faker.internet.email();
    ionFireEvent.ionChange(firstNameInput, faker.name.firstName());
    ionFireEvent.ionChange(lastNameInput, faker.name.lastName());
    ionFireEvent.ionChange(businessNameInput, faker.company.companyName());
    ionFireEvent.ionChange(emailInput, fakeEmail);
    ionFireEvent.ionChange(phoneInput, faker.phone.number());

    await waitFor(() =>
      expect((emailInput as HTMLInputElement).value).toBe(fakeEmail)
    );

    global.alert = jest.fn();
    const submitButton = await findByText('Submit');
    fireEvent.submit(submitButton);

    await waitFor(() =>
      expect(global.alert).toHaveBeenCalledWith('Submitted!')
    );
  });
});
