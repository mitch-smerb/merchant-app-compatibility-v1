import {
  IonButton,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonLabel
} from '@ionic/react';
import styled from 'styled-components';
import { colors, StyledInput } from '@pages/BusinessSignup/styles';

export const StyleBillingInput = styled(StyledInput)`
  margin-bottom: 30px;
`;

export const ECheckTypeSelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

interface ECheckTypeButtonProps {
  selected?: boolean;
}

export const ECheckTypeButton = styled(IonButton)<ECheckTypeButtonProps>`
  margin: 0;
  height: auto;
  width: auto;
  min-width: 100px;

  --background: ${colors.neutral[100]};
  --padding-start: 65px;
  --padding-end: 65px;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --border-color: ${({ selected }) =>
    selected ? colors.primary[30] : colors.neutral[85]};
  --border-width: 1px;
  --border-style: solid;
  --border-radius: 0px;
  --box-shadow: unset;

  font-family: 'Open Sans';
  font-size: 16px;
  color: ${colors.neutral[35]};
  text-transform: capitalize;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RadioGroup = styled(IonRadioGroup)`
  margin-bottom: 30px;
`;

export const RadioItem = styled(IonItem).attrs({
  lines: 'none'
})`
  --padding-start: 0;
  --inner-padding-end: 0;
  --color: ${colors.neutral[40]};
  --min-height: 30px;

  ::part(native) {
    font-size: 16px;
  }
`;

export const RadioInput = styled(IonRadio)`
  margin: 0;
  margin-right: 15px;
  --color: ${colors.neutral[70]};
  --color-checked: ${colors.neutral[35]};
  --ion-font-family: 'Montserrat Bold';
  font-family: 'Montserrat Bold';
`;
