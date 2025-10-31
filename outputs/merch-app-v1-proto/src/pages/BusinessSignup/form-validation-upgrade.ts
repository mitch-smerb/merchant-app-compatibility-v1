import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import _ from 'lodash';
import { BillingType, FormValues, MerchantInfo } from './types';
import { MembershipPrice } from '@/features/membership-price/membershipPrice-types';
import { extractErrorMessages } from './utils';

const MERCHANT_INFO_TIMEOUT_IN_MS = 800;
const schemaWithAddressInfo = Joi.object({
  contactInfo: Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid first name' }),
    lastName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid last name' }),
    businessName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid business name' }),
    email: Joi.string().trim().required().messages({ '*': 'Invalid email' }),
    phone: Joi.string().required().messages({ '*': 'Invalid phone' }),
    numberOfLocations: Joi.number()
      .min(1)
      .max(50)
      .required()
      .messages({ '*': 'Invalid number of locations' })
  }),
  addressInfo: Joi.object({
    streetAddress: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid street address' }),
    city: Joi.string().trim().required().messages({ '*': 'Invalid city' }),
    state: Joi.string()
      .trim()
      .required()
      .length(2)
      .messages({ '*': 'Invalid state' }),
    zipCode: Joi.string().required().messages({ '*': 'Invalid zip code' })
  }),
  billingInfo: Joi.object({
    promoCode: Joi.string()
      .trim()
      .when('type', {
        is: BillingType.NONE,
        then: Joi.required()
      })
      .messages({ '*': 'Invalid promo code' }),
    type: Joi.string()
      .valid(...Object.values(BillingType))
      .required(),
    params: Joi.options({
      stripUnknown: true
    }).when('type', {
      is: BillingType.NONE,
      then: Joi.object().strip(),
      otherwise: Joi.object().when('type', {
        is: BillingType.CREDIT_OR_DEBIT_CARD,
        then: Joi.object({
          cardHolderName: Joi.string()
            .trim()
            .required()
            .messages({ '*': 'Invalid name on card' }),
          cardNumber: Joi.string()
            .required()
            .messages({ '*': 'Invalid credit card number' }),
          expirationDate: Joi.string()
            .required()
            .messages({ '*': 'Invalid expiration date' }),
          securityCode: Joi.string()
            .required()
            .messages({ '*': 'Invalid security code' }),
          zipCode: Joi.string().required().messages({ '*': 'Invalid zip code' })
        }),
        otherwise: Joi.object().when('type', {
          is: BillingType.ECHECK_BUSINESS_ACCOUNT,
          then: Joi.object({
            routingNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid routing number' }),
            bankAccountNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid bank account number' }),
            accountBusinessName: Joi.string()
              .required()
              .messages({ '*': 'Invalid account business name' })
          }),
          otherwise: Joi.object({
            routingNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid routing number' }),
            bankAccountNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid bank account number' }),
            firstName: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid personal account first name' }),
            lastName: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid personal account last name' })
          })
        })
      })
    })
  }),
  acceptedTerms: Joi.boolean()
    .valid(true)
    .required()
    .messages({ '*': 'Please accept the terms' })
});

const schemaWithoutAddressInfo = Joi.object({
  contactInfo: Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid first name' }),
    lastName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid last name' }),
    businessName: Joi.string()
      .trim()
      .required()
      .messages({ '*': 'Invalid business name' }),
    email: Joi.string().trim().required().messages({ '*': 'Invalid email' }),
    phone: Joi.string().required().messages({ '*': 'Invalid phone' }),
    numberOfLocations: Joi.number()
      .min(1)
      .max(50)
      .required()
      .messages({ '*': 'Invalid number of locations' })
  }),
  billingInfo: Joi.object({
    promoCode: Joi.string()
      .trim()
      .when('type', {
        is: BillingType.NONE,
        then: Joi.required()
      })
      .messages({ '*': 'Invalid promo code' }),
    type: Joi.string()
      .valid(...Object.values(BillingType))
      .required(),
    params: Joi.options({
      stripUnknown: true
    }).when('type', {
      is: BillingType.NONE,
      then: Joi.object().strip(),
      otherwise: Joi.object().when('type', {
        is: BillingType.CREDIT_OR_DEBIT_CARD,
        then: Joi.object({
          cardHolderName: Joi.string()
            .trim()
            .required()
            .messages({ '*': 'Invalid name on card' }),
          cardNumber: Joi.string()
            .required()
            .messages({ '*': 'Invalid credit card number' }),
          expirationDate: Joi.string()
            .required()
            .messages({ '*': 'Invalid expiration date' }),
          securityCode: Joi.string()
            .required()
            .messages({ '*': 'Invalid security code' }),
          zipCode: Joi.string().required().messages({ '*': 'Invalid zip code' })
        }),
        otherwise: Joi.object().when('type', {
          is: BillingType.ECHECK_BUSINESS_ACCOUNT,
          then: Joi.object({
            routingNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid routing number' }),
            bankAccountNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid bank account number' }),
            accountBusinessName: Joi.string()
              .required()
              .messages({ '*': 'Invalid account business name' })
          }),
          otherwise: Joi.object({
            routingNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid routing number' }),
            bankAccountNumber: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid bank account number' }),
            firstName: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid personal account first name' }),
            lastName: Joi.string()
              .trim()
              .required()
              .messages({ '*': 'Invalid personal account last name' })
          })
        })
      })
    })
  }),
  acceptedTerms: Joi.boolean()
    .valid(true)
    .required()
    .messages({ '*': 'Please accept the terms' })
});

