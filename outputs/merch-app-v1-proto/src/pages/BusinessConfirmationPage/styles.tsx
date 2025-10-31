import styled from 'styled-components';
import { IonContent, IonPage } from '@ionic/react';
import EmailSentIcon from '@assets/images/email-sent.svg';
import { colors } from '@pages/BusinessSignup/styles';

export const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.neutral[100]};
`;

export const StyledContent = styled(IonContent)`
  --overflow: hidden;
  width: 755px;
  max-height: 90vh;
  border-radius: 16px;
  background: ${colors.neutral[100]};
  box-shadow: 0px 22px 54px rgba(97, 107, 137, 0.16);
  margin: auto 0;

  @media only screen and (max-width: 755px) {
    width: 100vw;
    max-height: 100vh;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px;
  padding-top: 30px;
  max-height: 80vh;

  @media only screen and (max-width: 755px) {
    padding: 30px;
    padding-top: 15px;
    max-height: 95vh;
  }
`;

export const StyledSection = styled.div`
  margin: 30px;
  text-align: center;

  font-family: 'Montserrat Medium';
  color: ${colors.neutral[35]};
  font-size: 18px;

  @media only screen and (max-width: 755px) {
    margin: 15px;
    font-size: 16px;
  }
`;

export const StyledHeader = styled.div`
  font-family: 'Montserrat Bold';
  font-size: 34px;
  color: ${colors.neutral[40]};

  @media only screen and (max-width: 755px) {
    font-size: 26px;
  }
`;

export const StyledImage = styled.img.attrs({
  src: EmailSentIcon
})`
  margin: auto;
`;

export const EmailLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  color: ${colors.secondary[25]};
  text-decoration: none;
`;
