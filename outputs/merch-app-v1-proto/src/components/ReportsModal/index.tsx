/* eslint-disable react/require-default-props */
import React, { ReactNode } from 'react';
import { IonButtons, IonRow, IonTitle } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import {
  Modal,
  Header,
  Toolbar,
  Title,
  Button,
  Content,
  CloseIcon
} from './styles';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: ReactNode;
  height: {
    desktop: number;
    mobile: number;
  };
  buttonText?: string;
  allowClose?: boolean;
}

const ReportsModal: React.FC<ReportsModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  buttonText,
  height,
  allowClose = true
}) => {
  return (
    <Modal height={height} isOpen={isOpen} backdropDismiss={allowClose}>
      <Header>
        <Toolbar>
          <IonTitle className="text-center font-mont font-bold">{ title }</IonTitle>
          <IonButtons slot="end" style={{ margin: 0 }}>
            {allowClose && (
              <CloseIcon
                slot="icon-only"
                size="large"
                className="icon"
                icon={closeOutline}
                onClick={onClose}
              />
            )}
          </IonButtons>
        </Toolbar>
      </Header>

      <Content>
        {content}
        {buttonText && (
          <IonRow class="ion-justify-content-center">
            <Button onClick={onClose}>{buttonText}</Button>
          </IonRow>
        )}
      </Content>
    </Modal>
  );
};

export default ReportsModal;
