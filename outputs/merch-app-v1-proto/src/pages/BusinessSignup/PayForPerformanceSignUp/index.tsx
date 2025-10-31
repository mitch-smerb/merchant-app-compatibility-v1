import React, { useEffect, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LoadingPage } from '@/components/ui/spinner';
import { useHistory } from 'react-router';
import { v4 as uuid } from 'uuid';
import { stripMapping } from '@shared/form-helper';
import {
  ErrorMessage,
  ErrorMessageContainer,
  Header,
  StyledContent,
  StyledForm,
  StyledPage,
  ButtonSubmit
} from '../styles';
import { MembershipPrice } from '@/features/membership-price/membershipPrice-types';
import { useGetMembershipPrice } from '@features/membership-price/hooks';
import {
  useGetPaymentToken,
  usePostRegisterBusiness,
  usePostRegistrationInProgress
} from '@/features/business/hooks';
import { getCreditCardToken } from '@utils/converge';
import { useIsInIframe, useQuery } from '@utils/hooks';
import { PaymentDisclaimerPfp } from '../components/PaymentDisclaimer';
import { BillingType, FormValues, MerchantInfo } from '../types';
import { useBusinessRegistrationForm } from '../form-validation';
import ContactInfoFormSection from '../components/ContactInfoFormSection';
import BillingInfoFormSection from '../components/BillingInfoFormSection';
import TermsFormSection from '../components/TermsFormSection';
import { routes } from '@shared/constants';
import {
  handleRegistrationExceptions,
  sendBusinessFormDataToZapier,
  useMembershipPriceErrorHandler
} from '../utils';
import AddressInfoFormSection from '../components/AddressInfoFormSection';
import flags from '@shared/flags';

