/* eslint-disable no-console */

import { rest } from 'msw';

const appApiUrl = process.env.VITE_API_URL;

export const testMerchant = {
  id: 9999,
  entityId: 10096,
  name: 'Test Merchant',
  category: 'restaurant',
  address: '123 N Pacific Ave',
  city: 'Malibu',
  state: 'CA',
  zipCode: '90404',
  phone: '5614337888',
  contactFirstName: 'Nino',
  contactLastName: 'Bobino',
  contactEmail: 'nino@email.com',
  contactPhone: '5614337888',
  createdAt: '2020-07-22 06:59:33',
  updatedAt: '2020-07-22 06:59:33'
};

export const testCompetitiveUpdates = {
  instanceId: 'c9b5e362-9115-46e6-a9ce-92a2eafb50fb',
  merchantId: 9999,
  radius: 10,
  competitiveUpdates: [
    {
      characterization: 'positive',
      code: '1a',
      id: 7,
      liked: false,
      publish: true,
      subtype: '',
      text: 'Your business ranks #2 among 262 competitors.',
      title: 'Ranking Update',
      type: 'Market Share',
      createdAt: '2021-13-09T20:05:55.000Z',
      updatedAt: '2021-13-09T20:05:55.000Z'
    },
    {
      characterization: 'negative',
      code: '2c',
      id: 8,
      liked: false,
      publish: true,
      subtype: '',
      text: 'Your business average transaction is around $9.65.',
      title: 'Pricing Update',
      type: 'Market Share',
      createdAt: '2021-12-09T20:05:55.000Z',
      updatedAt: '2021-12-09T20:05:55.000Z'
    },
    {
      characterization: 'neutral',
      code: '3b',
      id: 9,
      liked: false,
      publish: true,
      subtype: '',
      text: 'An estimated $1062.66 is spent with competitors in your area.',
      title: 'Competitor Update',
      type: 'Market Share',
      createdAt: '2021-11-09T20:05:55.000Z',
      updatedAt: '2021-11-09T20:05:55.000Z'
    }
  ]
};

const handlers = [
  rest.get(`${appApiUrl}/v2/merchants/9999`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ status: 'success', data: testMerchant })
    );
  }),

  rest.get(`${appApiUrl}/v2/merchants/9999/updates`, async (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({ status: 'success', data: testCompetitiveUpdates })
    );
  }),

  // fallback get request handler
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    );
  }),

  // fallback post request handler
  rest.post('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    );
  })
];

export { handlers };
