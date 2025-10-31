import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Receipt, Info } from "lucide-react";
import { HamburgerMenu } from "../../components/HamburgerMenu";
import { BottomNavigation } from "../../components/BottomNavigation";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { handleNavigation } from '../../utils/navigationUtils';

// 🔄 REPLACE: Mock data - should be replaced with API call to GET /api/billing/current-month
// See /utils/dataMapping.ts for complete data structure and API documentation
const billingData = {
  lastMonthTotal: 117.50,
  billedDate: "Aug 31",
  programSales: 1350.00,
  tierBreakdown: [
    { tier: "1st $1,000 @ 10%", applied: 1000.00, rate: 10, fee: 100.00 },
    { tier: "Next $1,000 @ 5%", applied: 350.00, rate: 5, fee: 17.50 },
    { tier: "Next @ 2%", applied: 0.00, rate: 2, fee: 0.00 }
  ],
  reachDelivered: 67345,
  priorityPlacements: 1365,
  purchases: {
    count: 82,
    average: 83.45,
    visitMultiplier: 1.6
  },
  campaigns: {
    total: 6,
    breakdown: [
      { name: "High-value", count: 2 },
      { name: "Booster", count: 2 },
      { name: "Lapsed", count: 1 },
      { name: "Recognize", count: 1 }
    ]
  },
  neighborhoodSpend: 2347882
};

