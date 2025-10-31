import { render } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import ReportsLogin from './index';

const renderReportsLoginPage = () => {
  const Wrapper = createWrapper();

  return render(
    <Wrapper>
      <ReportsLogin />
    </Wrapper>
  );
};

describe('<ReportsLogin />', () => {
  it('shows default page data', async () => {
    const { findByText, getByPlaceholderText } = renderReportsLoginPage();

    const firstNameInput = await getByPlaceholderText(
      'Enter your Email address'
    );
    const lastNameInput = await getByPlaceholderText('Enter your password');
    const signInButton = await findByText('Sign In');
    const forgorPasswordButton = await findByText('Forgot password?');

    expect(firstNameInput).toBeDefined();
    expect(lastNameInput).toBeDefined();
    expect(signInButton).toBeDefined();
    expect(forgorPasswordButton).toBeDefined();
  });
});
