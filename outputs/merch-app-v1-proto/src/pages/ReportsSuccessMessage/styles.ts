import { IonButton, IonPage } from '@ionic/react';
import styled from 'styled-components';
import greenCheck from '@assets/icons/GreenCheck.svg';
import LoginBackgroundImage from '@assets/images/login-bg.png';

export const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${LoginBackgroundImage});
`;

export const PageTitle = styled.h1`
  font-family: 'Inter Bold';
  font-size: 19.542px;
  text-align: center;
  margin: 40.31px 0 0;

  @media screen and (max-width: 700px) {
    font-size: 16px;
    margin: 27px 0 0;
  }
`;

export const PageDescription = styled.p`
  font-family: 'Rubik';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  margin: 16px 0 0;
`;

export const Container = styled.div`
  width: 464px;
  height: 492px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 66px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    padding: 60px 29px 0;
  }
`;

export const StyledButton = styled(IonButton)`
  margin: 39.51px 0 auto;
  font-family: 'Rubik Bold';
  font-size: 16px;

  --padding-top: 22px;
  --padding-bottom: 22px;
  --padding-start: 0;
  --padding-end: 0;

  ::part(native) {
    border-radius: 8px;
    background: var(--primary-color);
    text-transform: none;
  }
`;

export const GreenCheckIcon = styled.img.attrs({
  src: greenCheck,
  alt: 'Green check'
})`
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  width: 88px;
  height: 88px;

  @media screen and (max-width: 700px) {
    margin-top: 0;
  }
`;
