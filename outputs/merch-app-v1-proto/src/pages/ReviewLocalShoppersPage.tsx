import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import LocalShoppersPage from './LocalShoppers';

const ReviewLocalShoppersPage: React.FC = () => {
  const handleNavigate = (tab: string) => {
    console.log('Navigate to:', tab);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/review" />
          </IonButtons>
          <IonTitle>Review: Local Shoppers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LocalShoppersPage />
      </IonContent>
    </IonPage>
  );
};

export default ReviewLocalShoppersPage;