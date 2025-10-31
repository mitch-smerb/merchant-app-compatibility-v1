const termsUrl = `${process.env.VITE_PLINK_TERMS_URL}`;
const privacyUrl = `${process.env.VITE_PLINK_PRIVACY_URL}`;
const supportUrl = `${process.env.VITE_PLINK_SCHEDULE_CALL_URL}`;
const newsfeedFaqUrl = `${process.env.VITE_PLINK_NEWSFEED_FAQ_URL}`;
const collinsonAgreementUrl = `${process.env.VITE_COLLINSON_AGREEMENT_URL}`;
const forgotPasswordUrl = `${process.env.VITE_FORGOT_PASSWORD_URL}`;
const contactUsEmail = `${process.env.VITE_CONTACTUS_EMAIL}`;
const bankDemoBaseUrl = `${process.env.VITE_BANK_DEMO_BASE_URL}`;
const businessPortalUrl = `${process.env.VITE_BUSINESS_PORTAL_URL}`;
const apiBaseUrl = `${process.env.VITE_API_URL}`;

// Promo codes
export const PROMO_CODE_COLUMBIACU = `${process.env.VITE_PROMO_CODE_COLUMBIACU}`;

export const links = {
  terms: termsUrl,
  privacy: privacyUrl,
  support: supportUrl,
  newsfeedFaq: newsfeedFaqUrl,
  collinsonAgreement: collinsonAgreementUrl,
  forgotPassword: forgotPasswordUrl,
  bankDemoBaseUrl,
  businessPortalUrl,
  apiBaseUrl
};

export const routes = {
  home: '/home',
  reportsHome: '/reports/home',
  signup: '/signup',
  signupConfirmation: '/signup/confirmation',
  register: '/register',
  embedRegister: '/columbiacu',
  signupPfp: '/join',
  login: '/login',
  logout: '/logout',
  scan: '/scan',
  scanSimple: '/:entityId/scan',
  reportsLogin: '/reports/login',
  reportsHelp: '/reports/help',
  reportsCompanySummary: '/reports/company-summary',
  reportsRequestPasswordReset: '/reports/password-reset',
  reportsPasswordReset: '/reports/password-reset/:token',
  reportsSuccessMessage: '/reports/success',
  upgradeBusiness: '/upgrade/:token',
  upgradeSuccess: '/upgrade/success',
  areaAudience: '/area-audience',
  neighborhood: '/neighborhood',
  localShoppers: '/local-shoppers',
  incentives: '/incentives',
  billing: '/billing',
  whatsPlinkDemo: '/whats-plink',
  faq: '/faq',
  review: '/review',
  reviewAreaAudience: '/review/area-audience',
  reviewNeighborhood: '/review/neighborhood',
  reviewLocalShoppers: '/review/local-shoppers',
  reviewIncentives: '/review/incentives',
  reviewBilling: '/review/billing'
};

export const emails = {
  contactUs: contactUsEmail
};

export const shortDeviceMaxHeight = '570px';

