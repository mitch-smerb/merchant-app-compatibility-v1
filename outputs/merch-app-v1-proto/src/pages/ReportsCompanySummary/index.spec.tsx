import { render } from '@testing-library/react';
import { createWrapper } from '@/utils/tests-wrapper';
import ReportsCompanySummaryPage from './index';

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

const renderReportsCompanySummaryPage = () => {
  const Wrapper = createWrapper();

  return render(
    <Wrapper>
      <ReportsCompanySummaryPage />
    </Wrapper>
  );
};

describe('<ReportsCompanySummary />', () => {
  it('renders page content', async () => {
    const { findAllByText } = renderReportsCompanySummaryPage();

    const pageTitle = await findAllByText('What is Plink?');

    expect(pageTitle).toHaveLength(2);
  });
});
