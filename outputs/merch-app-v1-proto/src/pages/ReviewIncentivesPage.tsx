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
import IncentivePage from './Incentive';

const ReviewIncentivesPage: React.FC = () => {
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
          <IonTitle>Review: Incentive Controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IncentivePage />
      </IonContent>
    </IonPage>
  );
};

export default ReviewIncentivesPage;