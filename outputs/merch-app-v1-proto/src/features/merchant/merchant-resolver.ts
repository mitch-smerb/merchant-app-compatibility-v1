import { ZapierPayload } from './merchant-types';

export const saveZapierMerchant = async (data: ZapierPayload, url: string) => {
  const merchantData = {
    ...data,
    loginDate: new Date().toString()
  };

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(merchantData)
  });

  if (!res.ok) {
    throw new Error('Error saving merchant data in Zapier');
  }
};
