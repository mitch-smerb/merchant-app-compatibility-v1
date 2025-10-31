import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonIcon, IonAlert } from '@ionic/react';
import styled from 'styled-components';
import { location } from 'ionicons/icons';
import Header from '@components/Header';
import Footer from '@components/Footer';
import CompetitiveNewsfeed from './CompetitiveNewsfeedPage';
import { useGetMerchant } from '@features/merchant/hooks';
import { useGetCompetitiveUpdates } from '@features/competitive-updates/hooks';
import { useAuthTokenStore } from '@features/auth/hooks';
import { links } from '@shared/constants';
import LoadingScreen from '@components/LoadingScreen';

const StyledPage = styled(IonPage)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContent = styled(IonContent)`
  width: var(--default-width);

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const HomeContent = styled.div`
  padding: 0 10px;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;

const LocationInfo = styled.div`
  display: flex;
  padding: 17px 0;
  align-items: center;
  justify-content: center;
`;

const LocationIcon = styled(IonIcon)`
  color: var(--primary-color);
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;

const LocationText = styled.p`
  width: 270px;
  color: #777777;
  padding: 0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
`;

const HomePage: React.FC = () => {
  const { authToken } = useAuthTokenStore();

  const supportEmail = process.env.VITE_PLINK_SUPPORT_EMAIL;

  const [emailParkPlaceAlert, setEmailParkPlaceAlert] = useState(false);
  const [openProfitCoachAlert, setOpenProfitCoachAlert] = useState(false);
  const [openSupportAlert, setOpenSupportAlert] = useState(false);
  const [openPlinkAlert, setOpenPlinkAlert] = useState(false);

  const { data: merchant, isLoading: loadingMerchant } = useGetMerchant(authToken?.merchantId || 0);
  const { data: newsfeedData, isLoading: loadingUpdates } = useGetCompetitiveUpdates(authToken?.merchantId || 0);

  const salesEmailSubject = `I'm interested in hearing more about your services ${merchant?.name}`;

  const loading = loadingMerchant || loadingUpdates;

  return (
    <StyledPage>
      {loading && <LoadingScreen />}
      {!loading && merchant && newsfeedData && (
        <>
          <Header
            merchantName={merchant.name}
            isoName={merchant.isoName}
            pageTitle="Competitive News Feed"
            openAlertHandler={() => setEmailParkPlaceAlert(true)}
          />
          <StyledContent>
            {merchant && newsfeedData && (
              <>
                <HomeContent>
                  <LocationInfo>
                    <LocationIcon icon={location} />
                    <LocationText>
                      These updates are based on {merchant.category} sales
                      within {newsfeedData.radius} miles of {merchant.address}.
                    </LocationText>
                  </LocationInfo>
                  <CompetitiveNewsfeed
                    merchantId={authToken?.merchantId || 0}
                    newsfeedData={newsfeedData}
                    openProfitCoachAlertHandler={() =>
                      setOpenProfitCoachAlert(true)
                    }
                    openSupportAlertHandler={() => setOpenSupportAlert(true)}
                  />
                </HomeContent>
              </>
            )}
          </StyledContent>

          <Footer openPlinkAlertHandler={() => setOpenPlinkAlert(true)} />
        </>
      )}

      <IonAlert
        isOpen={emailParkPlaceAlert}
        header={`Process with ${merchant?.isoName}`}
        message={`This free Market News alert is provided by ${merchant?.isoName}, the leader in providing more value, better technology and better service to restaurants in your area.`}
        onDidDismiss={() => setEmailParkPlaceAlert(false)}
        buttons={[
          {
            text: `Email ${merchant?.isoName}`,
            handler: () => {
              window.location.href = `mailto:${merchant?.agentEmail}?subject=${salesEmailSubject}`;
              setEmailParkPlaceAlert(false);
            }
          }
        ]}
        data-testid="email-iso-alert"
      />

      <IonAlert
        isOpen={openProfitCoachAlert}
        header="Talk to a Free Profit Coach"
        message="Schedule a call and we will help you use your Competitive News Feed to grow your business."
        onDidDismiss={() => setOpenProfitCoachAlert(false)}
        buttons={[
          {
            text: 'Schedule a Call',
            handler: () => {
              window.open(links.support, '_blank');
              setOpenProfitCoachAlert(false);
            }
          }
        ]}
        data-testid="profit-coach-alert"
      />

      <IonAlert
        isOpen={openSupportAlert}
        header="Did We Miss Something?"
        message="Send a quick email so we can make your Competitive News Feed more valuable to you."
        onDidDismiss={() => setOpenSupportAlert(false)}
        buttons={[
          {
            text: 'Email Plink',
            handler: () => {
              window.location.href = `mailto:${supportEmail}?subject=Question about my Competitive News Feed`;
              setOpenSupportAlert(false);
            }
          }
        ]}
        data-testid="email-plink-alert"
      />

      <IonAlert
        isOpen={openPlinkAlert}
        header="Take Action with Plink"
        message="Activate Plink and automatically take action to grow your profit based on competitive and customer information."
        onDidDismiss={() => setOpenPlinkAlert(false)}
        buttons={[
          {
            text: 'Email Plink',
            handler: () => {
              window.location.href = `mailto:${supportEmail}?subject=Question about my Competitive News Feed`;
              setOpenPlinkAlert(false);
            }
          },
          {
            text: 'Read FAQ',
            handler: () => {
              window.open(links.newsfeedFaq, '_blank');
              setOpenPlinkAlert(false);
            }
          }
        ]}
        data-testid="email-iso-alert"
      />
    </StyledPage>
  );
};

export default HomePage;
