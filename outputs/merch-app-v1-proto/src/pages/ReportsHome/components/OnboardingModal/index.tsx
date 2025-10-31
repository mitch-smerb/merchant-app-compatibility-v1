import React, { useEffect, useState } from 'react';
import ReportsModal from '@components/ReportsModal';
import { TextItem } from '@components/ReportsModal/styles';

const OnboardingModal: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const isFirstVisit =
      localStorage.getItem('isReportsHomePageFirstVisit') === null;
    if (isFirstVisit) {
      setShowOnboarding(true);
      localStorage.setItem('isReportsHomePageFirstVisit', 'false');
    }
  }, []);

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  return (
    <ReportsModal
      isOpen={showOnboarding}
      onClose={closeOnboarding}
      title="Welcome!"
      content={
        <>
          <TextItem>
            1. See the size of the audience of local shoppers you are accessing
            through digital channels of local banks.
          </TextItem>
          <TextItem>
            2. See a breakdown of how nearby customers are spending on local and
            national business as well as categories.
          </TextItem>
          <TextItem>
            3. Also find links to your business profile and campaigns, a demo of
            how your business is seen in digital bank channels and answers to a
            list of frequently asked questions.
          </TextItem>
        </>
      }
      buttonText="Okay, let's go!"
      height={{ desktop: 530, mobile: 505 }}
    />
  );
};

export default OnboardingModal;