const BillingPage: React.FC = () => {
  const history = useHistory();

  const handleNavigate = (screen: string) => {
    handleNavigation(screen, history);
  };

  const formatCurrency = (amount: number) => {
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
      <div className="min-h-screen bg-background text-foreground w-full relative pb-20">
        {/* Header */}
        <div className="bg-white px-6 sm:px-8 lg:px-12 py-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-primary font-['Montserrat'] font-semibold text-[20px]">Plink.</span>
            <HamburgerMenu onNavigate={handleNavigate} />
          </div>

          <h2 className="text-[#1C1C1C] font-['Montserrat'] font-semibold text-[24px] sm:text-[28px] mb-2">Billing</h2>

          <div className="flex items-center text-[#737373] text-[14px] sm:text-[16px] font-['Open Sans']">
            <Receipt className="w-4 h-4 mr-1" />
            <span>Track your service fees and program performance</span>
          </div>
        </div>

        <div className="px-6 sm:px-8 lg:px-12 py-6 space-y-6">
          {/* Card 1: Last Month Total */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardHeader className="pb-0 px-8 pt-8">
              <CardTitle className="text-card-title">
                Last month total
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-8 pb-8">
              <div className="text-stat-large tabular-nums mb-3">
                {formatCurrency(billingData.lastMonthTotal)}
              </div>
              <div className="text-[#737373] font-['Open Sans'] text-[14px] sm:text-[16px]">
                Billed on {billingData.billedDate} • Auto-pay
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid for Larger Screens */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-6">
            {/* Card 2: Why This Amount */}
            <Card className="bg-card shadow-sm border-0 rounded-[16px] gap-0">
              <CardHeader className="pb-0 px-6 sm:px-8">
                <CardTitle className="text-foreground text-[18px]">
                  Why this amount
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2 px-6 sm:px-8 pb-6 sm:pb-8">
              {/* Simple Summary */}
              <div className="bg-[#334bc1]/5 rounded-[12px] p-4 mb-6">
                <div className="text-foreground font-['Open Sans'] text-[16px] mb-2">
                  Your program generated <span className="font-['Montserrat'] font-bold text-primary">{formatCurrency(billingData.programSales)}</span> in local shopper sales
                </div>
                <div className="text-muted-foreground font-['Open Sans'] text-[14px]">
                  Service fee: <span className="font-['Montserrat'] font-bold text-primary">{formatCurrency(billingData.lastMonthTotal)}</span>
                </div>
              </div>

              {/* Step by Step Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="text-foreground font-['Open Sans'] font-medium text-[14px] mb-3">
                  How we calculated your fee:
                </div>

                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 bg-[#f5f5f5] rounded-[12px]">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#334bc1] text-white rounded-full flex items-center justify-center text-[12px] font-['Montserrat'] font-bold mt-1">
                    1
                  </div>
                  <div className="flex-grow">
                    <div className="text-foreground font-['Open Sans'] text-[14px] mb-2">
                      <span className="font-medium">First $1,000</span> at 10%
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-['Open Sans'] text-[12px]">{formatCurrency(1000)} × 10%</span>
                      <span className="font-['Montserrat'] font-bold text-primary text-[14px]">{formatCurrency(100)}</span>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 bg-[#f5f5f5] rounded-[12px]">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#334bc1] text-white rounded-full flex items-center justify-center text-[12px] font-['Montserrat'] font-bold mt-1">
                    2
                  </div>
                  <div className="flex-grow">
                    <div className="text-foreground font-['Open Sans'] text-[14px] mb-2">
                      <span className="font-medium">Remaining $350</span> at 5%
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-['Open Sans'] text-[12px]">{formatCurrency(350)} × 5%</span>
                      <span className="font-['Montserrat'] font-bold text-primary text-[14px]">{formatCurrency(17.50)}</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 - No charge */}
                <div className="flex items-start gap-4 p-4 bg-[#f5f5f5] rounded-[12px] opacity-60">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#737373] text-white rounded-full flex items-center justify-center text-[12px] font-['Montserrat'] font-bold mt-1">
                    3
                  </div>
                  <div className="flex-grow">
                    <div className="text-muted-foreground font-['Open Sans'] text-[14px] mb-2">
                      <span className="font-medium">Next tier</span> at 2%
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-['Open Sans'] text-[12px]">$0 × 2%</span>
                      <span className="font-['Montserrat'] font-bold text-muted-foreground text-[14px]">{formatCurrency(0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="border-t border-[#f5f5f5] pt-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-['Open Sans'] font-medium text-[16px]">Total service fee</span>
                  <span className="text-primary font-['Montserrat'] font-bold text-[20px]">
                    {formatCurrency(billingData.lastMonthTotal)}
                  </span>
                </div>
              </div>

              {/* Simple Explanation */}
              <div className="bg-[#30CCD5]/10 rounded-[12px] p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#30CCD5] flex-shrink-0 mt-0.5" />
                  <p className="text-foreground font-['Open Sans'] text-[14px] leading-relaxed">
                    We use tiered pricing so you pay lower rates as your program grows. You'll never exceed your monthly cap.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

            {/* Card 3: What You Got */}
            <Card className="bg-card shadow-sm border-0 rounded-[16px] gap-0">
              <CardHeader className="pb-0 px-6 sm:px-8">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#334bc1] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <CardTitle className="text-foreground text-[18px]">
                    What you got
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-2 px-6 sm:px-8 pb-6 sm:pb-8">
              {/* Shown inside bank app */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1C1C1C] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-['Open Sans'] text-[16px] leading-relaxed">
                    Shown inside the bank app to <span className="font-['Montserrat'] font-bold text-primary">{formatNumber(billingData.reachDelivered)}</span> verified Local Shoppers.
                  </p>
                </div>
              </div>

              {/* Priority placements */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1C1C1C] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-['Open Sans'] text-[16px] leading-relaxed">
                    <span className="font-['Montserrat'] font-bold text-primary">{formatNumber(billingData.priorityPlacements)}</span> priority placements to recent neighborhood shoppers who spend <span className="font-['Montserrat'] font-bold text-primary">{formatCurrency(billingData.neighborhoodSpend)}</span> in the last 30d.
                  </p>
                </div>
              </div>

              {/* Purchases */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1C1C1C] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-['Open Sans'] text-[16px] leading-relaxed">
                    <span className="font-['Montserrat'] font-bold text-primary">{billingData.purchases.count}</span> purchases from Local Shoppers — avg ticket <span className="font-['Montserrat'] font-bold text-primary">{formatCurrency(billingData.purchases.average)}</span>, avg visits <span className="font-['Montserrat'] font-bold text-primary">{billingData.purchases.visitMultiplier}×</span>.
                  </p>
                </div>
              </div>

              {/* Campaigns created */}
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#1C1C1C] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-foreground font-['Open Sans'] text-[16px] leading-relaxed">
                    Campaigns created, personalized, and published for you (×<span className="font-['Montserrat'] font-bold text-primary">{billingData.campaigns.total}</span>) — expensive work you didn't have to pay an agency for.
                  </p>
                </div>
              </div>

              {/* Go to Campaign Center */}
              <div className="pt-4 border-t border-[#f5f5f5]">
                <button className="text-primary font-['Open Sans'] font-medium text-[16px] flex items-center gap-2 hover:text-[#293d9c] transition-colors">
                  Go to Campaign Center
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>

        <BottomNavigation onNavigate={handleNavigate} />
      </div>
    </ResponsiveContainer>
  );
};

export default BillingPage;
