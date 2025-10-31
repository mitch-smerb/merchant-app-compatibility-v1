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
import AreaAudiencePage from './AreaAudience';

const ReviewAreaAudiencePage: React.FC = () => {
  const handleNavigate = (tab: string) => {
    console.log('Navigate to:', tab);
    // In review mode, just log navigation
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/review" />
          </IonButtons>
          <IonTitle>Review: Area Audience</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AreaAudiencePage />
      </IonContent>
    </IonPage>
  );
};

export default ReviewAreaAudiencePage;