interface BusinessRegistrationFormHookParams {
  setValidationErrors: (messages: string[]) => void;
  promoCodeAppliedMembership: MembershipPrice | undefined;
  previousSelectedBillingMethod: Exclude<BillingType, BillingType.NONE>;
  handleUpgrade: SubmitHandler<FormValues>;
  isMembershipPriceWithError: boolean;
  onMerchantDataChange?: (data: MerchantInfo) => void;
  hadAddressInfo: boolean;
  defaultValues?: MerchantInfo;
}

export const useBusinessUpgradeForm = ({
  setValidationErrors,
  promoCodeAppliedMembership,
  previousSelectedBillingMethod,
  handleUpgrade,
  isMembershipPriceWithError,
  onMerchantDataChange,
  hadAddressInfo,
  defaultValues
}: BusinessRegistrationFormHookParams) => {
  const useThisSchema = hadAddressInfo
    ? schemaWithAddressInfo
    : schemaWithoutAddressInfo;

  const {
    control,
    handleSubmit: handleSubmitBase,
    watch,
    formState: { errors: formErrors },
    setValue,
    reset
  } = useForm<FormValues>({
    reValidateMode: 'onSubmit',
    resolver: joiResolver(useThisSchema),
    defaultValues: {
      ...defaultValues,
      billingInfo: {
        type: BillingType.CREDIT_OR_DEBIT_CARD
      }
    }
  });

  const watchedNumberOfLocations = watch('contactInfo.numberOfLocations') || 1;
  const watchedPromoCode = watch('billingInfo.promoCode');
  const watchedBillingType = watch('billingInfo.type');
  const formValues = watch();

  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      const validationErrors = [
        ...extractErrorMessages(
          formErrors.contactInfo as
            | Record<string, { message?: string }>
            | undefined
        ),
        ...extractErrorMessages(
          formErrors.addressInfo as
            | Record<string, { message?: string }>
            | undefined
        ),
        ...extractErrorMessages(
          formErrors.billingInfo?.params as
            | Record<string, { message?: string }>
            | undefined
        )
      ];

      if (formErrors.acceptedTerms?.message) {
        validationErrors.push(formErrors.acceptedTerms.message);
      }

      setValidationErrors(validationErrors);
    }
  }, [formErrors]);

  useEffect(() => {
    setValue(
      'billingInfo.type',
      promoCodeAppliedMembership?.monthlyTotalPrice === 0
        ? BillingType.NONE
        : previousSelectedBillingMethod
    );
  }, [promoCodeAppliedMembership]);

  useEffect(() => {
    if (isMembershipPriceWithError) {
      setValue('billingInfo.promoCode', '');
    }
  }, [watchedNumberOfLocations]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    setValidationErrors([]);
    handleSubmitBase(handleUpgrade)(e);
  };

  const lastSentData = useRef<MerchantInfo>();
  const merchantInfoTimeout = useRef<number>(0);
  const handleMerchantInfoChange = () => {
    const { contactInfo, addressInfo } = formValues;
    const cleanedUpData = {
      contactInfo: _.pickBy(contactInfo, _.identity),
      addressInfo: _.pickBy(addressInfo, _.identity)
    } as MerchantInfo;
    if (_.isEmpty(cleanedUpData.contactInfo)) delete cleanedUpData.contactInfo;
    if (_.isEmpty(cleanedUpData.addressInfo)) delete cleanedUpData.addressInfo;

    const dataExists = Object.keys(cleanedUpData).length > 0;
    const dataChanged = !_.isEqual(lastSentData.current, cleanedUpData);
    const onlyNumberOfLocationsDefined =
      Object.keys(cleanedUpData).length === 1 &&
      cleanedUpData.contactInfo &&
      Object.keys(cleanedUpData.contactInfo).length === 1 &&
      cleanedUpData.contactInfo.numberOfLocations;
    if (
      onMerchantDataChange &&
      dataExists &&
      dataChanged &&
      !onlyNumberOfLocationsDefined
    ) {
      if (merchantInfoTimeout) clearTimeout(merchantInfoTimeout.current);

      const newTimeout = setTimeout(() => {
        onMerchantDataChange(cleanedUpData);
        lastSentData.current = cleanedUpData;
      }, MERCHANT_INFO_TIMEOUT_IN_MS);

      merchantInfoTimeout.current = newTimeout as unknown as number;
    }
  };

  useEffect(() => {
    handleMerchantInfoChange();
  }, [formValues]);

  return {
    control,
    handleSubmit,
    reset,
    watchedValues: {
      watchedBillingType,
      watchedNumberOfLocations,
      watchedPromoCode
    }
  };
};
