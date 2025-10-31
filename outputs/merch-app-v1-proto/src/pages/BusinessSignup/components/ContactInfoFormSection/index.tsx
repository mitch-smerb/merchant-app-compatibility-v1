import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { maskMapping } from '@shared/form-helper';
import { FormSectionTitle, Row, StyledInput } from '@pages/BusinessSignup/styles';
import { FormValues } from '@pages/BusinessSignup/types';
import CounterInput from './components/CounterInput';

interface ContactInfoFormSectionProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  isLoading: boolean;
  // eslint-disable-next-line react/require-default-props
  disableEmailForUpgrade?: boolean;
}

const ContactInfoFormSection: React.FC<ContactInfoFormSectionProps> = ({
  control,
  isLoading,
  disableEmailForUpgrade = false
}) => (
  <>
    <FormSectionTitle>Personal Contact Information</FormSectionTitle>

    <Row>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledInput
            type="text"
            placeholder="First Name"
            value={value}
            autocapitalize="on"
            onIonInput={onChange}
            error={!!error}
          />
        )}
        control={control}
        name="contactInfo.firstName"
        key="contactInfo.firstName"
        rules={{ required: true }}
      />

      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledInput
            type="text"
            placeholder="Last Name"
            value={value}
            autocapitalize="on"
            onIonInput={onChange}
            error={!!error}
          />
        )}
        control={control}
        name="contactInfo.lastName"
        key="contactInfo.lastName"
        rules={{ required: true }}
      />
    </Row>

    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledInput
          type="text"
          placeholder="DBA Name"
          autocapitalize="on"
          value={value}
          onIonInput={onChange}
          error={!!error}
        />
      )}
      control={control}
      name="contactInfo.businessName"
      key="contactInfo.businessName"
      rules={{ required: true }}
    />

    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledInput
          type="email"
          placeholder="Email"
          value={value}
          onIonInput={onChange}
          error={!!error}
          disabled={disableEmailForUpgrade}
        />
      )}
      control={control}
      name="contactInfo.email"
      key="contactInfo.email"
      rules={{ required: true }}
    />

    <Controller
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledInput
          type="tel"
          placeholder="Phone"
          value={maskMapping.phone(value || '')}
          onIonInput={onChange}
          error={!!error}
        />
      )}
      control={control}
      name="contactInfo.phone"
      key="contactInfo.phone"
      rules={{ required: true }}
    />

    <Controller
      render={({ field: { onChange, name, value }, fieldState: { error } }) => (
        <CounterInput
          name={name}
          label="# of Locations"
          value={value}
          onChange={onChange}
          error={!!error}
          disabled={isLoading}
        />
      )}
      control={control}
      name="contactInfo.numberOfLocations"
      key="contactInfo.numberOfLocations"
      rules={{ required: true }}
    />
  </>
);

export default ContactInfoFormSection;
