import { Target } from "lucide-react";
import { ScreenLayout, ScreenContent } from "../common/ScreenLayout";
import { ScreenHeader } from "../common/ScreenHeader";
import { StatCard } from "../common/StatCard";
import { StatTile } from "../common/StatTile";
import { ComparisonChart } from "../common/ComparisonChart";
import { InsightBadge } from "../common/InsightBadge";
import { BottomNavigation } from "../common/BottomNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getNeighborhood } from "../location";

// 🔄 REPLACE: Mock data - should be replaced with API call to GET /api/analytics/neighborhood-reach  
// See /utils/dataMapping.ts for complete data structure and API documentation
const zoneData = {
  total_local_spend_30d: "$2,847,320",    // 🔄 REPLACE: SELECT SUM(amount) FROM transactions WHERE zone_id = {merchantZone} AND date >= NOW() - 30 days
  neighborhood: getNeighborhood(),        // 🔄 REPLACE: Use API call for dynamic location
  priority_status: "Active",              // 🔄 REPLACE: SELECT status FROM merchant_campaigns WHERE merchant_id = {merchantId}
  avg_txn_per_shopper_30d: "4.2",        // 🔄 REPLACE: Calculated average from shopper_analytics table
  avg_spend_per_shopper_30d: "$127",     // 🔄 REPLACE: Calculated average from shopper_analytics table
  txn_uplift_vs_nonpriority_30d: "23",   // 🔄 REPLACE: Calculated comparison metric from analytics tables
};

// Spending behavior comparison data - showing dramatic difference in spending
const spendingComparisonData = [
  {
    name: "Priority Audience",
    value: 127,
    label: "Priority Audience",
  },
  {
    name: "Average Shopper",
    value: 103,
    label: "Average Shopper",
  },
];

interface YourZoneScreenProps {
  onNavigate?: (tab: string) => void;
}

export function YourZoneScreen({
  onNavigate,
}: YourZoneScreenProps) {
  return (
    <ScreenLayout>
      <ScreenHeader 
        title="Neighborhood Reach"
        neighborhood={zoneData.neighborhood}
        icon={<Target className="w-4 h-4" />}
        onNavigate={onNavigate}
      />

      <ScreenContent>
        {/* Spend Here - Hero Card */}
        <StatCard
          title="Spend (30d)"
          value={zoneData.total_local_spend_30d}
          insight="Priority placement to these shoppers in your neighborhood"
          insightColor="blue"
          dataId="zone.spend.total_local_30d"
        />

        {/* Audience Spending Behavior Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6">
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardHeader className="pb-0 px-8 pt-8">
              <CardTitle className="text-foreground text-[18px]">
                Audience Spending Behavior (30d)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-8 pb-8">
              {/* Two Stat Tiles */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <StatTile
                  value={zoneData.avg_txn_per_shopper_30d}
                  label="Avg # transactions / shopper (30d)"
                  dataId="zone.shopper.avg_txn_per_shopper_30d"
                />
                <StatTile
                  value={zoneData.avg_spend_per_shopper_30d}
                  label="Avg spend / shopper (30d)"
                  dataId="zone.shopper.avg_spend_per_shopper_30d"
                />
              </div>
            </CardContent>
          </Card>

          {/* Spending Behavior Comparison Chart */}
          <Card
            className="bg-card shadow-sm border border-border rounded-[16px] gap-0"
            data-id="zone.shopper.txn_uplift_vs_nonpriority_30d"
          >
            <CardHeader className="pb-0 px-8 pt-8">
              <CardTitle className="text-foreground text-[18px]">
                Spending Behavior Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-8 pb-8">
              <ComparisonChart data={spendingComparisonData} />
              
              {/* Key Insight */}
              <div className="flex items-start">
                <InsightBadge
                  text={`Priority Audience spent ${zoneData.txn_uplift_vs_nonpriority_30d}% vs average (30d)`}
                  color="orange"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </ScreenContent>

      <BottomNavigation activeTab="zone" onNavigate={onNavigate} />
    </ScreenLayout>
  );
}