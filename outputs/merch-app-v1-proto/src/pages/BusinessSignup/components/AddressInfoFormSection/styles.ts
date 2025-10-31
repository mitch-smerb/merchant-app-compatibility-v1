import { IonSelect } from '@ionic/react';
import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

interface StyledSelectProps {
  error?: boolean;
}

export const StyledSelect = styled(IonSelect)<StyledSelectProps>`
  background: ${colors.neutral[100]};
  margin-bottom: 15px;
  --padding-start: 0;
  flex: 1;

  border: 0;
  border-bottom: 1px solid ${colors.neutral[80]};
  border-radius: 0;

  font-family: 'Open Sans' !important;
  font-size: 16px !important;
  padding-inline-start: 0;

  color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};

  --placeholder-color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};
  --placeholder-opacity: 0.5;

  .select-placeholder,
  label {
    font-size: 16px !important;
    font-family: 'Open Sans' !important;
    width: 100%;
  }
`;
