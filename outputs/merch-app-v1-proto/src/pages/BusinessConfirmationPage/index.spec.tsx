import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import { AppContextProvider } from '@shared/AppContext';
import BusinessConfirmationPage from './index';
import { routes } from '@shared/constants';

const renderBusinessConfirmationPage = (email: string) =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: routes.signupConfirmation,
          state: {
            signupEmail: email
          }
        }
      ]}
    >
      <AppContextProvider>
        <BusinessConfirmationPage />
      </AppContextProvider>
    </MemoryRouter>
  );

describe('<BusinessConfirmationPage />', () => {
  it('shows default page data', async () => {
    const email = faker.internet.email();

    const { findByText } = renderBusinessConfirmationPage(email);

    const emailText = await findByText(email);

    expect(emailText).toBeDefined();
  });
});
