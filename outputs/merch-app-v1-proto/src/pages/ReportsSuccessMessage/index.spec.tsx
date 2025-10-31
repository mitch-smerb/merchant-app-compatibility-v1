import { createWrapper } from '@/utils/tests-wrapper';
import { render } from '@testing-library/react';
import ReportsSuccessMessagePage from './index';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: () => ({
      state: {
        title: 'Successful Test Message'
      }
    })
  };
});

const renderReportsSuccessMessagePage = () => {
  const Wrapper = createWrapper();
  return render(
    <Wrapper>
      <ReportsSuccessMessagePage />
    </Wrapper>
  )
};

describe('<ReportsSuccessMessage />', () => {
  it('shows default page data', async () => {
    const { findByText } = renderReportsSuccessMessagePage();

    const message = await findByText('Successful Test Message');
    const signInButton = await findByText('Sign In');

    expect(message).toBeDefined();
    expect(signInButton).toBeDefined();
  });
});