const PFPSignUpPage: React.FC = () => {
  const history = useHistory();
  const isInIframe = useIsInIframe();
  const queryParams = useQuery();

  const cioId = useMemo(
    () => queryParams.cio_id || uuid(),
    [queryParams.cio_id]
  );
  const promoCode = queryParams.promoCode;

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);
  const [previousSelectedBillingMethod, setPreviousSelectedBillingMethod] =
    useState<Exclude<BillingType, BillingType.NONE>>(
      BillingType.CREDIT_OR_DEBIT_CARD
    );

  const [promoCodeAppliedMembership, setPromoCodeAppliedMembership] = useState<MembershipPrice | undefined>(undefined);
  const [membershipPriceError, setMembershipPriceError] = useState<Error | null>(null);

  // Hooks
  const { mutateAsync: postBusinessRegistrationInProgressData } = usePostRegistrationInProgress()
  const { mutateAsync: postBusiness, isPending: isPostBusinessLoading } = usePostRegisterBusiness();
  const {
    isLoading: isGetPaymentTokenLoading,
    refetch: refetchPaymentToken,
  } = useGetPaymentToken(true)

  // We use this if the promo code is setted as $0.00 or if there’s any kind of promo code
  const [promoCodeNotAvailable, setPromoCodeNotAvailable]= useState(queryParams.promoCode ? false : 'No promo code available, please contact us');

  /* TODO: refactor usePostBusiness + useGetPaymentToken + handleSignup + useEffect's
    in a single hook (so both pages use it). For now, let's leave it like that while the
    new pricing strategy hasn't been well experimented with yet.
  */
  const handleSignup: SubmitHandler<FormValues> = async (formPayload) => {
    sendBusinessFormDataToZapier(formPayload);

    setIsSubmitLoading(true);

    const postBusinessPayload = {
      ...formPayload,
      entityId: queryParams.entity_id,
      cioId
    };
    postBusinessPayload.contactInfo.phone = stripMapping.phone(
      formPayload.contactInfo.phone
    );

    let postBusinessResponse;
    try {
      if (
        postBusinessPayload.billingInfo.type ===
        BillingType.CREDIT_OR_DEBIT_CARD
      ) {
        const {
          data: {
            statusCode: getPaymentTokenStatusCode,
            paymentId,
            cardPaymentToken
          }
        } = await refetchPaymentToken();

        if (getPaymentTokenStatusCode) {
          throw new Error('Could not prepare the card payment');
        }

        const cardHolderNames =
          postBusinessPayload.billingInfo.params.cardHolderName.split(' ');
        const {
          0: cardHolderFirstName,
          [cardHolderNames.length - 1]: cardHolderLastName
        } = cardHolderNames;

        const { cardNumber, expirationDate, zipCode } =
          postBusinessPayload.billingInfo.params;
        postBusinessPayload.billingInfo.params = {
          ...postBusinessPayload.billingInfo.params,
          cardNumber: stripMapping.cardNumber(cardNumber),
          expirationDate: stripMapping.monthYear(expirationDate),
          zipCode: stripMapping.zipCode(zipCode)
        };

        const amount = promoCodeAppliedMembership?.monthlyPerStorePrice.toFixed(2) || '1';

        const { cardToken } = await getCreditCardToken({
          paymentToken: cardPaymentToken,
          paymentId,
          amount,
          businessName: postBusinessPayload.contactInfo.businessName,
          holderFirstName: cardHolderFirstName,
          holderLastName: cardHolderLastName,
          cardNumber: postBusinessPayload.billingInfo.params.cardNumber,
          securityCode: postBusinessPayload.billingInfo.params.securityCode,
          expirationDate: postBusinessPayload.billingInfo.params.expirationDate,
          zipCode: postBusinessPayload.billingInfo.params.zipCode
        });

        const res = await postBusiness({
          ...postBusinessPayload,
          isPayForPerformance: true,
          billingInfo: {
            ...postBusinessPayload.billingInfo,
            promoCode,
            params: {
              cardHolderFirstName,
              cardHolderLastName,
              cardToken,
              zipCode: postBusinessPayload.billingInfo.params.zipCode
            }
          }
        });
        postBusinessResponse = res;
      } else {
        const res = await postBusiness(postBusinessPayload);
        postBusinessResponse = res;
      }

      handleRegistrationExceptions(postBusinessPayload, postBusinessResponse);

      history.push({
        pathname: routes.signupConfirmation,
        state: {
          signupEmail: postBusinessPayload.contactInfo.email
        }
      });
    } catch (e) {
      const postBusinessError = e as any;
      setRequestErrors([postBusinessError?.message]);
      setIsSubmitLoading(false);
    }
  };

  const handleMerchantDataChange = (data: MerchantInfo) => {
    if (!isSubmitLoading) {
      postBusinessRegistrationInProgressData({
        cioId,
        isPayForPerformance: true,
        promoCode,
        ...data
      });
    }
  };

  const {
    control,
    handleSubmit,
    watchedValues: {
      watchedBillingType,
      watchedNumberOfLocations,
      watchedPromoCode
    }
  } = useBusinessRegistrationForm({
    setValidationErrors,
    previousSelectedBillingMethod,
    promoCodeAppliedMembership,
    handleSignup,
    isMembershipPriceWithError: membershipPriceError !== null,
    onMerchantDataChange: handleMerchantDataChange,
    defaultValues: {
      contactInfo: {
        firstName: String(queryParams.first_name || ''),
        lastName: String(queryParams.last_name || ''),
        email: String(queryParams.email || ''),
        phone: String(queryParams.phone || ''),
        businessName: String(queryParams.business_name || ''),
        numberOfLocations: Number(queryParams.number_of_locations || 1)
      },
      addressInfo: {
        streetAddress: String(queryParams.street_address || ''),
        city: String(queryParams.city || ''),
        state: String(queryParams.state || ''),
        zipCode: String(queryParams.zip_code || '')
      }
    }
  });

  const
  {
    data: {
      promoCodeApplied: promoCodeApplied
    } = {},
    error: memberPriceErrorText,
    isLoading: isMembershipPriceLoading
  } = useGetMembershipPrice(watchedNumberOfLocations, promoCode as string, false);

  useEffect(() => {
    if (promoCodeApplied) setPromoCodeAppliedMembership(promoCodeApplied);
    if (memberPriceErrorText) setMembershipPriceError(memberPriceErrorText);
  }, [promoCodeApplied, memberPriceErrorText]);

  const getPromoErrorHandler = (memberPriceErrorText: any) => {
    if (memberPriceErrorText?.message === `Invalid ${promoCode} promo code`) {
      memberPriceErrorText.message = 'There was an error in your signup, please contact us';
    }

    return memberPriceErrorText
  }

  useMembershipPriceErrorHandler(
    getPromoErrorHandler(membershipPriceError),
    isMembershipPriceLoading,
    setRequestErrors
  );

  useEffect(() => {
    if (watchedBillingType !== BillingType.NONE) {
      setPreviousSelectedBillingMethod(watchedBillingType);
    }

    if (promoCodeAppliedMembership?.monthlyPerStorePrice.toFixed(2) === '0.00') {
      setPromoCodeNotAvailable('Your promo code is not available, please contact us');
    }
  }, [watchedBillingType, watchedNumberOfLocations, watchedPromoCode]);

  useEffect(() => {
    document.title = 'Join Plink';
  }, []);

  const allErrors = [
    ...validationErrors,
    ...requestErrors,
    ...(promoCodeNotAvailable ? [promoCodeNotAvailable] : [])
  ];

  return (
    <StyledPage>
      <StyledContent>
        {!isInIframe && <Header />}

        {allErrors.length > 0 && (
          <ErrorMessageContainer>
            <ErrorMessage data-testid="error-message">{`${allErrors.join(
              '. '
            )}.`}</ErrorMessage>
          </ErrorMessageContainer>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <ContactInfoFormSection
            control={control}
            isLoading={
              isMembershipPriceLoading ||
              isPostBusinessLoading ||
              isGetPaymentTokenLoading
            }
          />

          {flags.requireAddressOnSignup && (
            <AddressInfoFormSection control={control} className="mt-4 mb-10 border-neutral-30 pt-3" />
          )}

          {watchedBillingType !== BillingType.NONE && (
            <>
              <BillingInfoFormSection
                control={control}
                billingType={watchedBillingType}
              />

              <div className="bg-neutral-90 mt-[25px] mb-[30px] -mx-[35px] px-[35px] py-[20px] max-[755px]:-mx-[30px] max-[755px]:p-[30px] rounded-sm">
                <div className="flex justify-between pb-6">
                  <p className="!mb-0 !font-mont-medium !font-bold !text-neutral-40 !text-[20px]">Total Due Today</p>
                  {!membershipPriceError && promoCodeAppliedMembership && (
                    <p className="font-mont font-bold text-[20px] text-success-20 mr-2">
                      ${promoCodeAppliedMembership.monthlyPerStorePrice.toFixed(2)}
                    </p>
                  )}
                </div>
                <p className="font-open text-[13px] text-neutral-35">
                  One-time activation fee. Ongoing charges are based on your monthly sales and rewards issued.
                </p>
              </div>
            </>
          )}

          <TermsFormSection control={control} />

          <div className="flex justify-center py-[30px]">
            <ButtonSubmit
              disabled={
                isMembershipPriceLoading ||
                isPostBusinessLoading ||
                isGetPaymentTokenLoading ||
                promoCodeNotAvailable as boolean
              }
            />
          </div>

          {watchedBillingType !== BillingType.NONE && (
            <PaymentDisclaimerPfp />
          )}
        </StyledForm>

        <LoadingPage show={isSubmitLoading} />
      </StyledContent>
    </StyledPage>
  );
};

export default PFPSignUpPage;
