import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent } from "../../ui/card";
import { ScreenLayout, ScreenContent } from "../../components/ScreenLayout";
import { ScreenHeader } from "../../components/ScreenHeader";
import { BottomNavigation } from "../../components/BottomNavigation";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { toast } from "sonner";
import whatsPlinkImage from "../../assets/whatisplink-page.png";
import { handleNavigation } from '../../utils/navigationUtils';

const WhatsPlinkPage: React.FC = () => {
  const history = useHistory();

  const handleNavigate = (screen: string) => {
    handleNavigation(screen, history);
  };

  const handleViewMyDemoClick = () => {
    toast.info("Your bank demo isn't quite ready yet. Try again in 24 hours or contact us.", {
      duration: 4000,
    });
  };

  return (
    <ResponsiveContainer>
      <ScreenLayout>
        <ScreenHeader
          title="What is Plink?"
          onNavigate={handleNavigate}
        />

        <ScreenContent>
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardContent className="px-8 py-8">
              <div className="space-y-6">
                <p className="text-foreground font-['Open_Sans'] text-[16px] leading-relaxed">
                  Plink provides your business exposure to valuable local customers in
                  the digital channels of nearby banks and credit unions.
                </p>

                <div className="flex justify-center">
                  <img
                    src={whatsPlinkImage}
                    alt="What is Plink demonstration"
                    className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] rounded-[12px] shadow-sm"
                  />
                </div>

                <ul className="space-y-4 list-disc list-inside text-foreground font-['Open_Sans'] text-[16px] leading-relaxed">
                  <li>
                    Reach an audience of bank and credit union members that actually
                    spend in your neighborhood.
                  </li>
                  <li>
                    Be seen in digital channels previously reserved for national chains.
                  </li>
                  <li>Gain recognition as a top local business.</li>
                </ul>

                <div className="flex justify-start pt-4">
                  <button
                    onClick={handleViewMyDemoClick}
                    className="bg-primary text-white font-['Open_Sans'] font-semibold text-[16px] px-8 py-3 rounded-[8px] hover:bg-primary/90 transition-colors"
                  >
                    View My Demo
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScreenContent>

        <BottomNavigation onNavigate={handleNavigate} />
      </ScreenLayout>
    </ResponsiveContainer>
  );
};

export default WhatsPlinkPage;
