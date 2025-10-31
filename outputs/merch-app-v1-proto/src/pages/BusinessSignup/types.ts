// @ts-expect-error -- Path alias is correctly configured in tsconfig
import { DeepPartial } from '@types/generic';

// eslint-disable-next-line no-shadow
export enum BillingType {
  CREDIT_OR_DEBIT_CARD = 'credit-or-debit-card',
  ECHECK_BUSINESS_ACCOUNT = 'echeck-business-account',
  ECHECK_PERSONAL_ACCOUNT = 'echeck-personal-account',
  NONE = 'free-membership-from-promo-code'
}

export type CreditOrDebitCardBilling = {
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  zipCode: string;
};

export type eCheckBusinessAccountBilling = {
  routingNumber: string;
  bankAccountNumber: string;
  accountBusinessName: string;
};

export type eCheckPersonalAccountBilling = {
  routingNumber: string;
  bankAccountNumber: string;
  firstName: string;
  lastName: string;
};

export type BillingInfo =
  | {
      type: BillingType.CREDIT_OR_DEBIT_CARD;
      params: CreditOrDebitCardBilling;
    }
  | {
      type: BillingType.ECHECK_BUSINESS_ACCOUNT;
      params: eCheckBusinessAccountBilling;
    }
  | {
      type: BillingType.ECHECK_PERSONAL_ACCOUNT;
      params: eCheckPersonalAccountBilling;
    }
  | {
      type: BillingType.NONE;
      params: never;
    };

export type FormValues = {
  contactInfo: {
    firstName: string;
    lastName: string;
    businessName: string;
    email: string;
    phone: string;
    numberOfLocations: number;
  };
  addressInfo: {
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  billingInfo: BillingInfo & {
    promoCode?: string;
  };
  acceptedTerms: boolean;
};

export type MerchantInfo = DeepPartial<
  Pick<FormValues, 'contactInfo' | 'addressInfo'>
>;
