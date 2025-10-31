import { render } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import ReportsPasswordReset from './index';

const renderReportsPasswordResetPage = () => {
  const Wrapper = createWrapper();
  return render(
    <Wrapper>
      <ReportsPasswordReset />
    </Wrapper>
  )
};
describe('<ReportsPasswordReset />', () => {
  it('shows default page data', async () => {
    const { findByText, getByPlaceholderText } =
      renderReportsPasswordResetPage();

    const passwordInput = await getByPlaceholderText('Enter your new password');
    const passwordConfirmationInput = await getByPlaceholderText(
      'Enter your new password again'
    );
    const requestPasswordResetButton = await findByText('Submit Password');

    expect(passwordInput).toBeDefined();
    expect(passwordConfirmationInput).toBeDefined();
    expect(requestPasswordResetButton).toBeDefined();
  });
});
