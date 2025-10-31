import { render } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import ReportsHelpPage from './index';
import { faqItems as expectedFaqItems } from './utils';

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

const renderReportsHelpPage = () => {
  const Wrapper = createWrapper();
  return render(
    <Wrapper>
      <ReportsHelpPage />
    </Wrapper>
  );
};

describe('<ReportsHelp />', () => {
  it('renders page content', async () => {
    const { findAllByTestId, getByText } = renderReportsHelpPage();

    const customerSupportTitle = await getByText('Contact Support');
    const faqTitle = await getByText('Frequently Asked Questions');
    const faqItems = await findAllByTestId('faq-item');

    expect(customerSupportTitle).toBeDefined();
    expect(faqTitle).toBeDefined();
    expect(faqItems).toHaveLength(expectedFaqItems.length);
  });
});
