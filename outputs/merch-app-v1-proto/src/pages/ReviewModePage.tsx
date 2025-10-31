import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/react';
import {
  peopleOutline,
  locationOutline,
  storefront,
  settingsOutline,
  receiptOutline,
  menuOutline
} from 'ionicons/icons';

const ReviewModePage: React.FC = () => {
  const screens = [
    {
      title: 'Area Audience Screen',
      description: 'View reach analytics and local market insights',
      path: '/review/area-audience',
      icon: peopleOutline,
      color: '#334bc1'
    },
    {
      title: 'Neighborhood Screen',
      description: 'Explore neighborhood-specific data and trends',
      path: '/review/neighborhood',
      icon: locationOutline,
      color: '#30CCD5'
    },
    {
      title: 'Local Shoppers Screen',
      description: 'Analyze local shopper behavior and patterns',
      path: '/review/local-shoppers',
      icon: storefront,
      color: '#22c55e'
    },
    {
      title: 'Incentive Controller',
      description: 'Manage and configure incentive campaigns',
      path: '/review/incentives',
      icon: settingsOutline,
      color: '#f59e0b'
    },
    {
      title: 'Billing Screen',
      description: 'Review billing information and payment settings',
      path: '/review/billing',
      icon: receiptOutline,
      color: '#9333ea'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AI Components Review Mode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1>🔍 Review AI-Generated Screens</h1>
            <p>Navigate through all integrated AI-generated components and screens</p>
          </div>

          <IonGrid>
            <IonRow>
              {screens.map((screen, index) => (
                <IonCol size="12" sizeMd="6" key={index}>
                  <IonCard style={{ height: '100%' }}>
                    <IonCardHeader>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <IonIcon
                          icon={screen.icon}
                          style={{
                            fontSize: '1.5rem',
                            marginRight: '0.5rem',
                            color: screen.color
                          }}
                        />
                        <IonCardTitle style={{ fontSize: '1.1rem' }}>
                          {screen.title}
                        </IonCardTitle>
                      </div>
                    </IonCardHeader>
                    <IonCardContent>
                      <p style={{ marginBottom: '1rem', color: '#666' }}>
                        {screen.description}
                      </p>
                      <IonButton
                        expand="block"
                        fill="clear"
                        routerLink={screen.path}
                        style={{ '--color': screen.color }}
                      >
                        View Screen →
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <IonIcon icon={menuOutline} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} />
            <h3>Hamburger Menu</h3>
            <p style={{ margin: '0.5rem 0' }}>
              The hamburger menu is integrated into each screen header and provides access to the Incentive Controller and Billing screens.
            </p>
            <small style={{ color: '#666' }}>
              Look for the menu icon (☰) in the top-right corner of each screen
            </small>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReviewModePage;