import styled from 'styled-components';
import { IonButton, IonList } from '@ionic/react';
import darkModePlinkLogo from '@assets/images/plink-logo-dark-mode.svg';
import { StyledItem } from './components/MenuItem/styles';

export const CloseButton = styled(IonButton)`
  --background: transparent;
  --box-shadow: none;
  position: absolute;
  top: -40px;
  right: -20px;
  font-size: 30px;
`;

export const PlinkLogo = styled.img.attrs({
  src: darkModePlinkLogo,
  alt: 'Plink Logo'
})`
  margin-right: auto;
  margin-bottom: 35px;
  width: 200px;
`;

export const StyledContent = styled.div`
  height: 100vh;
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 40px;
  position: relative;
`;

export const StyledList = styled(IonList)`
  background: var(--primary-color);
  margin-left: -30px;
  margin-right: -30px;
  flex: 1;
`;

interface LogoutItemProps {
  isDeviceIphone: boolean;
}

export const LogoutItem = styled(StyledItem)<LogoutItemProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.isDeviceIphone ? '150px' : '75px')};
`;
