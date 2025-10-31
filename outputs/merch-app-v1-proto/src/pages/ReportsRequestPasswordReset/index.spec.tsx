import { createWrapper } from '@/utils/tests-wrapper';
import { render } from '@testing-library/react';
import ReportsRequestPasswordReset from './index';

const renderReportsRequestPasswordResetPage = () => {
  const Wrapper = createWrapper();
  return render(
    <Wrapper>
      <ReportsRequestPasswordReset />
    </Wrapper>
  )
};

describe('<ReportsRequestPasswordReset />', () => {
  it('shows default page data', async () => {
    const { findByText, getByPlaceholderText } =
      renderReportsRequestPasswordResetPage();

    const emailInput = await getByPlaceholderText('Enter your Email address');
    const requestPasswordResetButton = await findByText('Reset Password');

    expect(emailInput).toBeDefined();
    expect(requestPasswordResetButton).toBeDefined();
  });
});
