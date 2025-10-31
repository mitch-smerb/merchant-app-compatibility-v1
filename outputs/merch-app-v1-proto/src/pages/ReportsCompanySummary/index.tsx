import React, { useState } from 'react';
import {
  BulletItem,
  BulletList,
  ButtonContainer,
  Image,
  PageHeader,
  PageTitle,
  StyledButton,
  StyledContent,
  Text
} from './styles';
import ReportsPageWrapper from '@components/ReportsPageWrapper';
import { useViewMyBankDemo } from '@utils/hooks';
import imageSrc from '@assets/images/whatisplink-page.png';
import ReportsBankDemoNotReadyModal from '@components/ReportsBankDemoNotReadyModal';

const ReportsCompanySummary: React.FC = () => {
  const handleViewMyBankDemo = useViewMyBankDemo();

  const [showShowBankDemoNotReadyModal, setShowBankDemoNotReadyModal] =
    useState(false);

  const handleViewMyDemoClick = () =>
    handleViewMyBankDemo(() => setShowBankDemoNotReadyModal(true));

  return (
    <ReportsPageWrapper>
      <StyledContent>
        <PageHeader>
          <PageTitle>What is Plink?</PageTitle>
        </PageHeader>

        <Text>
          Plink provides your business exposure to valuable local customers in
          the digital channels of nearby banks and credit unions.
        </Text>

        <Image src={imageSrc} />

        <BulletList>
          <BulletItem>
            Reach an audience of bank and credit union members that actually
            spend in your neighborhood.
          </BulletItem>
          <BulletItem>
            Be seen in digital channels previously reserved for national chains.
          </BulletItem>
          <BulletItem>Gain recognition as a top local business.</BulletItem>
        </BulletList>

        <ButtonContainer>
          <StyledButton type="button" onClick={handleViewMyDemoClick}>
            View My Demo
          </StyledButton>
        </ButtonContainer>

        <ReportsBankDemoNotReadyModal
          isOpen={showShowBankDemoNotReadyModal}
          onClose={() => setShowBankDemoNotReadyModal(false)}
        />
      </StyledContent>
    </ReportsPageWrapper>
  );
};

export default ReportsCompanySummary;
