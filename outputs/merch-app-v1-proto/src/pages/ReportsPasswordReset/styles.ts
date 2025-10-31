import { IonButton, IonPage } from '@ionic/react';
import styled from 'styled-components';
import plinkLogo from '@assets/images/plink-logo.svg';
import LoginBackgroundImage from '@assets/images/login-bg.png';
import { ExternalLink } from '@pages/ReportsHelp/styles';
import { ProvidedDataErrorMessage } from '../ReportsLogin/styles';

export const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${LoginBackgroundImage});
`;

export const PageTitle = styled.h1`
  font-family: 'Rubik Bold';
  font-size: 23px;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: center;
  margin: 30px 0 16px;
`;

export const PageDescription = styled.p`
  font-family: 'Rubik';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0 66px;

  @media screen and (max-width: 700px) {
    margin: 0 29px;
  }
`;

export const ContactUsLink = styled(ExternalLink)`
  font-family: 'Rubik Medium';
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  color: var(--primary-color);
  text-decoration: underline;
`;

export const FormContainer = styled.div`
  width: 464px;
  min-height: 614px;
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
  padding: 26px 66px 0px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (max-width: 700px) {
    padding: 26px 29px 0px;
  }
`;

interface StyledButtonProps {
  hasErrors: boolean;
}

export const StyledButton = styled(IonButton)<StyledButtonProps>`
  margin: ${(props) => (props.hasErrors ? '20' : '31')}px 0 37px;
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
  width: 259px;
  height: 114px;
`;

interface ResponseErrorMessageProps {
  hasInputErrorAbove: boolean;
}

export const ResponseErrorMessage = styled(
  ProvidedDataErrorMessage
)<ResponseErrorMessageProps>`
  margin-bottom: 0;
  margin-top: ${(props) => (props.hasInputErrorAbove ? '10px' : '0')};
`;
