import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { LoadingPage } from '@/components/ui/spinner';
import { useHistory, useParams } from 'react-router';
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
import { useGetMembershipPrice } from '@features/membership-price/hooks';
import {
  useGetPaymentToken,
  usePostRegistrationInProgress,
  usePatchUpgradeBusiness,
  useGetBusinessByToken
} from '@/features/business/hooks'
import { getCreditCardToken } from '@utils/converge';
import { useIsInIframe, useQuery } from '@utils/hooks';
import PaymentDisclaimer from '../components/PaymentDisclaimer';
import { BillingType, FormValues, MerchantInfo } from '../types';
import { useBusinessUpgradeForm } from '../form-validation-upgrade';
import ContactInfoFormSection from '../components/ContactInfoFormSection';
import OrderSummaryFormSection from './components/OrderSummaryFormSection';
import BillingInfoFormSection from '../components/BillingInfoFormSection';
import TermsFormSection from '../components/TermsFormSection';
import { routes, emails } from '@shared/constants';
import {
  handleRegistrationExceptions,
  sendBusinessFormDataToZapier,
  useMembershipPriceErrorHandler
} from '../utils';
import AddressInfoFormSection from '../components/AddressInfoFormSection';
import { MembershipPrice } from '@/features/membership-price/membershipPrice-types';

const UpgradeBusinessPage: React.FC = () => {
  const history = useHistory();
  const isInIframe = useIsInIframe();
  const queryParams = useQuery();
  const params = useParams<{ token: string }>();

  const [cioId, setCioId] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [requestErrors, setRequestErrors] = useState<string[]>([]);
  const [errorToken, setErrorToken] = useState<string[]>([]);
  const [previousSelectedBillingMethod, setPreviousSelectedBillingMethod] =
    useState<Exclude<BillingType, BillingType.NONE>>(
      BillingType.CREDIT_OR_DEBIT_CARD
    );

  const [promoCodeAppliedMembership, setPromoCodeAppliedMembership] = useState<MembershipPrice | undefined>(undefined);
  const [membershipPriceError, setMembershipPriceError] = useState<Error | null>(null);

  const {
    isLoading: isGetPaymentTokenLoading,
    refetch: refetchPaymentToken
  } = useGetPaymentToken(false);
  const { mutateAsync: postBusinessRegistrationInProgressData } = usePostRegistrationInProgress();

  const {
    data: businessInfo,
    isLoading: isBusinessInfoLoading,
    refetch: getBusinessByToken
  } = useGetBusinessByToken(params.token);
  const { mutateAsync: patchUpgrade, isPending: isPatchingBusinnesLoading } = usePatchUpgradeBusiness();

  /* TODO: refactor usePostBusiness + useGetPaymentToken + handleSignup + useEffect's
    in a single hook (so both pages use it). For now, let's leave it like that while the
    new pricing strategy hasn't been well experimented with yet.
  */
  const handleUpgrade: SubmitHandler<FormValues> = async (formPayload) => {
    sendBusinessFormDataToZapier(formPayload);

    setIsSubmitLoading(true);
    // Let it as Signup to use the same form validator.
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

        const res = await patchUpgrade({
          payload: {
            ...postBusinessPayload,
            businessId: businessInfo?.business.id,
            billingInfo: {
              ...postBusinessPayload.billingInfo,
              params: {
                cardHolderFirstName,
                cardHolderLastName,
                cardToken,
                zipCode: postBusinessPayload.billingInfo.params.zipCode
              }
            }
          },
          headers: { Authorization: params.token }
        });
        postBusinessResponse = res;
      } else {
        const res = await patchUpgrade({
          payload: {
            ...postBusinessPayload,
            businessId: businessInfo?.business.id
          },
          headers: {
            Authorization: params.token
          }
      });
        postBusinessResponse = res;
      }

      handleRegistrationExceptions(postBusinessPayload, postBusinessResponse);

      history.push({
        pathname: routes.upgradeSuccess,
        state: {
          signupEmail: postBusinessPayload.contactInfo.email,
          title: 'Upgrade Successful!',
          thanks: 'upgrading'
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
        accessToken: params.token,
        ...data
      });
    }
  };
  const hadAddressInfo = businessInfo?.stores.length === 1;
  const {
    control,
    handleSubmit,
    reset,
    watchedValues: {
      watchedBillingType,
      watchedNumberOfLocations,
      watchedPromoCode
    }
  } = useBusinessUpgradeForm({
    setValidationErrors,
    previousSelectedBillingMethod,
    promoCodeAppliedMembership,
    handleUpgrade,
    isMembershipPriceWithError: membershipPriceError !== null,
    onMerchantDataChange: handleMerchantDataChange,
    hadAddressInfo
  });

  const
  {
    data: {
      default: defaultMembership,
      promoCodeApplied: promoCodeApplied
    } = {},
    error: memberPrice,
    isLoading: isMembershipPriceLoading
  } = useGetMembershipPrice(watchedNumberOfLocations, watchedPromoCode && watchedPromoCode.length > 0 ? watchedPromoCode : undefined, true);

  useEffect(() => {
    if (promoCodeApplied) setPromoCodeAppliedMembership(promoCodeApplied);
    if (memberPrice) setMembershipPriceError(memberPrice);
  }, [promoCodeApplied, memberPrice]);
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
    document.title = 'Upgrade Plink Account';
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getBusinessByToken();
      if (response.isError) {
        setErrorToken([
          `Your upgrade link is not available anymore. You can request a new one, contact us: ${emails.contactUs}`
        ]);
      }

      if (response?.data?.business) {
        if (response?.data?.stores.length === 1) {
          const { business, stores } = response.data

          reset({
            contactInfo: {
              firstName: business.contactFirstName || '',
              lastName: business.contactLastName || '',
              email: business.contactEmail || '',
              phone: business.contactPhone || '',
              businessName: business.businessName || '',
              numberOfLocations: 1
            },
            addressInfo: {
              streetAddress: stores[0].streetAddress,
              city: stores[0].city,
              state: stores[0].state,
              zipCode: stores[0].zipCode
            }
          });
        } else {
          const { business } = response.data
          reset({
            contactInfo: {
              firstName: business.contactFirstName || '',
              lastName: business.contactLastName || '',
              email: business.contactEmail || '',
              phone: business.contactPhone || '',
              businessName: business.businessName || '',
              numberOfLocations: 1
            }
          });
        }
        setCioId(response?.data.business.customerIoId || '');
      }
    })();
  }, [businessInfo]);

  const allErrors = [...validationErrors, ...requestErrors, ...errorToken];
  return (
    <StyledPage>
      <StyledContent>
        {!isInIframe && <Header isUpgradePage />}

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
              isPatchingBusinnesLoading ||
              isGetPaymentTokenLoading ||
              isBusinessInfoLoading
            }
            disableEmailForUpgrade
          />

          {businessInfo?.stores.length === 1 && (
            <AddressInfoFormSection control={control} />
          )}

          <OrderSummaryFormSection
            control={control}
            defaultMembership={defaultMembership}
            promoCodeAppliedMembership={promoCodeAppliedMembership}
            promoCodeApplied={watchedPromoCode}
            isLoading={
              isMembershipPriceLoading ||
              isPatchingBusinnesLoading ||
              isGetPaymentTokenLoading ||
              isBusinessInfoLoading
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
              isPatchingBusinnesLoading ||
              isGetPaymentTokenLoading ||
              isBusinessInfoLoading ||
              errorToken.length > 0
            }
            type="submit"
            expand="block"
            shape="round"
          >
            Submit Upgrade
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

export default UpgradeBusinessPage;
