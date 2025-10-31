export type MembershipPrice = {
  monthlyTotalPrice: number;
  monthlyPerStorePrice: number;
};

export type MembershipPriceRequest = {
  default: MembershipPrice;
  promoCodeApplied?: MembershipPrice;
};
