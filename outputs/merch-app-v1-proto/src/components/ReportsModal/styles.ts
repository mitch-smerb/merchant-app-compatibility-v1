import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonToolbar
} from '@ionic/react';
import styled from 'styled-components';

interface ModalProps {
  height: {
    desktop: number;
    mobile: number;
  };
}

export const Modal = styled(IonModal)<ModalProps>`
  --backdrop-opacity: 0.7 !important;
  --border-radius: 6px;
  --height: ${(props) => props.height.desktop}px;
  --width: 464px;

  @media screen and (max-width: 900px) {
    --height: ${(props) => props.height.mobile}px;
    --width: 294px;
  }
`;

export const Header = styled(IonHeader)`
  ::after {
    background-image: none;
  }
`;

export const Toolbar = styled(IonToolbar)`
  --border-width: 0 !important;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;

  .icon {
    color: var(--reports-title-color) !important;
    stroke: var(--reports-title-color) !important;
  }
`;

export const Content = styled(IonContent)`
  display: flex;
  flex-direction: column;

  --padding-top: 24px;
  --padding-start: 45px;
  --padding-end: 45px;

  @media screen and (max-width: 900px) {
    --padding-start: 30px;
    --padding-end: 30px;
  }
`;

export const CloseIcon = styled(IonIcon)`
  margin-top: 22px !important;
  margin-right: 16px !important;

  @media screen and (max-width: 900px) {
    margin-top: 10px !important;
    margin-right: 10px !important;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-family: 'Inter Bold';
  text-align: center;
  margin-top: 11px;
  margin-bottom: 30px;

  @media screen and (max-width: 900px) {
    font-size: 16px;
    margin-top: 3px;
    margin-bottom: 20px;
  }
`;

export const TextItem = styled.p`
  font-size: 16px;
  font-family: 'Inter Medium';
  text-align: left;
  margin-bottom: 30px;

  @media screen and (max-width: 900px) {
    font-size: 14px;
    margin-bottom: 17px;
  }
`;

export const Button = styled(IonButton)`
  font-family: 'Inter Bold';
  font-size: 16px;
  margin-top: 19px;

  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 45px;
  --padding-end: 45px;

  ::part(native) {
    border-radius: 4px;
    background: var(--primary-color);
    text-transform: none;
  }
`;
