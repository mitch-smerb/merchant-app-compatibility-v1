import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TrendingUp, TrendingDown, Users, Check } from "lucide-react";
import { ScreenLayout, ScreenContent } from "../../components/ScreenLayout";
import { ScreenHeader } from "../../components/ScreenHeader";
import { StatTile } from "../../components/StatTile";
import { CampaignTile } from "../../components/CampaignTile";
import { TrendTile } from "../../components/TrendTile";
import { BottomNavigation } from "../../components/BottomNavigation";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { handleNavigation } from '../../utils/navigationUtils';

// 🔄 REPLACE: Mock data - should be replaced with API call to GET /api/analytics/current-shoppers
// See /utils/dataMapping.ts for complete data structure and API documentation
const shoppersData = {
  uniqueCount: 21,
  segmentSpend: 880,
  segmentTransactions: 30,
  avgCLV: 585,
  topCustomer: {
    name: "A. Martinez",
    spendLast30d: 348
  },
  campaigns: {
    recognizeRegulars: 127,
    boostAvgSpend: 43,
    boostFrequency: 28,
    recoverLapsed: 15
  },
  behavior: {
    avgFrequency: 2.5,
    avgSpendPerShopper: 67.10,
    avgTransactionsPerShopper: 2.3,
    avgTransactionSize: 26.74,
    deltas: {
      frequency: 8,
      spendPerShopper: 5,
      transactions: 3,
      transactionSize: -4
    }
  }
};

const LocalShoppersPage: React.FC = () => {
  const history = useHistory();

  // TODO: State variables for future filtering features - prefix with _ to indicate intentional unused state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_timeframe, _setTimeframe] = useState<"30d" | "90d" | "180d">("30d");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_benchmark, _setBenchmark] = useState<"Neighborhood" | "Category">("Neighborhood");

  const handleNavigate = (tab: string) => {
    handleNavigation(tab, history);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <ResponsiveContainer>
      <ScreenLayout>
        <ScreenHeader
          title="Current Shoppers"
          subtitle="Protect and grow spend from current customers"
          icon={<Users className="w-4 h-4" />}
          onNavigate={handleNavigate}
        />

        <ScreenContent>
          {/* Your Shopper Activity */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardHeader className="pb-0 px-8 pt-8">
              <CardTitle className="text-card-title">
                Activity (30d)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-8 pb-8">
              {/* Three data points */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatTile
                  value={formatNumber(shoppersData.uniqueCount)}
                  label="Shoppers"
                  variant="small"
                  dataId="shoppers.uniqueCount"
                />
                <StatTile
                  value={formatCurrency(shoppersData.segmentSpend)}
                  label="Spend"
                  variant="small"
                  dataId="shoppers.segmentSpend"
                />
                <StatTile
                  value={formatNumber(shoppersData.segmentTransactions)}
                  label="Transactions"
                  variant="small"
                  dataId="shoppers.segmentTransactions"
                />
              </div>

              <div className="flex items-start">
                <div className="inline-flex items-start bg-[#f0fdf4] dark:bg-[#15803d]/10 rounded-full px-4 py-3">
                  <Check className="w-4 h-4 text-[#15803d] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-[#166534] dark:text-[#15803d] font-['Open_Sans'] text-[13px] leading-tight">Current shoppers identified and protected</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Targeted Campaign Activity and Shopper Comparison - Side by Side on Large Screens */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6">
            <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
              <CardHeader className="pb-0 px-8 pt-8">
                <CardTitle className="text-card-title">
                  Campaigns
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-8 pb-8">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <CampaignTile
                    value={shoppersData.campaigns.recognizeRegulars}
                    label="Recognize Regulars"
                    color="success"
                  />
                  <CampaignTile
                    value={shoppersData.campaigns.boostAvgSpend}
                    label="Boost Avg Spend"
                    color="primary"
                  />
                  <CampaignTile
                    value={shoppersData.campaigns.boostFrequency}
                    label="Boost Frequency"
                    color="secondary"
                  />
                  <CampaignTile
                    value={shoppersData.campaigns.recoverLapsed}
                    label="Recover Lapsed"
                    color="warning"
                  />
                </div>

                <div className="flex items-start">
                  <div className="inline-flex items-start bg-[#334bc1]/10 rounded-full px-4 py-3">
                    <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-primary font-['Open_Sans'] text-[13px] leading-tight">Incentives require incremental spend</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shopper Comparison */}
            <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
              <CardHeader className="pb-0 px-8 pt-8">
                <CardTitle className="text-card-title">
                  Shopper Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 px-8 pb-8">
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <TrendTile
                    value={`${shoppersData.behavior.avgFrequency}×`}
                    label="Avg Frequency"
                    trend={{
                      icon: <TrendingUp className="w-3 h-3 text-[#22c55e] mr-1" />,
                      value: `+${shoppersData.behavior.deltas.frequency}%`,
                      isPositive: true
                    }}
                  />
                  <TrendTile
                    value={formatCurrencyDecimal(shoppersData.behavior.avgSpendPerShopper)}
                    label="Avg Spend / Shopper"
                    trend={{
                      icon: <TrendingUp className="w-3 h-3 text-[#22c55e] mr-1" />,
                      value: `+${shoppersData.behavior.deltas.spendPerShopper}%`,
                      isPositive: true
                    }}
                  />
                  <TrendTile
                    value={`${shoppersData.behavior.avgTransactionsPerShopper}×`}
                    label="Avg # Transactions"
                    trend={{
                      icon: <TrendingUp className="w-3 h-3 text-[#22c55e] mr-1" />,
                      value: `+${shoppersData.behavior.deltas.transactions}%`,
                      isPositive: true
                    }}
                  />
                  <TrendTile
                    value={formatCurrencyDecimal(shoppersData.behavior.avgTransactionSize)}
                    label="Avg Transaction Size"
                    trend={{
                      icon: <TrendingDown className="w-3 h-3 text-muted-foreground mr-1" />,
                      value: `${shoppersData.behavior.deltas.transactionSize}%`,
                      isPositive: false
                    }}
                  />
                </div>

                <div className="flex items-start">
                  <div className="inline-flex items-start bg-[#ecfeff] dark:bg-[#0891b2]/10 rounded-full px-4 py-3">
                    <Check className="w-4 h-4 text-[#0891b2] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-[#0f766e] dark:text-[#0891b2] font-['Open_Sans'] text-[13px] leading-tight">Your program shoppers outspend program average</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScreenContent>

        <BottomNavigation activeTab="shoppers" onNavigate={handleNavigate} />
      </ScreenLayout>
    </ResponsiveContainer>
  );
};

export default LocalShoppersPage;
