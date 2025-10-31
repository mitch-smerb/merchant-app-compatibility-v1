import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { maskMapping } from '@shared/form-helper';
import { FormSectionTitle, DynamicRow } from '@pages/BusinessSignup/styles';
import {
  ECheckTypeButton,
  ECheckTypeSelectorContainer,
  RadioGroup,
  RadioItem,
  RadioInput,
  StyleBillingInput
} from './styles';
import { BillingType, FormValues } from '@pages/BusinessSignup/types';

interface BillingInfoFormSectionProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  billingType: Exclude<BillingType, BillingType.NONE>;
  className?: string;
}

const BillingInfoFormSection: React.FC<BillingInfoFormSectionProps> = ({
  control,
  billingType,
  className
}) => (
  <div className={className}>
    <FormSectionTitle>Enter Your Billing Information</FormSectionTitle>

    <Controller
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          value={
            value === BillingType.CREDIT_OR_DEBIT_CARD
              ? BillingType.CREDIT_OR_DEBIT_CARD
              : BillingType.ECHECK_BUSINESS_ACCOUNT
          }
          onIonChange={(e) => {
            const selectedBillingType = e.detail.value;
            if (selectedBillingType !== value) {
              onChange(e.detail.value);
            }
          }}
        >
          <RadioItem>
            <RadioInput
              slot="start"
              value={BillingType.CREDIT_OR_DEBIT_CARD}
              labelPlacement="end"
            >
              Pay by Credit/Debit Card
            </RadioInput>
          </RadioItem>

          <RadioItem>
            <RadioInput
              slot="start"
              value={BillingType.ECHECK_BUSINESS_ACCOUNT}
              labelPlacement="end"
            >
              Pay by eCheck
            </RadioInput>
          </RadioItem>
        </RadioGroup>
      )}
      control={control}
      name="billingInfo.type"
      key="billingInfo.type"
      rules={{ required: true }}
    />

    {billingType === BillingType.CREDIT_OR_DEBIT_CARD ? (
      <>
        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyleBillingInput
              type="text"
              placeholder="Name on Card"
              value={value || ''}
              autocapitalize="on"
              onIonInput={onChange}
              error={!!error}
            />
          )}
          control={control}
          name="billingInfo.params.cardHolderName"
          key="billingInfo.params.cardHolderName"
          rules={{ required: true }}
        />

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyleBillingInput
              type="text"
              placeholder="Credit Card Number"
              value={maskMapping.cardNumber(value || '')}
              onIonInput={onChange}
              error={!!error}
            />
          )}
          control={control}
          name="billingInfo.params.cardNumber"
          key="billingInfo.params.cardNumber"
          rules={{ required: true }}
        />

        <DynamicRow>
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyleBillingInput
                type="text"
                placeholder="MM / YY"
                value={maskMapping.monthYear(value || '')}
                onIonInput={onChange}
                error={!!error}
                maxlength={7}
              />
            )}
            control={control}
            name="billingInfo.params.expirationDate"
            key="billingInfo.params.expirationDate"
            rules={{ required: true }}
          />

          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyleBillingInput
                type="number"
                placeholder="CVV"
                value={value}
                onIonInput={onChange}
                error={!!error}
              />
            )}
            control={control}
            name="billingInfo.params.securityCode"
            key="billingInfo.params.securityCode"
            rules={{ required: true }}
          />

          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyleBillingInput
                type="text"
                placeholder="Zip Code"
                value={maskMapping.zipCode(value || '')}
                onIonInput={onChange}
                error={!!error}
              />
            )}
            control={control}
            name="billingInfo.params.zipCode"
            key="billingInfo.params.zipCode"
            rules={{ required: true }}
          />
        </DynamicRow>
      </>
    ) : (
      <>
        <Controller
          render={({ field: { onChange } }) => (
            <ECheckTypeSelectorContainer>
              <ECheckTypeButton
                selected={billingType === BillingType.ECHECK_BUSINESS_ACCOUNT}
                onClick={() => onChange(BillingType.ECHECK_BUSINESS_ACCOUNT)}
              >
                Business Account
              </ECheckTypeButton>
              <ECheckTypeButton
                selected={billingType === BillingType.ECHECK_PERSONAL_ACCOUNT}
                onClick={() => onChange(BillingType.ECHECK_PERSONAL_ACCOUNT)}
              >
                Personal Account
              </ECheckTypeButton>
            </ECheckTypeSelectorContainer>
          )}
          control={control}
          name="billingInfo.type"
          key="billingInfo.type"
          rules={{ required: true }}
        />

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyleBillingInput
              type="number"
              placeholder="Routing Number"
              value={value}
              onIonInput={onChange}
              error={!!error}
            />
          )}
          control={control}
          name="billingInfo.params.routingNumber"
          key="billingInfo.params.routingNumber"
          rules={{ required: true }}
        />

        <Controller
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyleBillingInput
              type="number"
              placeholder="Bank Account Number"
              value={value}
              onIonInput={onChange}
              error={!!error}
            />
          )}
          control={control}
          name="billingInfo.params.bankAccountNumber"
          key="billingInfo.params.bankAccountNumber"
          rules={{ required: true }}
        />

        {billingType === BillingType.ECHECK_BUSINESS_ACCOUNT ? (
          <Controller
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyleBillingInput
                type="text"
                placeholder="Account Business Name"
                value={value}
                onIonInput={onChange}
                error={!!error}
              />
            )}
            control={control}
            name="billingInfo.params.accountBusinessName"
            key="billingInfo.params.accountBusinessName"
            rules={{ required: true }}
          />
        ) : (
          <>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <StyleBillingInput
                  type="text"
                  placeholder="First Name"
                  autocapitalize="on"
                  value={value}
                  onIonInput={onChange}
                  error={!!error}
                />
              )}
              control={control}
              name="billingInfo.params.firstName"
              key="billingInfo.params.firstName"
              rules={{ required: true }}
            />

            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <StyleBillingInput
                  type="text"
                  placeholder="Last Name"
                  autocapitalize="on"
                  value={value}
                  onIonInput={onChange}
                  error={!!error}
                />
              )}
              control={control}
              name="billingInfo.params.lastName"
              key="billingInfo.params.lastName"
              rules={{ required: true }}
            />
          </>
        )}
      </>
    )}
  </div>
);

export default BillingInfoFormSection;
