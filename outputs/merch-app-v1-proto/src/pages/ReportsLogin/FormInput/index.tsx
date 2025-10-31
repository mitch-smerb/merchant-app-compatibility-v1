import React from 'react';
import { IonInput } from '@ionic/react';
import {
  ErrorMessage,
  FormInputContainer,
  StyledInput,
  StyledLabel
} from './styles';

interface FormInputProps extends React.ComponentProps<typeof IonInput> {
  label: string;
  error: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  onIonChange,
  error
}) => (
  <FormInputContainer>
    <StyledLabel>{label}</StyledLabel>
    <StyledInput
      error={!!error}
      type={type}
      onIonInput={onIonChange}
      placeholder={placeholder}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FormInputContainer>
);

export default FormInput;
