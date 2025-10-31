import { IonSelectOption } from '@ionic/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { maskMapping } from '@shared/form-helper';
import { DynamicRow, FormSectionTitle, StyledInput } from '@pages/BusinessSignup/styles';
import { FormValues } from '@pages/BusinessSignup/types';
import MultipleSelector, { Option } from '@/components/ui/multiselector';
import { StyledSelect } from './styles';
import { stateOptions } from './utils';

interface ContactInfoFormSectionProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  className?: string;
}

const AddressInfoFormSection: React.FC<ContactInfoFormSectionProps> = ({
  control,
  ...props
}) => {
  const STATE_OPTIONS: Option[] = stateOptions.map(({ value }) => ({ label: value, value }))

  return (
    <div {...props}>
      <FormSectionTitle>Primary Business Address</FormSectionTitle>

      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledInput
            type="text"
            placeholder="Street Address"
            autocapitalize="on"
            value={value}
            onIonInput={onChange}
            error={!!error}
          />
        )}
        control={control}
        name="addressInfo.streetAddress"
        key="addressInfo.streetAddress"
        rules={{ required: true }}
      />

      <div className="flex flex-col md:flex-row">
        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              type="text"
              placeholder="City"
              autocapitalize="on"
              value={value}
              onIonInput={onChange}
              error={!!error}
              className="lg:!w-[140%] flex-auto lg:mr-3"
            />
          )}
          control={control}
          name="addressInfo.city"
          key="addressInfo.city"
          rules={{ required: true }}
        />
        <div className="lg:mr-3 mb-3 lg:w-[60%]">
          <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
              <MultipleSelector
                defaultOptions={STATE_OPTIONS}
                placeholder="State"
                onChange={onChange}
                error={!!error}
                hidePlaceholderWhenSelected
                hideClearAllButton
                singleSelect
                emptyIndicator={
                  <p className="p-2 mx-1 text-center text-xs font-bold">
                    Please select a valid U.S. state
                  </p>
                }
              />
            )}
            control={control}
            name="addressInfo.state"
            key="addressInfo.state"
            rules={{ required: true }}
          />
        </div>

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              type="text"
              placeholder="Zip Code"
              value={maskMapping.zipCode(value || '')}
              onIonInput={onChange}
              error={!!error}
              className="!w-[100%] lg:flex-auto"
            />
          )}
          control={control}
          name="addressInfo.zipCode"
          key="addressInfo.zipCode"
          rules={{ required: true }}
        />
      </div>
    </div>
  )
};

export default AddressInfoFormSection;
