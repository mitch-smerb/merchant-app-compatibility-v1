import { IonButton, IonInput } from '@ionic/react';
import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

export const ParentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.neutral[80]};
  background: ${colors.neutral[100]};
  margin-bottom: 15px;
  padding-bottom: 8px;
`;

interface ComponentWithErrorProp {
  error?: boolean;
}

export const TextLabel = styled.p<ComponentWithErrorProp>`
  font-family: 'Open Sans';
  font-size: 16px;
  color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};
  opacity: 0.5;
  cursor: default;
`;

export const CounterContainer = styled.div`
  display: flex;
  width: 100px;
  overflow: hidden;
  border: 1px solid ${colors.neutral[80]};
  border-radius: 10px;
`;

export const CounterButton = styled(IonButton)`
  flex: 1.5;
  width: auto;
  height: auto;
  --border-color: unset;
  --border-radius: unset;
  --border-width: 0;
  margin: 0;

  --ion-color-primary: ${colors.neutral[100]};
  ::part(native) {
    padding: 0;
  }

  font-family: 'Open Sans';
  font-size: 25px;
  line-height: 20px;
  --ion-color-primary-contrast: ${colors.neutral[80]};

  display: flex;
  justify-content: center;
  align-items: center;

  // TODO: find a way to add disabled styles on IonButton. Not working this way
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'auto')};
`;

export const Input = styled(IonInput)<ComponentWithErrorProp>`
  flex: 2;
  text-align: center;
  font-family: 'Open Sans';
  font-size: 16px;
  color: ${({ error }) =>
    error ? colors.helpers.error[40] : colors.neutral[35]};
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;

  background-color: ${colors.neutral[100]};
  border: 1px solid ${colors.neutral[80]};
  border-top-width: 0;
  border-bottom-width: 0;

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
    margin: 0;
  }

  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`;
