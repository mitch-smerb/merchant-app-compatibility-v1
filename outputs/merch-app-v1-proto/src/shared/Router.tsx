import React, { useEffect, useState } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route, Switch } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import StaticPriceSignupPage from '@/pages/BusinessSignup/StaticPriceSignup';
import DynamicPriceSignupPage from '@/pages/BusinessSignup/DynamicPriceSignup';
import RootPage from '@/pages/RootPage';
import PublicRoute from '@/components/PublicRoute';
import PrivateRoute from '@/components/PrivateRoute';
import HomePage from '@/pages/HomePage';
import ScanPage from '@/pages/ScanPage';
import LogoutPage from '@/pages/LogoutPage';
import BusinessConfirmationPage from '@/pages/BusinessConfirmationPage';
import { routes } from './constants';
import ReportsLoginPage from '@/pages/ReportsLogin';
import ReportsHomePage from '@/pages/ReportsHome';
import ReportsHelpPage from '@/pages/ReportsHelp';
import Menu from '@/components/Menu';
import ReportsCompanySummaryPage from '@/pages/ReportsCompanySummary';
import { useGetReportsSession } from '@/features/reports-auth/hooks';
import ReportsRequestPasswordReset from '@/pages/ReportsRequestPasswordReset';
import ReportsPasswordReset from '@/pages/ReportsPasswordReset';
import ReportsSuccessMessage from '@/pages/ReportsSuccessMessage';
import UpgradeBusinessPage from '@/pages/BusinessSignup/UpgradeMembership';
import PFPSignUpPage from '@/pages/BusinessSignup/PayForPerformanceSignUp';
import EmbedRegisterPage from '@pages/BusinessSignup/EmbedRegistration';
import AreaAudiencePage from '@/pages/AreaAudience';
import NeighborhoodPage from '@/pages/Neighborhood';
import LocalShoppersPage from '@/pages/LocalShoppers';
import IncentivePage from '@/pages/Incentive';
import BillingPage from '@/pages/Billing';
import ReviewModePage from '@/pages/ReviewModePage';
import ReviewAreaAudiencePage from '@/pages/ReviewAreaAudiencePage';
import ReviewNeighborhoodPage from '@/pages/ReviewNeighborhoodPage';
import ReviewLocalShoppersPage from '@/pages/ReviewLocalShoppersPage';
import ReviewIncentivesPage from '@/pages/ReviewIncentivesPage';
import ReviewBillingPage from '@/pages/ReviewBillingPage';
import WhatsPlinkPage from '@/pages/WhatsPlink';
import FAQPage from '@/pages/FAQ';
import { Spinner } from '@/components/ui/spinner';

const Router: React.FC = () => {
  const { refetch: getReportSession } = useGetReportsSession();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    (
      async () => {
        try {
          await getReportSession()
        } finally {
          setInitialCheckDone(true);
        }
      }
    )();
  }, [])

  return !initialCheckDone ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner show size="large" />
    </div>
  ) : (
    <IonReactRouter>
      <Menu />

      <Route path={routes.logout} component={LogoutPage} exact />

      <IonRouterOutlet id="main">
        <Switch>
          <PublicRoute
            path={routes.signup}
            component={StaticPriceSignupPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.signupConfirmation}
            component={BusinessConfirmationPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.register}
            component={DynamicPriceSignupPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.signupPfp}
            component={PFPSignUpPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.embedRegister}
            component={EmbedRegisterPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.review}
            component={ReviewModePage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reviewAreaAudience}
            component={ReviewAreaAudiencePage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reviewNeighborhood}
            component={ReviewNeighborhoodPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reviewLocalShoppers}
            component={ReviewLocalShoppersPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reviewIncentives}
            component={ReviewIncentivesPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reviewBilling}
            component={ReviewBillingPage}
            exact
            routerDirection="back"
          />

          {
          /*
          Comment this part of code: this page is no longer used anymore,
          if in the future we want it back just uncoment.

          <PublicRoute
            path={routes.login}
            component={LoginPage}
            exact
            routerDirection="back"
          /> */
          }

          <PublicRoute
            path={routes.reportsLogin}
            component={ReportsLoginPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reportsRequestPasswordReset}
            component={ReportsRequestPasswordReset}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reportsPasswordReset}
            component={ReportsPasswordReset}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.reportsSuccessMessage}
            component={ReportsSuccessMessage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.scan}
            component={ScanPage}
            routerDirection="back"
          />

          <PublicRoute
            path={routes.upgradeSuccess}
            component={BusinessConfirmationPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.upgradeBusiness}
            component={UpgradeBusinessPage}
            exact
            routerDirection="back"
          />

          <PrivateRoute
            path={routes.reportsHelp}
            component={ReportsHelpPage}
            exact
          />

          <PrivateRoute
            path={routes.reportsHome}
            component={ReportsHomePage}
            exact
          />

          <PrivateRoute
            path={routes.reportsCompanySummary}
            component={ReportsCompanySummaryPage}
            exact
          />

          <PublicRoute
            path={routes.areaAudience}
            component={AreaAudiencePage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.neighborhood}
            component={NeighborhoodPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.localShoppers}
            component={LocalShoppersPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.incentives}
            component={IncentivePage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.billing}
            component={BillingPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.whatsPlinkDemo}
            component={WhatsPlinkPage}
            exact
            routerDirection="back"
          />

          <PublicRoute
            path={routes.faq}
            component={FAQPage}
            exact
            routerDirection="back"
          />

          <PrivateRoute path={routes.home} component={HomePage} exact />

          <PublicRoute
            path={routes.scanSimple}
            component={ScanPage}
            exact
            routerDirection="back"
          />
        </Switch>

        <Route exact path="/" component={RootPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Router;
