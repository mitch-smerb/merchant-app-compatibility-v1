import { FetchError } from '@features/fetch/fetch-types';

const supportEmail = process.env.VITE_PLINK_SUPPORT_EMAIL;

const messagesByErrorId: { [key: string]: string } = {
  DEFAULT_ERROR_CODE: `There was a problem processing your request. Please contact us at ${supportEmail}.`
};

export const parseAPIError = (errorMessage: string, errorCode?: string): string => {
  if (!errorCode) return messagesByErrorId.DEFAULT_ERROR_CODE;

  return messagesByErrorId[errorCode] || errorMessage;
};
