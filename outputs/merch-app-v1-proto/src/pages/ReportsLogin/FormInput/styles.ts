import { IonInput, IonLabel, IonText } from '@ionic/react';
import styled from 'styled-components';

export const FormInputContainer = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
`;

interface StyledInputProps {
  error: boolean;
}

export const StyledInput = styled(IonInput)<StyledInputProps>`
  --background: ${(props) => (props.error ? '#f8000014' : '#ffffff14')};
  --color: ${(props) => (props.error ? '#f80000' : 'var(--input-text-color)')};
  --padding-top: 13px;
  --padding-bottom: 13px;
  --padding-start: 11px;
  --padding-end: 11px;
  font-family: 'Rubik';
  margin: 10px 0;
  border-radius: 6px;
  border: 1.25px solid ${(props) => (props.error ? '#f80000' : '#9f9f9f')};
  font-size: 12px;

  &:not(:last-of-type) {
    margin-bottom: 40px;
  }

  /* @media (prefers-color-scheme: dark) {
    --placeholder-color: var(--ion-color-light);
  } */
`;

export const StyledLabel = styled(IonLabel)`
  font-family: 'Rubik Medium';
  font-size: 14px;
  margin-bottom: 5px;

  /* @media (prefers-color-scheme: dark) {
    color: var(--ion-color-light);
  } */
`;

export const ErrorMessage = styled(IonText)`
  font-family: 'Rubik';
  font-weight: 400;
  font-size: 12px;
  color: #f80000;
`;
