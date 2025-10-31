import React from 'react';
import { useHistory } from 'react-router-dom';
import { MapPin } from "lucide-react";
import { ScreenLayout, ScreenContent } from "../../components/ScreenLayout";
import { ScreenHeader } from "../../components/ScreenHeader";
import { StatCard } from "../../components/StatCard";
import { BottomNavigation } from "../../components/BottomNavigation";
import { ProgressBar } from "../../components/ProgressBar";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { getNeighborhood } from "../../location";
import { handleNavigation } from '../../utils/navigationUtils';

// 🔄 REPLACE: Mock data - should be replaced with API call to GET /api/analytics/area-reach
// See /utils/dataMapping.ts for complete data structure and API documentation
const audienceData = {
  verified_shoppers_30d: "46,798",     // 🔄 REPLACE: SELECT COUNT(DISTINCT shopper_id) FROM area_analytics WHERE date >= NOW() - 30 days
  verified_views_30d: "287,425",       // 🔄 REPLACE: SELECT SUM(impressions) FROM area_analytics WHERE date >= NOW() - 30 days
  local_spend_percentage: 38,          // 🔄 REPLACE: Calculated field from local vs total spend analytics
  all_other_spend_percentage: 62       // 🔄 REPLACE: 100 - local_spend_percentage
};

const AreaAudiencePage: React.FC = () => {
  const history = useHistory();

  const handleNavigate = (tab: string) => {
    handleNavigation(tab, history);
  };

  return (
    <ResponsiveContainer>
      <ScreenLayout>
        <ScreenHeader
          title="Area Reach"
          neighborhood={getNeighborhood()}
          icon={<MapPin className="w-4 h-4" />}
          onNavigate={handleNavigate}
        />

        <ScreenContent>
          {/* Primary Stats - Two Cards (Equal Weight, Stacked) */}
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            <StatCard
              title="Reach (30d)"
              value={audienceData.verified_shoppers_30d}
              insight="Purchase-verified, bank-authenticated, local shoppers"
              insightColor="cyan"
              dataId="area.audience.unique_shoppers_30d"
            />

            <StatCard
              title="Impressions (30d)"
              value={audienceData.verified_views_30d}
              insight="30% higher-attention than ads in social feeds"
              insightColor="green"
              dataId="area.views.total_30d"
            />
          </div>

          {/* Local Spend Card */}
          <StatCard
            title="Local Market Share (30d)"
            value=""
            insight="Only Plink targets using local vs national spend"
            insightColor="purple"
            dataId="area.spend.local_share_30d"
          >
            <ProgressBar
              primaryPercentage={audienceData.local_spend_percentage}
              secondaryPercentage={audienceData.all_other_spend_percentage}
              primaryLabel="Local"
              secondaryLabel="Other"
            />
          </StatCard>
        </ScreenContent>

        <BottomNavigation activeTab="audience" onNavigate={handleNavigate} />
      </ScreenLayout>
    </ResponsiveContainer>
  );
};

export default AreaAudiencePage;
