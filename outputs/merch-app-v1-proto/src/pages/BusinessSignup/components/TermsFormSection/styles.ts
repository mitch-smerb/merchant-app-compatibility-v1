import { IonCheckbox, IonItem, IonLabel } from '@ionic/react';
import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

export const TermsContainer = styled(IonItem).attrs({
  lines: 'none'
})`
  --padding-start: 0;
  --inner-padding-end: 0;
  --color: ${colors.neutral[35]};

  ::part(native) {
    font-size: 14px;
  }
`;

export const CheckBox = styled(IonCheckbox)`
  margin-right: 16px;
  margin-bottom: auto;
`;

export const CheckBoxLabel = styled(IonLabel)`
  --ion-font-family: 'Open Sans';
  white-space: normal !important;

  .required {
    color: ${colors.helpers.error[40]};
  }
`;

export const TermLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  color: currentColor;
`;
