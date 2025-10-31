import React from 'react';
import {
  OrderItem,
  OrderItemLabel,
  OrderItemValue,
  OrderSummaryContainer,
  OrderSummaryTitle
} from '@pages/BusinessSignup/StaticPriceSignup/components/OrderSummaryFormSection/styles';
import { DynamicPricingExplainer } from './styles';
import { getPrettyNumber } from '@utils/format';

interface OrderSummaryFormSectionProps {
  maxCardholderAudience: number | undefined;
  initialMembershipValue: number | undefined;
  finalMembershipValue: number | undefined;
  perCardholderMaxMonthlyCost: number | undefined;
}

const OrderSummaryFormSection: React.FC<OrderSummaryFormSectionProps> = ({
  maxCardholderAudience,
  initialMembershipValue,
  finalMembershipValue,
  perCardholderMaxMonthlyCost
}) => (
  <OrderSummaryContainer>
    <OrderSummaryTitle>Order Summary</OrderSummaryTitle>
    <OrderItem>
      <OrderItemLabel>Plink Membership Price</OrderItemLabel>
      <OrderItemValue>
        ${getPrettyNumber(finalMembershipValue)}
        /mo
      </OrderItemValue>
    </OrderItem>
    <OrderItem>
      <OrderItemLabel>Your Price Today</OrderItemLabel>
      <OrderItemValue>
        ${getPrettyNumber(initialMembershipValue)}/mo
      </OrderItemValue>
    </OrderItem>
    <DynamicPricingExplainer>
      The standard Plink package is ${getPrettyNumber(finalMembershipValue)} per
      month, which gives you an audience of {maxCardholderAudience} cardholders
      - a cost of ${perCardholderMaxMonthlyCost?.toFixed(2)} per cardholder. To
      turn on Plink costs only ${getPrettyNumber(initialMembershipValue)} today,
      then the monthly cost increases as your Plink audience grows. You&apos;ll
      be charged the full ${getPrettyNumber(finalMembershipValue)} per month
      only once your audience has reached {maxCardholderAudience} verified
      spenders.
    </DynamicPricingExplainer>
  </OrderSummaryContainer>
);

export default OrderSummaryFormSection;
