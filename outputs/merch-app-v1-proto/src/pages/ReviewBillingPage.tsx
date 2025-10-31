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
import BillingPage from './Billing';

const ReviewBillingPage: React.FC = () => {
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
          <IonTitle>Review: Billing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BillingPage />
      </IonContent>
    </IonPage>
  );
};

export default ReviewBillingPage;