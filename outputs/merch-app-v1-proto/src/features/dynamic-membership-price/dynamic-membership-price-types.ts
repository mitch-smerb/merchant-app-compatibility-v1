export type DynamicMembershipPrice = {
  merchantMaxCardholderAudience: number;
  monthly: {
    min: {
      total: number;
    };
    max: {
      perCardholder: number;
      total: number;
    };
  };
};
