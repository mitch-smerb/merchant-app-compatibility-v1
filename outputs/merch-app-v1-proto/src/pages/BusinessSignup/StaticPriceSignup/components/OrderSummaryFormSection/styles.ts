import { IonSpinner } from '@ionic/react';
import styled from 'styled-components';
import { colors } from '@pages/BusinessSignup/styles';

export const OrderSummaryContainer = styled.div`
  margin: 25px -35px 30px;
  padding: 35px;
  background-color: ${colors.neutral[90]};

  @media only screen and (max-width: 755px) {
    margin: 25px -30px 30px;
    padding: 30px;
  }
`;

export const OrderSummaryTitle = styled.p`
  color: ${colors.neutral[40]};
  font-size: 20px;
  font-family: 'Montserrat Bold';
  margin: 0 0 25px;
`;

export const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  :not(:last-child) {
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 755px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const OrderItemLabel = styled.p`
  color: ${colors.neutral[40]};
  font-size: 18px;
  font-family: 'Montserrat Bold';
  margin: 0;

  @media only screen and (max-width: 755px) {
    margin-bottom: 3px;
  }
`;

export const OrderItemValue = styled.p`
  color: ${colors.neutral[40]};
  font-size: 20px;
  font-family: 'Open Sans SemiBold';
  margin: 0;
`;

export const OrderItemSuccessValue = styled(OrderItemValue)`
  color: ${colors.helpers.success[20]};
`;

export const PromoCodeLoader = styled(IonSpinner)`
  margin-left: auto;
  margin-right: 25px;

  @media only screen and (max-width: 755px) {
    margin: 0;
    position: absolute;
    left: 200px;
    top: -5px;
  }
`;

export const PromoCodeNote = styled.p`
  color: ${colors.neutral[35]};
  font-size: 14px;
  font-family: 'Open Sans Italic';

  position: absolute;
  right: 0;
  bottom: -15px;
  margin: 0;

  @media only screen and (max-width: 755px) {
    right: unset;
    left: 0;
  }
`;
