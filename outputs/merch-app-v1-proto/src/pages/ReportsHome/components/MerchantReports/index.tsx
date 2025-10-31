import React, { useEffect, useState } from 'react';
import { embedDashboard } from '@preset-sdk/embedded';
import { IonAlert } from '@ionic/react';
import {
  ChangeMerchantButton,
  ContactSupportButton,
  DashboardsContainer,
  EmbeddedDashboard,
  FirstColumn,
  NoDataMessage,
  NoDataMessageContainer,
  PageTitle,
  PageTitleContainer,
  SecondColumn,
  StyledContent
} from './styles';
import { LoadingPage } from '@/components/ui/spinner';
import {
  useGetReportsDashboards,
  usePostReportsGuestToken
} from '@/features/reports/hooks';
import { ReportsGuestTokenRequest } from '@features/reports/reports-types';
import OnboardingModal from '@pages/ReportsHome/components/OnboardingModal';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';
import { links } from '@shared/constants';

const dashboardContainerIdPrefix = 'dashboard-container-';

interface MerchantReportsProps {
  merchantLoginId: number;
  onOpenBusinessSelectionModal: () => void;
}

const MerchantReports: React.FC<MerchantReportsProps> = ({
  merchantLoginId,
  onOpenBusinessSelectionModal
}) => {
  const { auth: reportsAuth } = useReportsAuthStore();

  const {
    data: reportsDashboards,
    isLoading: isGetReportsDashboardsLoading,
    error: getReportsDashboardsError,
  } = useGetReportsDashboards(merchantLoginId);
  const {
    mutateAsync: postReportsGuestToken,
    error: postReportsGuestTokenError,
    isPending: isPostReportsGuestTokenLoading
  } = usePostReportsGuestToken(merchantLoginId);

  const [didDashboardEmbeddingFail, setDidDashboardEmbeddingFail] =
    useState(false);
  const [showNoDataMessage, setNoDataMessage] = useState(false);

  useEffect(() => {
    if (!reportsDashboards || reportsDashboards.dashboardIds.length === 0) {
      setNoDataMessage(true);
      return;
    }

    const embedAllDashboards = async () => {
      try {
        await Promise.all(
          reportsDashboards.dashboardIds.map((id) => {
            const mountPoint = document.getElementById(`${dashboardContainerIdPrefix}${id}`);

            if (!mountPoint) {
              return Promise.resolve();
            }

            return embedDashboard({
              id,
              supersetDomain: reportsDashboards.supersetDomain,
              mountPoint,
              fetchGuestToken: async () => {
                const result = await postReportsGuestToken({ guestToken: id });
                return (result.data as ReportsGuestTokenRequest)?.guestToken || 'INVALID_TOKEN';
              },
              dashboardUiConfig: {
                hideTitle: true,
                hideTab: true,
                hideChartControls: true,
                urlParams: { standalone: 3 },
              },
            });
          })
        );
        setNoDataMessage(false);
      } catch  {
        setDidDashboardEmbeddingFail(true);
      }
    };
    embedAllDashboards();

  }, [reportsDashboards, postReportsGuestToken, merchantLoginId]);

  const [dId1, dId2, dId3, dId4] = reportsDashboards?.dashboardIds || [];

  return (
    <>
      <StyledContent>
        <PageTitleContainer>
          <PageTitle>Your Local Area Audience</PageTitle>
          {reportsAuth?.role === 'admin' && (
            <ChangeMerchantButton onClick={onOpenBusinessSelectionModal}>
              Change Merchant
            </ChangeMerchantButton>
          )}
        </PageTitleContainer>

        {reportsDashboards && reportsDashboards?.dashboardIds?.length > 0 && (
          <DashboardsContainer>
            <FirstColumn>
              <EmbeddedDashboard
                key={`${dashboardContainerIdPrefix}${dId1}`}
                id={`${dashboardContainerIdPrefix}${dId1}`}
                data-testid={`${dashboardContainerIdPrefix}${dId1}`}
                bigNumber
              />
              <EmbeddedDashboard
                key={`${dashboardContainerIdPrefix}${dId2}`}
                id={`${dashboardContainerIdPrefix}${dId2}`}
                data-testid={`${dashboardContainerIdPrefix}${dId2}`}
                bigNumber

              />
              <EmbeddedDashboard
                key={`${dashboardContainerIdPrefix}${dId3}`}
                id={`${dashboardContainerIdPrefix}${dId3}`}
                data-testid={`${dashboardContainerIdPrefix}${dId3}`}
                bigNumber
              />
            </FirstColumn>
            <SecondColumn>
              <EmbeddedDashboard
                key={`${dashboardContainerIdPrefix}${dId4}`}
                id={`${dashboardContainerIdPrefix}${dId4}`}
                data-testid={`${dashboardContainerIdPrefix}${dId4}`}
              />
            </SecondColumn>
          </DashboardsContainer>
        )}

        {(showNoDataMessage && isGetReportsDashboardsLoading) && (
          <NoDataMessageContainer>
            <NoDataMessage>
              Sorry! It looks like there isn&apos;t sufficient data available in
              your region. Plink is constantly expanding our network of banks
              and credit unions to offer access to a wider audience of
              consumers. Please reach out to our customer support team if you
              want to learn more.
            </NoDataMessage>
            <ContactSupportButton href={links.support}>
              Contact Support
            </ContactSupportButton>
          </NoDataMessageContainer>
        )}
      </StyledContent>

      <IonAlert
        isOpen={
          !!getReportsDashboardsError ||
          !!postReportsGuestTokenError ||
          didDashboardEmbeddingFail
        }
        header="Network Error"
        message="There was an error processing your request. Please try again later."
        buttons={['OK']}
      />

      <LoadingPage show={isGetReportsDashboardsLoading} />

      <LoadingPage show={isPostReportsGuestTokenLoading} />

      <OnboardingModal />
    </>
  );
};

export default MerchantReports;
