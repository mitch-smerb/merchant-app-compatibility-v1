import { IonImg, IonSpinner } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import logo from '@assets/images/footer-logo.svg';
import bg from '@assets/images/loading-screen-bg.svg';

const Container = styled.div`
  background: url('${bg}');
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: var(--default-width);
  height: 100%;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const Logo = styled(IonImg)`
  width: 170px;
  margin-bottom: 38px;
  margin-top: auto;
`;

const Text = styled.p`
  font-weight: bold;
  color: white;
  margin: 0;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
`;

const Spinner = styled(IonSpinner)`
  --color: white;
  margin-right: 10px;
`;

const PoweredByWrapper = styled.div`
  display: flex;
  color: white;
  font-weight: 600;
  font-size: 13px;
  padding-bottom: 2px;
  margin-top: auto;
  margin-bottom: 20px;
`;

const SmallLogo = styled(IonImg)`
  margin-left: 4px;
  margin-top: 2px;
  width: 40px;
  height: 11px;
`;

export const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <Logo src={logo} />
      <Text>Loading your Competitive Updates</Text>
      <SpinnerWrapper>
        <Spinner name="lines" />
        <Text>Please wait...</Text>
      </SpinnerWrapper>
      <PoweredByWrapper>
        <span>Powered by</span>
        <SmallLogo src={logo} alt="Plink Logo" />
      </PoweredByWrapper>
    </Container>
  );
};

export default LoadingScreen;
