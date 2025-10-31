import React from 'react';
import { IonList } from '@ionic/react';
import { Control, Controller } from 'react-hook-form';
import { links } from '@shared/constants';
import { CheckBox, CheckBoxLabel, TermLink, TermsContainer } from './styles';
import { FormValues } from '@pages/BusinessSignup/types';

interface TermsFormSectionProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
}

const TermsFormSection: React.FC<TermsFormSectionProps> = ({ control }) => (
  <Controller
    render={({ field: { onChange, value } }) => (
      <IonList>
        <TermsContainer>
          <CheckBox
            slot="start"
            checked={value}
            onIonChange={(e) => {
              onChange(e.detail.checked);
            }}
          />
          <CheckBoxLabel>
            By checking this box and clicking “Submit”, you confirm you are at
            least 18 years of age and are accepting{' '}
            <TermLink href={links.terms}>
              Plink&apos;s Merchant Terms and Conditions
            </TermLink>
            , <TermLink href={links.privacy}>Privacy Policy</TermLink> and{' '}
            <TermLink href={links.collinsonAgreement}>
              Collinson Merchant Authorization Agreement
            </TermLink>
            . <span className="required">*</span>
          </CheckBoxLabel>
        </TermsContainer>
      </IonList>
    )}
    control={control}
    name="acceptedTerms"
    rules={{ required: true }}
  />
);

export default TermsFormSection;
