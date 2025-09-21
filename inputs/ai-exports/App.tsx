import { useState } from "react";
import { AreaAudienceScreen } from "./components/AreaAudienceScreen";
import { YourZoneScreen } from "./components/YourZoneScreen";
import { YourShoppersScreen } from "./components/YourShoppersScreen";
import { IncentiveCostControlScreen } from "./components/IncentiveCostControlScreen";
import { BillingScreen } from "./components/BillingScreen";
import { Toaster } from "./ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";

type ActiveTab = "Area Reach" | "Neighborhood Reach" | "Current Shoppers" | "Incentives Controller" | "Billing";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Area Reach");

  const handleNavigate = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "Area Reach":
        return <AreaAudienceScreen onNavigate={handleNavigate} />;
      case "Neighborhood Reach":
        return <YourZoneScreen onNavigate={handleNavigate} />;
      case "Current Shoppers":
        return <YourShoppersScreen onNavigate={handleNavigate} />;
      case "Incentives Controller":
        return <IncentiveCostControlScreen onNavigate={handleNavigate} />;
      case "Billing":
        return <BillingScreen onNavigate={handleNavigate} />;
      default:
        return <AreaAudienceScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="plink-ui-theme">
      <div className="min-h-screen bg-background flex justify-center">
        <div className="w-full max-w-[430px] sm:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
          {renderActiveScreen()}
        </div>
        <Toaster 
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "14px"
            }
          }}
        />
      </div>
    </ThemeProvider>
  );
}