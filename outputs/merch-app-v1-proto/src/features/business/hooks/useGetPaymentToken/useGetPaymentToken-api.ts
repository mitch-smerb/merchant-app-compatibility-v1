import { api } from "@/api/api-client";

const paymentTokenURL = '/v2/businesses/registration/payment-token';

export const getPaymentToken = async (useDynamicPricing: boolean = false) => {
  const response = await api.get(paymentTokenURL,
    {
      params: {
        useDynamicPricing
      }
    }
  )

  return response.data;
}
