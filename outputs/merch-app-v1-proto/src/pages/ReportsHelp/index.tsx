import React, { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronDown, chevronUp } from 'ionicons/icons';
import {
  ExternalLink,
  FAQItem,
  FAQItemContent,
  FAQItemTitle,
  FAQListContainer,
  PageTitle,
  StyledContent,
  Text
} from './styles';
import ReportsPageWrapper from '@components/ReportsPageWrapper';
import { faqItems } from './utils';
import { emails, links } from '@shared/constants';

const ReportsHelp: React.FC = () => {
  const [expandedFAQItemTitle, setExpandedFAQItemTitle] = useState<
    string | null
  >(null);

  const toggleSection = (title: string) => {
    setExpandedFAQItemTitle(expandedFAQItemTitle === title ? null : title);
  };

  return (
    <ReportsPageWrapper>
      <StyledContent>
        <PageTitle>Contact Support</PageTitle>

        <Text>
          You can reach out to our support team at{' '}
          <ExternalLink href={`mailto:${emails.contactUs}`}>
            {emails.contactUs}
          </ExternalLink>
          , or{' '}
          <ExternalLink href={links.support}>
            schedule a call with a coach here
          </ExternalLink>
          .
        </Text>

        <PageTitle>Frequently Asked Questions</PageTitle>

        <FAQListContainer>
          {faqItems.map((section) => (
            <div key={`key-${section.title}`} data-testid="faq-item">
              <FAQItem
                button
                detail={false}
                onClick={() => toggleSection(section.title)}
              >
                <FAQItemTitle>{section.title}</FAQItemTitle>
                <IonIcon
                  icon={
                    expandedFAQItemTitle === section.title
                      ? chevronUp
                      : chevronDown
                  }
                  slot="end"
                  className="icon"
                />
              </FAQItem>
              {expandedFAQItemTitle === section.title && (
                <FAQItemContent>{section.content}</FAQItemContent>
              )}
            </div>
          ))}
        </FAQListContainer>

        {/* <NeedHelpText>
          Need more information?{' '}
          <ExternalLink href={links.support}>Click here</ExternalLink>
        </NeedHelpText> */}
      </StyledContent>
    </ReportsPageWrapper>
  );
};

export default ReportsHelp;
