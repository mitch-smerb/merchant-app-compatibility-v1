import React from 'react';
import { IonButtons, IonHeader, IonMenuButton, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { useIsDesktopPlatform } from '@utils/hooks';
import { routes } from '@shared/constants';
import { BackButton, LeftSideColumn, PlinkLogo, StyledPage } from './styles';
import MenuContent from '@components/Menu/components/MenuContent';

interface ReportsPageWrapperProps {
  children: React.ReactNode;
}

const ReportsPageWrapper: React.FC<ReportsPageWrapperProps> = ({
  children
}) => {
  const isDesktopPlatform = useIsDesktopPlatform();
  const location = useLocation();

  return (
    <StyledPage isDesktop={isDesktopPlatform}>
      {isDesktopPlatform ? (
        <LeftSideColumn>
          <MenuContent />
        </LeftSideColumn>
      ) : (
        <IonHeader>
          <IonToolbar style={{ padding: 10 }}>
            {location.pathname !== routes.reportsHome && (
              <IonButtons slot="start">
                <BackButton defaultHref={routes.reportsHome} text="" />
              </IonButtons>
            )}

            <PlinkLogo />

            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      )}

      {children}
    </StyledPage>
  );
};

export default ReportsPageWrapper;
