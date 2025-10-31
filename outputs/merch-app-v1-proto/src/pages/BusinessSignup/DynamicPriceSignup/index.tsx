import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LoadingPage } from '@/components/ui/spinner';
import { useHistory } from 'react-router';
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
import { useGetDynamicMembershipPrice } from '@features/dynamic-membership-price/hooks';
import { usePostRegisterBusiness, useGetPaymentToken } from '@/features/business/hooks';
import { getCreditCardToken } from '@utils/converge';
import { useIsInIframe, useQuery } from '@utils/hooks';
import PaymentDisclaimer from '../components/PaymentDisclaimer';
import { BillingType, FormValues } from '../types';
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
import { getPrettyNumber } from '@utils/format';
import AddressInfoFormSection from '../components/AddressInfoFormSection';
import flags from '@shared/flags';

const DynamicPriceSignupPage: React.FC = () => {
  const history = useHistory();
  const isInIframe = useIsInIframe();
  const queryParams = useQuery();

  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);
  const [previousSelectedBillingMethod, setPreviousSelectedBillingMethod] =
    useState<Exclude<BillingType, BillingType.NONE>>(
      BillingType.CREDIT_OR_DEBIT_CARD
    );

  const {
    data: {
      merchantMaxCardholderAudience: maxCardholderAudience,
      monthly: dynamicMembershipMonthlyPrice
    } = {},
    error: membershipPriceError,
    isLoading: isMembershipPriceLoading
  } = useGetDynamicMembershipPrice();

  /* TODO: refactor usePostBusiness + useGetPaymentToken + handleSignup + useEffect's
    in a single hook (so both pages use it). For now, let's leave it like that while the
    new pricing strategy hasn't been well experimented with yet.
  */
  const { mutateAsync: postBusiness, isPending: isPostBusinessLoading } = usePostRegisterBusiness();
  const {
    isLoading: isGetPaymentTokenLoading,
    refetch: refetchPaymentToken,
  } = useGetPaymentToken(true)


  const handleSignup: SubmitHandler<FormValues> = async (formPayload) => {
    sendBusinessFormDataToZapier(formPayload);

    const postBusinessPayload = {
      ...formPayload,
      entityId: queryParams.entity_id
    };
    postBusinessPayload.contactInfo.phone = stripMapping.phone(
      formPayload.contactInfo.phone
    );

    setIsSubmitLoading(true);
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

        const amount = dynamicMembershipMonthlyPrice?.min.total.toFixed(2) ?? '0.00';

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
            useDynamicPricing: true,
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

      setIsSubmitLoading(false);

      handleRegistrationExceptions(postBusinessPayload, postBusinessResponse);

      history.push({
        pathname: routes.signupConfirmation,
        state: {
          title: 'Welcome to Plink!',
          signupEmail: postBusinessPayload.contactInfo.email,
          thanks: 'signing up'
        }
      });
    } catch (e) {
      setIsSubmitLoading(false);
      const postBusinessError = e as any;
      setRequestErrors([postBusinessError?.message]);
    }
  };

  const {
    control,
    handleSubmit,
    watchedValues: { watchedBillingType }
  } = useBusinessRegistrationForm({
    setValidationErrors,
    previousSelectedBillingMethod,
    promoCodeAppliedMembership: undefined,
    handleSignup,
    isMembershipPriceWithError: membershipPriceError !== null
  });

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

  const allErrors = [...validationErrors, ...requestErrors];

  useEffect(() => {
    document.title = 'Join Plink';
  }, []);

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
            maxCardholderAudience={maxCardholderAudience}
            initialMembershipValue={dynamicMembershipMonthlyPrice?.min.total}
            finalMembershipValue={dynamicMembershipMonthlyPrice?.max.total}
            perCardholderMaxMonthlyCost={
              dynamicMembershipMonthlyPrice?.max.perCardholder
            }
          />

          {watchedBillingType !== BillingType.NONE && (
            <>
              <BillingInfoFormSection
                control={control}
                billingType={watchedBillingType}
              />

              <YourPriceContainer>
                <OrderItem>
                  <OrderItemLabel>Your Price Today</OrderItemLabel>
                  {!membershipPriceError && (
                    <OrderItemSuccessValue>
                      $
                      {getPrettyNumber(
                        dynamicMembershipMonthlyPrice?.min.total
                      )}
                      /mo
                    </OrderItemSuccessValue>
                  )}
                </OrderItem>
                <OrderItem>
                  <OrderItemLabel>
                    Price Once Audience is Complete
                  </OrderItemLabel>
                  {!membershipPriceError && (
                    <OrderItemSuccessValue>
                      $
                      {getPrettyNumber(
                        dynamicMembershipMonthlyPrice?.max.total
                      )}
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
              price=""
              type={watchedBillingType}
              pageRoute="register"
            />
          )}
        </StyledForm>

        <LoadingPage show={isSubmitLoading} />
      </StyledContent>
    </StyledPage>
  );
};

export default DynamicPriceSignupPage;
