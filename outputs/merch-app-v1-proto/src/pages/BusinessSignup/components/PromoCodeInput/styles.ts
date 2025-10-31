import { IonButton, IonInput } from '@ionic/react';
import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

export const Container = styled.div`
  width: 250px;
  border: 1px solid ${colors.primary[30]};
  border-radius: 30px;

  display: flex;
  overflow: hidden;

  @media only screen and (max-width: 755px) {
    margin-top: 5px;
    border-radius: 10px;
  }
`;

export const Input = styled(IonInput)`
  flex: 1;

  --padding-start: 20px;
  --padding-end: 10px;
  --padding-top: 13px;
  --padding-bottom: 15px;
  background-color: ${colors.neutral[100]};

  font-family: 'Open Sans';
  font-size: 16px;
  color: ${colors.neutral[35]};

  ::placeholder {
    font-size: 16px;
    font-family: 'Open Sans';
  }
`;

export const ConfirmationButton = styled(IonButton)`
  margin: 0;
  height: auto;
  width: auto;
  flex: 1;

  ::part(native) {
    padding: 0;
  }
  background-color: ${colors.primary[30]};

  font-family: 'Montserrat Medium';
  font-size: 20px;
  color: ${colors.neutral[100]};
  text-transform: capitalize;

  display: flex;
  justify-content: center;
  align-items: center;
`;
