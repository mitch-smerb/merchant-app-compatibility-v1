import * as Sentry from '@sentry/react';
import { useEffect } from 'react';
import { saveZapierBusiness } from '@features/business/business-resolver';
import { BillingType, FormValues } from './types';
import { emails } from '@shared/constants';

export const sendBusinessFormDataToZapier = (businessFormData: FormValues) => {
  saveZapierBusiness({
    businessName: businessFormData.contactInfo.businessName,
    corporateName:
      businessFormData.billingInfo.type === BillingType.ECHECK_BUSINESS_ACCOUNT
        ? businessFormData.billingInfo.params.accountBusinessName
        : '',
    email: businessFormData.contactInfo.email,
    firstName: businessFormData.contactInfo.firstName,
    lastName: businessFormData.contactInfo.lastName,
    phone: businessFormData.contactInfo.phone,
    promoCode: businessFormData.billingInfo.promoCode || '',
    zipCode:
      businessFormData.billingInfo.type === BillingType.CREDIT_OR_DEBIT_CARD
        ? businessFormData.billingInfo.params.zipCode
        : ''
  });
};

export const handleRegistrationExceptions = (
  postBusinessPayload: FormValues,
  postBusinessResponse: any
) => {
  if (postBusinessResponse.statusCode) {
    if (postBusinessResponse.statusCode !== 500) {
      // Done as a tracking measure for a bug that's currently not reproducible.
      // Remove this code once sure the bug was fixed.
      const isLastNameError = postBusinessResponse.message
        ?.toLowerCase()
        ?.includes('name');
      if (isLastNameError) {
        Sentry.setContext('API Response', {
          response: postBusinessResponse,
          payload: postBusinessPayload
        });
        Sentry.captureException(new Error('Name API error detected'));
      }

      throw new Error(postBusinessResponse.message);
    } else {
      throw new Error(
        `There was an issue processing your payment. If the issue continues, please contact ${emails.contactUs}`
      );
    }
  }
};

export const useMembershipPriceErrorHandler = (
  membershipPriceError: any,
  isMembershipPriceLoading: boolean,
  setRequestErrors: React.Dispatch<React.SetStateAction<string[]>>
) => {
  useEffect(() => {
    if (!isMembershipPriceLoading) {
      if (membershipPriceError?.message) {
        if (
          membershipPriceError.statusCode &&
          membershipPriceError.statusCode !== 500
        ) {
          setRequestErrors([membershipPriceError.message]);
        } else {
          setRequestErrors([
            `There was an issue requesting your membership price. If the issue continues, please contact ${emails.contactUs}`
          ]);
        }
      } else {
        setRequestErrors([]);
      }
    }
  }, [membershipPriceError, isMembershipPriceLoading]);
};

export const extractErrorMessages = (
  errors: Record<string, { message?: string } | undefined> | undefined
) => {
  const errorsObj = errors || {};
  return Object.keys(errorsObj || {})
    .map((field) => errorsObj[field]?.message || '')
    .filter((message) => message.length > 0);
};
