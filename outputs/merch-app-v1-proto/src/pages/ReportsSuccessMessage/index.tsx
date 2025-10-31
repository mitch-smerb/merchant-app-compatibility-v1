import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { routes } from '@shared/constants';
import {
  StyledPage,
  Container,
  GreenCheckIcon,
  StyledButton,
  PageTitle,
  PageDescription
} from './styles';

const ReportsSuccessMessage: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{
    title: string;
    description?: string;
    goToSignInText?: string;
  }>();

  const handler = async () => {
    history.push(routes.reportsLogin);
  };

  return (
    <StyledPage>
      <Container>
        <GreenCheckIcon />
        <PageTitle>{location.state?.title}</PageTitle>
        {location.state?.description && (
          <PageDescription>{location.state?.description}</PageDescription>
        )}
        <StyledButton type="submit" expand="block" onClick={handler}>
          {location.state?.goToSignInText || 'Sign In'}
        </StyledButton>
      </Container>
    </StyledPage>
  );
};

export default ReportsSuccessMessage;
