import { IonFooter } from '@ionic/react';
import React from 'react';
import styled from 'styled-components';
import logo from '@assets/images/footer-logo.svg';

export type FooterProps = {
  openPlinkAlertHandler: () => void;
};

const Container = styled(IonFooter)`
  height: 39px;
  width: var(--default-width);
  bottom: 0;
  color: white;
  background: var(--primary-color);
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const Logo = styled.img`
  margin-left: 4px;
  margin-top: 2px;
  width: 40px;
  height: 11px;
`;

const TextContainer = styled.div`
  display: flex;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  padding-bottom: 2px;
  border-bottom: 1px solid;
`;

export const Header: React.FC<FooterProps> = ({ openPlinkAlertHandler }) => {
  return (
    <Container>
      <TextContainer onClick={openPlinkAlertHandler}>
        <span>Powered by</span>
        <Logo src={logo} alt="Plink Logo" />
      </TextContainer>
    </Container>
  );
};

export default Header;
