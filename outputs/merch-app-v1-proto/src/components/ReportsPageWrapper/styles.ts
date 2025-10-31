import styled from 'styled-components';
import { IonBackButton, IonCol, IonPage } from '@ionic/react';
import plinkLogoImage from '@assets/images/plink-logo.svg';

interface StyledPageProps {
  isDesktop: boolean;
}

export const StyledPage = styled(IonPage)<StyledPageProps>`
  display: flex;
  flex-direction: ${(props) => (props.isDesktop ? 'row' : 'column')};
`;

export const LeftSideColumn = styled(IonCol)`
  max-width: 291px;
  flex: 0.25;
  padding: 0;
  background-color: var(--primary-color);
`;

export const BackButton = styled(IonBackButton)`
  --padding-start: 5px;
  --padding-end: 15px;
`;

export const PlinkLogo = styled.img.attrs({
  src: plinkLogoImage,
  alt: 'Plink Logo'
})`
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  width: 70px;
`;
