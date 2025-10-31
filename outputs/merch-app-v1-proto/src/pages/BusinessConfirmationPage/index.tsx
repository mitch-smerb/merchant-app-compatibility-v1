import React from 'react';
import { useLocation } from 'react-router-dom';
import { emails } from '@shared/constants';
import { useIsInIframe } from '@utils/hooks';
import { Header } from '@pages/BusinessSignup/styles';
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledImage,
  StyledPage,
  StyledSection,
  EmailLink
} from './styles';

const BusinessConfirmationPage = () => {
  const location = useLocation<
    | {
        title: string;
        signupEmail: string;
        thanks: string;
      }
    | undefined
  >();
  const signupEmail = location.state?.signupEmail;
  const title = location.state?.title;
  const thanks = location.state?.thanks;

  const isInIframe = useIsInIframe();

  return (
    <StyledPage>
      <StyledContent>
        {!isInIframe && <Header />}

        <StyledContainer>
          <StyledSection>
            <StyledHeader>{title}</StyledHeader>
          </StyledSection>

          <StyledSection>
            A confirmation email has been sent to <br />
            <EmailLink>{signupEmail}</EmailLink>
          </StyledSection>

          <StyledSection>
            Not your email? Email us at{' '}
            <EmailLink href={`mailto:${emails.contactUs}`}>
              {emails.contactUs}
            </EmailLink>
          </StyledSection>

          <StyledSection>
            <StyledImage />
          </StyledSection>

          <StyledSection>
            Thanks for {thanks}! Check your email for confirmation and to begin
            setting up your account.
          </StyledSection>
        </StyledContainer>
      </StyledContent>
    </StyledPage>
  );
};

export default BusinessConfirmationPage;
