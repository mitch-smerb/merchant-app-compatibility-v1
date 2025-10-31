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
import NeighborhoodPage from './Neighborhood';

const ReviewNeighborhoodPage: React.FC = () => {
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
          <IonTitle>Review: Neighborhood</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <NeighborhoodPage />
      </IonContent>
    </IonPage>
  );
};

export default ReviewNeighborhoodPage;