import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { MembershipPrice } from '@/features/membership-price/membershipPrice-types';
import {
  OrderItem,
  OrderItemLabel,
  OrderItemSuccessValue,
  OrderItemValue,
  OrderSummaryContainer,
  OrderSummaryTitle,
  PromoCodeLoader,
  PromoCodeNote
} from './styles';
import { FormValues } from '@pages/BusinessSignup/types';
import PromoCodeInput from '@pages/BusinessSignup/components/PromoCodeInput';

interface OrderSummaryFormSectionProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<FormValues, object>;
  defaultMembership: MembershipPrice | undefined;
  promoCodeAppliedMembership: MembershipPrice | undefined;
  promoCodeApplied: string | undefined;
  isLoading: boolean;
  hasError: boolean;
}

const OrderSummaryFormSection: React.FC<OrderSummaryFormSectionProps> = ({
  control,
  defaultMembership,
  promoCodeAppliedMembership,
  promoCodeApplied,
  isLoading,
  hasError
}) => (
  <OrderSummaryContainer>
    <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
    <OrderItem>
      <OrderItemLabel>Plink Membership Price</OrderItemLabel>
      <OrderItemValue>
        ${defaultMembership?.monthlyTotalPrice?.toFixed(2)}/mo
      </OrderItemValue>
    </OrderItem>
    <OrderItem>
      <OrderItemLabel>Apply Promo Code</OrderItemLabel>
      {isLoading && <PromoCodeLoader name="lines" />}
      <Controller
        render={({ field: { onChange, name, value } }) => (
          <PromoCodeInput
            name={name}
            onChange={onChange}
            disabled={isLoading}
            value={value}
          />
        )}
        control={control}
        name="billingInfo.promoCode"
        rules={{ required: true }}
      />
    </OrderItem>
    <OrderItem>
      <OrderItemLabel>Your Price</OrderItemLabel>
      <OrderItemValue>
        {!hasError && promoCodeAppliedMembership && (
          <>
            <OrderItemSuccessValue>
              ${promoCodeAppliedMembership.monthlyTotalPrice.toFixed(2)}
              /mo
            </OrderItemSuccessValue>
            <PromoCodeNote>Promo code {promoCodeApplied} applied</PromoCodeNote>
          </>
        )}
      </OrderItemValue>
    </OrderItem>
  </OrderSummaryContainer>
);

export default OrderSummaryFormSection;
