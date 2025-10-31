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
  OrderItem,
  OrderItemLabel,
  OrderItemSuccessValue,
  StyledButton,
  StyledContent,
  StyledForm,
  StyledPage,
  YourPriceContainer
} from '../styles';
import { MembershipPrice } from '@/features/membership-price/membershipPrice-types';
import { useGetMembershipPrice } from '@/features/membership-price/hooks';
import {
  usePostRegistrationInProgress,
  useGetPaymentToken,
  usePostRegisterBusiness
} from '@/features/business/hooks';
import { getCreditCardToken } from '@utils/converge';
import { useIsInIframe, useQuery } from '@utils/hooks';
import PaymentDisclaimer from '../components/PaymentDisclaimer';
import { BillingType, FormValues, MerchantInfo } from '../types';
import { useBusinessRegistrationForm } from '../form-validation';
import ContactInfoFormSection from '../components/ContactInfoFormSection';
import OrderSummaryFormSection from './components/OrderSummaryFormSection';
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


const StaticPriceSignupPage: React.FC = () => {
  const history = useHistory();
  const isInIframe = useIsInIframe();
  const queryParams = useQuery();

  const cioId = useMemo(
    () => queryParams.cio_id || uuid(),
    [queryParams.cio_id]
  );

  const [promoCodeAppliedMembership, setPromoCodeAppliedMembership] = useState<MembershipPrice | undefined>(undefined);
  const [membershipPriceError, setMembershipPriceError] = useState<Error | null>(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);
  const [previousSelectedBillingMethod, setPreviousSelectedBillingMethod] =
    useState<Exclude<BillingType, BillingType.NONE>>(
      BillingType.CREDIT_OR_DEBIT_CARD
    );

  // Hooks
  const { mutateAsync: postBusiness, isPending: isPostBusinessLoading } = usePostRegisterBusiness();

  const {
    isLoading: isGetPaymentTokenLoading,
    refetch: refetchPaymentToken
  } = useGetPaymentToken()

  const { mutateAsync: postBusinessRegistrationInProgressData } = usePostRegistrationInProgress()

  /* TODO: refactor usePostBusiness + useGetPaymentToken + handleSignup + useEffect's
    in a single hook (so both pages use it). For now, let's leave it like that while the
    new pricing strategy hasn't been well experimented with yet.
  */
  const handleSignup: SubmitHandler<FormValues> = async (formPayload) => {
    setIsSubmitLoading(true);

    sendBusinessFormDataToZapier(formPayload);

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

        const amount = (
          promoCodeAppliedMembership?.monthlyTotalPrice ??
          defaultMembership?.monthlyTotalPrice ??
          0
        ).toFixed(2);

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
          billingInfo: {
            ...postBusinessPayload.billingInfo,
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
        default: defaultMembership,
        promoCodeApplied: promoCodeApplied
      } = {},
      error: memberPriceErrorText,
      isLoading: isMembershipPriceLoading
    } = useGetMembershipPrice(watchedNumberOfLocations, watchedPromoCode && watchedPromoCode.length > 0 ? watchedPromoCode : undefined, false);

  useEffect(() => {
    if (promoCodeApplied) setPromoCodeAppliedMembership(promoCodeApplied);
    if (memberPriceErrorText) setMembershipPriceError(memberPriceErrorText);
  }, [promoCodeApplied, memberPriceErrorText]);

  useMembershipPriceErrorHandler(
    membershipPriceError,
    isMembershipPriceLoading,
    setRequestErrors
  );

  useEffect(() => {
    if (watchedBillingType !== BillingType.NONE) {
      setPreviousSelectedBillingMethod(watchedBillingType);
    }
  }, [watchedBillingType]);

  useEffect(() => {
    document.title = 'Join Plink';
  }, []);

  const allErrors = [...validationErrors, ...requestErrors];

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
            <AddressInfoFormSection control={control} />
          )}

          <OrderSummaryFormSection
            control={control}
            defaultMembership={defaultMembership}
            promoCodeAppliedMembership={promoCodeAppliedMembership}
            promoCodeApplied={watchedPromoCode}
            isLoading={
              isMembershipPriceLoading ||
              isPostBusinessLoading ||
              isGetPaymentTokenLoading
            }
            hasError={!!membershipPriceError}
          />

          {watchedBillingType !== BillingType.NONE && (
            <>
              <BillingInfoFormSection
                control={control}
                billingType={watchedBillingType}
              />

              <YourPriceContainer>
                <OrderItem>
                  <OrderItemLabel>Your Price</OrderItemLabel>
                  {!membershipPriceError && promoCodeAppliedMembership && (
                    <OrderItemSuccessValue>
                      ${promoCodeAppliedMembership.monthlyTotalPrice.toFixed(2)}
                      /mo
                    </OrderItemSuccessValue>
                  )}
                </OrderItem>
              </YourPriceContainer>
            </>
          )}

          <TermsFormSection control={control} />

          <StyledButton
            disabled={
              isMembershipPriceLoading ||
              isPostBusinessLoading ||
              isGetPaymentTokenLoading
            }
            type="submit"
            expand="block"
            shape="round"
          >
            Submit
          </StyledButton>

          {watchedBillingType !== BillingType.NONE && (
            <PaymentDisclaimer
              price={
                (promoCodeAppliedMembership?.monthlyPerStorePrice ??
                  defaultMembership?.monthlyPerStorePrice ??
                  0
                ).toFixed(2)
              }
              type={watchedBillingType}
              pageRoute="signup"
            />
          )}
        </StyledForm>

        <LoadingPage show={isSubmitLoading} />
      </StyledContent>
    </StyledPage>
  );
};

export default StaticPriceSignupPage;
