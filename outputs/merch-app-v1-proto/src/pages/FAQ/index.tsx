import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronDown, ChevronRight, Mail } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../ui/collapsible";
import { ScreenLayout, ScreenContent } from "../../components/ScreenLayout";
import { ScreenHeader } from "../../components/ScreenHeader";
import { BottomNavigation } from "../../components/BottomNavigation";
import { ResponsiveContainer } from "../../components/ResponsiveContainer";
import { toast } from "sonner";
import { handleNavigation } from '../../utils/navigationUtils';

interface FAQItem {
  title: string;
  content: string | React.ReactNode;
}

const FAQPage: React.FC = () => {
  const history = useHistory();
  const [expandedFAQs, setExpandedFAQs] = useState<Record<string, boolean>>({});

  const contactUsEmail = "support@plink.ai";
  const scheduleCallUrl = "https://calendly.com/plink-support";

  const handleNavigate = (screen: string) => {
    handleNavigation(screen, history);
  };

  const toggleFAQ = (title: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleViewMyDemoClick = () => {
    toast.info("Your bank demo isn't quite ready yet. Try again in 24 hours or contact us.", {
      duration: 4000,
    });
  };

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleScheduleCall = () => {
    window.open(scheduleCallUrl, '_blank', 'noopener,noreferrer');
  };

  const faqItems: FAQItem[] = [
    {
      title: 'How do you determine my audience size?',
      content: 'We get transaction information from our network of banks and credit unions to identify active spending in your area. We work with you and your budget to target the consumers most likely to purchase with you.'
    },
    {
      title: 'Where do you get the sales and transaction information?',
      content: "We receive actual bank data from the financial institutions in our network. All personally identifying information is removed to protect the individual's data."
    },
    {
      title: 'What is the difference between overall spend and local spend?',
      content: 'Overall is the total spending in your area. Local is spending at locally owned businesses.'
    },
    {
      title: 'What is considered "local"?',
      content: 'Local can be a neighborhood, a region, or an online audience of people spending money that you could reasonably access.'
    },
    {
      title: 'How often is the information updated?',
      content: 'The information is updated continuously based on the past 30 days.'
    },
    {
      title: 'Who do I contact for help or other questions?',
      content: (
        <span>
          If you have questions, suggestions, or other feedback, we'd love to hear from you. You can reach out to our support team at{' '}
          <button
            onClick={() => handleEmailClick(contactUsEmail)}
            className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
          >
            {contactUsEmail}
          </button>
          {' '}or{' '}
          <button
            onClick={handleScheduleCall}
            className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
          >
            schedule a call with a coach here
          </button>
          .
        </span>
      )
    },
    {
      title: 'Can I see what my audience sees in their bank app?',
      content: (
        <span>
          Yes. You can see what is shown in the digital banking screen{' '}
          <button
            onClick={handleViewMyDemoClick}
            className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
          >
            here
          </button>
          . Or, request a personalized link by emailing us at{' '}
          <button
            onClick={() => handleEmailClick(contactUsEmail)}
            className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
          >
            {contactUsEmail}
          </button>
          .
        </span>
      )
    }
  ];

  return (
    <ResponsiveContainer>
      <ScreenLayout>
        <ScreenHeader
          title="Help & FAQ"
          subtitle="Contact support and find answers to common questions"
          onNavigate={handleNavigate}
        />

        <ScreenContent>
          {/* Contact Support Section */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0 mb-6">
            <CardContent className="px-8 py-8">
              <div className="mb-6">
                <h3 className="text-foreground font-['Montserrat'] font-semibold text-[20px] mb-4">Contact Support</h3>
                <p className="text-foreground font-['Open_Sans'] text-[16px] leading-relaxed mb-6">
                  You can reach out to our support team at{' '}
                  <button
                    onClick={() => handleEmailClick(contactUsEmail)}
                    className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
                  >
                    {contactUsEmail}
                  </button>
                  , or{' '}
                  <button
                    onClick={handleScheduleCall}
                    className="text-primary hover:text-primary/80 underline bg-transparent border-0 p-0 font-inherit cursor-pointer"
                  >
                    schedule a call with a coach here
                  </button>
                  .
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEmailClick(contactUsEmail)}
                    className="flex items-center gap-2 bg-primary text-white font-['Open_Sans'] font-semibold text-[14px] px-6 py-3 rounded-[8px] hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Support
                  </button>
                  <button
                    onClick={handleScheduleCall}
                    className="flex items-center gap-2 bg-muted text-foreground font-['Open_Sans'] font-semibold text-[14px] px-6 py-3 rounded-[8px] hover:bg-muted/80 transition-colors border border-border"
                  >
                    Schedule Call
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-card shadow-sm border border-border rounded-[16px] gap-0">
            <CardContent className="px-8 py-8">
              <h3 className="text-foreground font-['Montserrat'] font-semibold text-[20px] mb-6">Frequently Asked Questions</h3>

              <div className="space-y-4">
                {faqItems.map((item, index) => {
                  const isOpen = expandedFAQs[item.title];

                  return (
                    <Collapsible
                      key={index}
                      open={isOpen}
                      onOpenChange={() => toggleFAQ(item.title)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className={`flex items-start justify-between p-4 rounded-[12px] transition-all duration-200 ${
                          isOpen
                            ? 'bg-primary/5 shadow-sm'
                            : 'bg-muted hover:bg-muted/80'
                        }`}>
                          <div className="text-left flex-1 pr-4">
                            <h4 className="text-foreground font-['Open_Sans'] font-semibold text-[16px] leading-tight">
                              {item.title}
                            </h4>
                          </div>
                          {isOpen ? (
                            <ChevronDown
                              className="w-5 h-5 transition-transform duration-200 text-primary flex-shrink-0 mt-0.5"
                            />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 mt-0.5" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                        <div className="mt-2 p-4 bg-card border border-border rounded-[8px] shadow-sm">
                          <div className="text-foreground font-['Open_Sans'] text-[15px] leading-relaxed">
                            {item.content}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </ScreenContent>

        <BottomNavigation onNavigate={handleNavigate} />
      </ScreenLayout>
    </ResponsiveContainer>
  );
};

export default FAQPage;
