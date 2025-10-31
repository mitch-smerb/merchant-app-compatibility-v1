import { v4 as uuid } from 'uuid';
import * as Sentry from '@sentry/react';
import { ZapierSignupPayload } from './business-types';
import { maskMapping } from '@shared/form-helper';

export const saveZapierBusiness = async ({
  businessName,
  corporateName,
  email,
  firstName,
  lastName,
  phone,
  promoCode,
  zipCode
}: ZapierSignupPayload) => {
  try {
    const zapierBusinessDataHookUrl =
      process.env.VITE_ZAPIER_BUSINESS_DATA_HOOK_URL;

    if (!zapierBusinessDataHookUrl) {
      throw new Error(
        'VITE_ZAPIER_BUSINESS_DATA_HOOK_URL env var is not defined.'
      );
    }

    const businessData = {
      id: uuid(),
      businessName,
      corporateName,
      email,
      firstName,
      lastName,
      phone: maskMapping.phone(phone),
      promoCode,
      zipCode,
      createdAt: new Date().toString(),
      enrolled: true
    };

    if (process.env.VITE_SENTRY_DSN) {
      Sentry.setContext('Zapier Request', {
        zapierUrl: zapierBusinessDataHookUrl,
        ...businessData
      });
    }

    const res = await fetch(zapierBusinessDataHookUrl, {
      method: 'POST',
      body: JSON.stringify(businessData)
    });

    if (!res.ok) {
      if (process.env.VITE_SENTRY_DSN) {
        Sentry.setContext('Zapier Response', {
          responseStatusCode: res.status,
          ...res.body
        });
      }
      throw new Error('Error creating business in Zapier');
    }
  } catch (err) {
    console.log('Zapier error', err);
    if (process.env.VITE_SENTRY_DSN) {
      Sentry.captureException(err);
    }
  }
};
