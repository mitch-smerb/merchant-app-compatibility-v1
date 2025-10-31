import { IonButton, IonPage } from '@ionic/react';
import styled from 'styled-components';
import plinkLogo from '@assets/images/plink-logo.svg';
import LoginBackgroundImage from '@assets/images/login-bg.png';
import { ErrorMessage } from './FormInput/styles';

export const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${LoginBackgroundImage});
`;

export const ProvidedDataErrorMessage = styled(ErrorMessage)`
  margin: 10px 0 20px;
  padding: 10px 0 10px 10px;
  background-color: #f8d7da;
`;

export const FormContainer = styled.div`
  width: 464px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;

  @media screen and (max-width: 700px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }

  /* @media (prefers-color-scheme: dark) {
    background: #35363a;
  } */
`;

export const StyledForm = styled.form`
  padding: 38px 66px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 700px) {
    padding: 38px 29px 0px;
  }
`;

export const StyledButton = styled(IonButton)`
  margin: 24px 0;
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

export const Heading = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  letter-spacing: 0.5px;
  margin-bottom: 30px;
`;

export const PlinkLogo = styled.img.attrs({
  src: plinkLogo,
  alt: 'Plink Logo'
})`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 20%;
`;

export const NavButton = styled(IonButton)`
  margin: 10px auto;
  margin-left: auto;
  margin-bottom: auto;
  margin-right: auto;
  font-family: 'Rubik Medium';
  font-size: 14px;

  ::part(native) {
    text-transform: none;
    text-decoration: underline;
  }

  /* @media (prefers-color-scheme: dark) {
    color: var(--ion-color-light);
  } */
`;
