// Reference: https://developer.elavon.com/na/docs/converge/1.0.0/integration-guide/integration_methods/checkoutjs/checkoutjsref

type Callback = {
  // An Error happened during transaction processing.
  // Checkout JS will expire session tokens after 5 declines and return an error. The user should write the onError function in their callback object to initiate a new session token to avoid failed transactions.
  onError?: (error: any) => void;
  // The Transaction declined, responseFields contains fields returned by Converge.
  onDeclined?: (responseFields: any) => void;
  // Transaction approved, responseFields contains fields returned by Converge.
  onApproval?: (responseFields: any) => void;
  // For Digital Wallets only. Customer cancelled transaction.
  onCancelled?: (responseFields: any) => void;
  // DCC eligible, responseFields contains DCC related fields,
  // merchant should show DCC option, call ConvergeEmbeddedPayment.dccDecision base on customer selection
  onDCCDecision?: (responseFields: any) => void;
  // 3D Secure eligible, responseFields contains 3D Secure related fields,
  // merchant redirect page to 3D 3Secure web site using URL in responseFields,
  // When 3D Secure redirect back to merchant, retrieve response parmaeters and call ConvergeEmbeddedPayment.threeDSecureReturn
  onThreeDSecure?: (responseFields: any) => void;
};

type PayMethod = (
  paymentFields: { [key: string]: string },
  callback: Callback
) => void;

const getConverge = () => {
  if (!(window as any).ConvergeEmbeddedPayment) {
    throw new Error("Converge's Checkout.js cannot be found");
  }

  return (window as any).ConvergeEmbeddedPayment;
};

export const sendPaymentInformation = (paymentData: any) => {
  const converge = getConverge();
  const promise = new Promise((res: (resFields: any) => void, rej) => {
    (converge.pay as PayMethod)(paymentData, {
      onError: rej,
      onDeclined: rej,
      onApproval: res
    });
  });
  return promise;
};

type GetCreditCardTokenParams = {
  paymentToken: string;
  paymentId: string;
  amount: string;
  holderFirstName: string;
  holderLastName: string;
  cardNumber: string;
  securityCode: string;
  expirationDate: string;
  zipCode: string;
  businessName: string;
};

export const getCreditCardToken = async ({
  paymentToken,
  paymentId,
  amount,
  holderFirstName,
  holderLastName,
  cardNumber,
  securityCode,
  expirationDate,
  zipCode,
  businessName
}: GetCreditCardTokenParams) => {
  try {
    const response = await sendPaymentInformation({
      ssl_transaction_type: 'CCGETTOKEN',
      ssl_txn_auth_token: paymentToken,
      ssl_company: businessName,
      ssl_first_name: holderFirstName,
      ssl_last_name: holderLastName,
      ssl_card_number: cardNumber,
      ssl_exp_date: expirationDate, // format: MMYY
      ssl_cvv2cvc2_indicator: '1',
      ssl_cvv2cvc2: securityCode,
      ssl_avs_zip: zipCode,
      ssl_amount: amount,
      fanbank_payment_id: paymentId
    });

    return {
      cardToken: response.ssl_token
    };
  } catch (e) {
    throw new Error(
      'Failed to generate card token. Please check your card information and try again'
    );
  }
};
