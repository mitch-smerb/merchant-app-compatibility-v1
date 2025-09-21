import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDown, ChevronRight, Target, Heart, Zap, RotateCcw, UserPlus, Settings } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { useState } from "react";
import { ScreenLayout, ScreenContent } from "../common/ScreenLayout";
import { ScreenHeader } from "../common/ScreenHeader";
import { StatTile } from "../common/StatTile";
import { BottomNavigation } from "../common/BottomNavigation";
// TODO: HamburgerMenu import - remove if not needed for this screen
// import { HamburgerMenu } from "./HamburgerMenu";

// Mock data from the prompt
const incentiveData = {
  monthToDateSpend: 47.20,
  clicks: 72,
  redemptions: 6,
  averageRate: 7.2
};

const campaignSafeguards = [
  {
    name: "New Shopper",
    icon: UserPlus,
    color: "#334bc1", // Primary blue for new acquisition
    bgColor: "#334bc1/10",
    timeLimit: "30 days",
    minPurchase: "$25",
    maxDiscount: "25%",
    oneTimeUse: "Yes"
  },
  {
    name: "Recognize Regulars", 
    icon: Heart,
    color: "#22c55e", // Success green for loyalty
    bgColor: "#22c55e/10",
    timeLimit: "7 days",
    minPurchase: "$15",
    maxDiscount: "2%",
    oneTimeUse: "No"
  },
  {
    name: "Increase Avg Transaction",
    icon: Target,
    color: "#30CCD5", // Secondary cyan for upselling
    bgColor: "#30CCD5/10",
    timeLimit: "14 days", 
    minPurchase: "$75",
    maxDiscount: "10%",
    oneTimeUse: "Yes"
  },
  {
    name: "Increase Frequency",
    icon: Zap,
    color: "#f59e0b", // Warning amber for frequency
    bgColor: "#f59e0b/10",
    timeLimit: "21 days",
    minPurchase: "$30",
    maxDiscount: "10%", 
    oneTimeUse: "Yes"
  },
  {
    name: "Recover Lapsed",
    icon: RotateCcw,
    color: "#ef4444", // Destructive red for recovery
    bgColor: "#ef4444/10",
    timeLimit: "60 days",
    minPurchase: "$20",
    maxDiscount: "20%",
    oneTimeUse: "Yes"
  }
];

const redemptionDetails = [
  {
    date: "Aug 03",
    campaign: "New Shopper Welcome",
    segment: "New",
    transactionAmount: 86.00,
    incentiveAmount: 21.50
  },
  {
    date: "Aug 05", 
    campaign: "Recover Lapsed 30d",
    segment: "Lapsed",
    transactionAmount: 54.00,
    incentiveAmount: 10.80
  },
  {
    date: "Aug 08",
    campaign: "Increase Avg Ticket $75+",
    segment: "Occasional", 
    transactionAmount: 82.00,
    incentiveAmount: 8.20
  },
  {
    date: "Aug 11",
    campaign: "Recognize Regulars",
    segment: "Regular",
    transactionAmount: 42.00,
    incentiveAmount: 0.80
  },
  {
    date: "Aug 15",
    campaign: "Increase Frequency 21d", 
    segment: "Occasional",
    transactionAmount: 69.00,
    incentiveAmount: 6.90
  }
];

interface IncentiveCostControlScreenProps {
  onNavigate?: (tab: string) => void;
}

