/* eslint-disable no-shadow */
import { Business } from '@features/businesses/businesses-types';
import { MerchantInfo } from '@/pages/BusinessSignup/types';

export type ZapierSignupPayload = {
  businessName: string;
  corporateName: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  promoCode: string;
  zipCode: string;
};

export enum NotVerifiedLocalSource {
  ParentAggregatedMerchant = 'parent_aggregated_merchant',
  MerchantKWFilterPatternNotNull = 'merchant_keyword_filter_pattern_not_null',
  BrandTaggedTransaction = 'brand_tagged_transaction',
  NotInTargetLead = 'not_in_target_lead',
  OutOfBusinessEntity = 'out_of_business_lead',
  InvalidBusinessSize = 'invalid_business_size'
}

export enum VerifiedLocalSource {
  ClaimedBusiness = 'claimed_business',
  InTargetLead = 'in_target_lead',
  MasterCardData = 'mastercard_data'
}

export type VerifiedLocal =
  | {
      is: true;
      source: VerifiedLocalSource;
    }
  | {
      is: false;
      source: NotVerifiedLocalSource;
    };

export type Store = {
  id: number;
  businessId: number;
  collinsonLocationId?: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  hoursOpen: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  neighborhood: string;
  files: { [key: string]: string };
  localized: { [key: string]: string };
  websiteUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  latitude: number;
  longitude: number;
  isStorefront: boolean;
  timezone: string;
  vendorId: number;
  campaignSetId: number;
  categoryId?: number;
  categoryName?: string;
  subcategoryId?: number;
  subcategoryName?: string;
  address: string;
  logo?: string;
  isSponsor: boolean;
  acceptsVisa?: boolean;
  acceptsMasterCard?: boolean;
  acceptsAmericanExpress?: boolean;
  internallyRegistered: boolean;
  isVerifiedLocal: boolean | null;
  verifiedLocalSource?: VerifiedLocal['source'] | null;
};

export type BusinessWithDetails = {
  business: Omit<Business, 'createdAt'> & {
    corporateName: string | null;
    slug: string | null;
    primaryEmail: string;
    contactPhone: string;
    collinsonId: string | null;
    acceptedTerms: number | null;
    lastLoginOn: string | null;
    customerIoId: string | null;
    businessWideOffers: boolean;
  };
  payment: {
    paymentMethod: string | null;
    purchaseTotal: string | null;
    promoCode: {
      name: string;
      type: string;
      value: string;
    } | null;
  };
  stores: Store[];
};


export type RegistrationInProgressDataPayload = MerchantInfo & {
  cioId: string | string[];
  isPayForPerformance?: boolean;
  promoCode?: string | string[] | null;
  accessToken?: string;
}

export type UpgradePayload = any;
