import { createWrapper } from '@/utils/tests-wrapper';
import { render } from '@testing-library/react';
import CompetitiveNewsfeedPage from './CompetitiveNewsfeedPage';
import { testCompetitiveUpdates } from '@test/test-server-handler';

describe('<CompetitiveNewsfeed />', () => {
  it('displays card with update data', async () => {
    const Wrapper = createWrapper();

    const { findByText, findAllByTestId } = render(
      <Wrapper>
        <CompetitiveNewsfeedPage
          merchantId={123}
          newsfeedData={testCompetitiveUpdates}
          openProfitCoachAlertHandler={() => jest.fn()}
          openSupportAlertHandler={() => jest.fn()}
        />
      </Wrapper>
    );

    const cards = await findAllByTestId('update-card');
    const cardTitle = await findByText(
      testCompetitiveUpdates.competitiveUpdates[0].title
    );
    const cardText = await findByText(
      testCompetitiveUpdates.competitiveUpdates[0].text
    );

    expect(cards).toHaveLength(3);
    expect(cardTitle).toBeDefined();
    expect(cardText).toBeDefined();
  });
});