export function IncentiveCostControlScreen({ onNavigate }: IncentiveCostControlScreenProps) {
  const [redemptionDetailsOpen, setRedemptionDetailsOpen] = useState(false);
  const [openSafeguards, setOpenSafeguards] = useState<Record<string, boolean>>({});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "New": return "bg-[#334bc1]/10 text-[#334bc1]";
      case "Lapsed": return "bg-[#f59e0b]/10 text-[#f59e0b]";
      case "Occasional": return "bg-[#30CCD5]/10 text-[#30CCD5]";
      case "Regular": return "bg-[#22c55e]/10 text-[#22c55e]";
      default: return "bg-[#f5f5f5] text-[#737373]";
    }
  };

  const toggleSafeguard = (safeguardName: string) => {
    setOpenSafeguards(prev => ({
      ...prev,
      [safeguardName]: !prev[safeguardName]
    }));
  };

  return (
    <ScreenLayout>
      <ScreenHeader 
        title="Incentives"
        subtitle="Save money and grow profit with personalization"
        icon={<Settings className="w-4 h-4" />}
        onNavigate={onNavigate}
      />

      <ScreenContent>
        {/* Incentive Spend Card - Enhanced visual hierarchy */}
        <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
          <CardHeader className="pb-0 px-8 pt-8">
            <h4 className="text-foreground text-[18px]">Incentive Spend (MTD)</h4>
          </CardHeader>
          <CardContent className="pt-4 px-8 pb-8">
            {/* Enhanced headline with better visual emphasis */}
            <div className="mb-6">
              <h1 className="text-foreground tabular-nums">{formatCurrency(incentiveData.monthToDateSpend)}</h1>
            </div>

            {/* Enhanced sub-stats with better spacing and visual hierarchy */}
            <div className="grid grid-cols-3 gap-4">
              <StatTile
                value={incentiveData.clicks.toString()}
                label="Clicks"
                variant="small"
              />
              <StatTile
                value={incentiveData.redemptions.toString()}
                label="Redemptions"
                variant="small"
              />
              <StatTile
                value={`${incentiveData.averageRate}%`}
                label="Ave Rate"
                variant="small"
              />
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid for Larger Screens */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6">
          {/* Redemption Details - Properly centered and enhanced */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <Collapsible open={redemptionDetailsOpen} onOpenChange={setRedemptionDetailsOpen}>
              <CollapsibleTrigger className="w-full">
                <div className="px-8 py-6 flex items-center justify-between w-full text-left">
                  <CardTitle className="text-foreground text-[18px]">
                    Redemption Details
                  </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary font-['Open_Sans'] text-[11px] px-2 py-1">
                    {redemptionDetails.length} items
                  </Badge>
                  {redemptionDetailsOpen ? (
                    <ChevronDown className="w-5 h-5 text-primary transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                  )}
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <CardContent className="pt-4 px-8 pb-8">
                <div className="divide-y divide-border">
                  {redemptionDetails.map((redemption, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0 hover:bg-muted/30 -mx-2 px-2 rounded-[8px] transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground font-['Open_Sans'] font-medium text-[14px] mb-2 leading-tight">
                            {redemption.campaign}
                          </div>
                          <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-['Open_Sans'] flex-wrap">
                            <span className="font-medium">{redemption.date}</span>
                            <span className="text-border">•</span>
                            <Badge className={`${getSegmentColor(redemption.segment)} font-['Open_Sans'] text-[11px] px-2 py-0.5 font-medium border-0`}>
                              {redemption.segment}
                            </Badge>
                            <span className="text-border">•</span>
                            <span>Txn {formatCurrency(redemption.transactionAmount)}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4 flex-shrink-0">
                          <div className="text-primary font-['Montserrat'] font-bold text-[16px] tabular-nums">
                            {formatCurrency(redemption.incentiveAmount)}
                          </div>
                          <div className="text-muted-foreground font-['Open_Sans'] text-[11px]">
                            Incentive
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

          {/* Campaign Safeguards - Enhanced with vibrant colors and better UX */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardHeader className="pb-0 px-8 pt-8">
              <CardTitle className="text-foreground text-[18px]">
                Campaign Safeguards
              </CardTitle>
            </CardHeader>
          <CardContent className="pt-4 px-8 pb-8">
            <div className="space-y-3">
              {campaignSafeguards.map((safeguard, index) => {
                const IconComponent = safeguard.icon;
                const isOpen = openSafeguards[safeguard.name];
                
                return (
                  <Collapsible 
                    key={index} 
                    open={isOpen} 
                    onOpenChange={() => toggleSafeguard(safeguard.name)}
                  >
                    <CollapsibleTrigger className="w-full">
                      <div className={`flex items-center justify-between p-4 rounded-[12px] transition-all duration-200 ${
                        isOpen 
                          ? `${safeguard.bgColor} shadow-sm` 
                          : 'bg-muted hover:bg-muted/80'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-[8px] ${safeguard.bgColor}`}>
                            <IconComponent 
                              className="w-4 h-4" 
                              style={{ color: safeguard.color }}
                            />
                          </div>
                          <span className="text-foreground font-['Open_Sans'] font-semibold text-[14px]">
                            {safeguard.name}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronDown 
                            className="w-5 h-5 transition-transform duration-200" 
                            style={{ color: safeguard.color }}
                          />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                      <div className="mt-2 p-4 bg-card border border-border rounded-[8px] shadow-sm">
                        <div className="grid grid-cols-2 gap-4 text-[12px]">
                          <div className="space-y-1">
                            <span className="text-muted-foreground font-['Open_Sans'] text-[11px] uppercase tracking-wide">Time Limit</span>
                            <div className="text-foreground font-['Open_Sans'] font-medium text-[13px]">{safeguard.timeLimit}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-muted-foreground font-['Open_Sans'] text-[11px] uppercase tracking-wide">Min Purchase</span>
                            <div className="text-foreground font-['Open_Sans'] font-medium text-[13px]">{safeguard.minPurchase}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-muted-foreground font-['Open_Sans'] text-[11px] uppercase tracking-wide">Max Discount</span>
                            <div className="text-foreground font-['Open_Sans'] font-medium text-[13px]">{safeguard.maxDiscount}</div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-muted-foreground font-['Open_Sans'] text-[11px] uppercase tracking-wide">One-time Use</span>
                            <div className="text-foreground font-['Open_Sans'] font-medium text-[13px]">{safeguard.oneTimeUse}</div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </CardContent>
        </Card>
        </div>
      </ScreenContent>

      <BottomNavigation activeTab="audience" onNavigate={onNavigate} />
    </ScreenLayout>
  );
}