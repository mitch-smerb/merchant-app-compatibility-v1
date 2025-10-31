import React from 'react';
import { BillingType } from '@pages/BusinessSignup/types';
import { links } from '@shared/constants';
import { DisclaimerText, DisclaimerLink } from './styles';

interface PaymentDisclaimerProps {
  price: string;
  type: Exclude<BillingType, BillingType.NONE>;
  pageRoute: 'signup' | 'register' | 'signupPfp';
}

const infoSharingDisclaimer =
  'By providing my company and personal information, I hereby consent to its collection and processing in accordance with the Privacy Policy and agree to be contacted regarding participation in the Plink Local Network.';

const disclaimers = {
  signup: {
    creditCard: (price: string) => (
      <DisclaimerText>
        You will be charged a $1.00 activation fee. If you are signing up for a
        monthly recurring subscription, your activation fee is included. By
        clicking &quot;Submit&quot; I agree to the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and I authorize Plink, Inc. to charge the credit card entered for the
        amount of ${price} per store and other transaction fees as may be
        specified in the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>
        . Plink, Inc. is domiciled in the USA. {infoSharingDisclaimer}
      </DisclaimerText>
    ),
    echeck: (price: string) => (
      <DisclaimerText>
        You will be charged a $1.00 activation fee. If you are signing up for a
        monthly recurring subscription, your activation fee is included. By
        clicking &quot;Submit&quot;, I agree to the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and I authorize Plink, Inc. to use information above to initiate an
        electronic fund transfer from my account or to process the payment as a
        check transaction or bank drawn draft from my account for the amount
        {price} per store and other transaction fees as may be specified in the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>
        . If my payment is returned due to insufficient funds, I authorize
        Plink, Inc. to make a one-time electronic funds transfer or to use a
        bank draft drawn from my account to collect a fee as allowed by state
        law. Plink, Inc. is domiciled in the USA. {infoSharingDisclaimer}
      </DisclaimerText>
    )
  },
  register: {
    creditCard: () => (
      <DisclaimerText>
        By clicking &quot;Submit&quot; I agree to the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and I authorize Plink, Inc. to charge the credit card entered for the
        amount shown above and other transaction fees as may be specified in the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>
        . Plink, Inc. is domiciled in the USA.
      </DisclaimerText>
    ),
    echeck: () => (
      <DisclaimerText>
        By clicking &quot;Submit&quot;, I agree to the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and I authorize Plink, Inc. to use information above to initiate an
        electronic fund transfer from my account or to process the payment as a
        check transaction or bank drawn draft from my account for the amount
        shown above and other transaction fees as may be specified in the{' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        . If my payment is returned due to insufficient funds, I authorize
        Plink, Inc. to make a one-time electronic funds transfer or to use a
        bank draft drawn from my account to collect a fee as allowed by state
        law. Plink, Inc. is domiciled in the USA.
      </DisclaimerText>
    )
  },
  signupPfp: {
    echeck: () => (
      <DisclaimerText>
        By clicking "Submit," I agree to the {' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and authorize Plink, Inc. to charge the credit card entered for Pay for
        Performance Program fees as specified therein on a per
        billing cycle basis; in no event shall such charges exceed $199 per
        billing cycle without my further written consent
      </DisclaimerText>
    ),
    creditCard: () => (
      <DisclaimerText>
        By clicking "Submit," I agree to the {' '}
        <DisclaimerLink href={links.terms}>
          Plink Terms of Service
        </DisclaimerLink>{' '}
        and authorize Plink, Inc. to charge the credit card entered for Pay for
        Performance Program fees as specified therein on a per
        billing cycle basis; in no event shall such charges exceed $199 per
        billing cycle without my further written consent
      </DisclaimerText>
    )
  }
};

// Create a total different one for PFP since it will have the same Disclaime for Card or Echeck
// and now we use only tailwindcss.
export const PaymentDisclaimerPfp = () => (
  <>
    <p className="font-open text-neutral-35 text-[10px] cursor-default text-justify">
      By clicking "Submit," I agree to the {' '}
      <a href={links.terms}>
        Plink Terms of Service
      </a>{' '}
      and authorize Plink, Inc. to charge the credit card entered for Pay for
      Performance Program fees as specified therein on a per
      billing cycle basis; in no event shall such charges exceed $199 per
      billing cycle without my further written consent
    </p>
  </>
)

export const PaymentDisclaimerColombiacu = () => (
  <>
    <p className="font-open text-neutral-35 text-[10px] cursor-default text-justify">
      By clicking "Submit," I agree to the {' '}
      <a href={links.terms}>
        Plink Terms of Service
      </a>{' '}
      and I authorize Plink, Inc. to charge the credit card entered for the amount of $29.00
      per store per billing cycle and other transaction fees as may be specified in the Plink
      Terms of Service. Plink, Inc. is domiciled in the USA. By providing my company and personal
      information, I hereby consent to its collection and processing in accordance with the Privacy
      Policy and agree to be contacted regarding participation in the Plink Local Network.
    </p>
  </>
)

const PaymentDisclaimer: React.FC<PaymentDisclaimerProps> = ({
  price,
  type,
  pageRoute
}) => {
  return disclaimers[pageRoute][
    type === BillingType.CREDIT_OR_DEBIT_CARD ? 'creditCard' : 'echeck'
  ](price);
};

export default PaymentDisclaimer;
