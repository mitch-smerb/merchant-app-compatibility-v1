import { faker } from '@faker-js/faker';
import { interpolate } from './fetch-helpers';

describe('interpolate', () => {
  const sut = interpolate;
  const url = 'v2/foo/bar?exampleId=:id&value=:value&item=:itemName';
  let params: {
    id: number | undefined;
    value: string | undefined;
    itemName: string | undefined;
  };

  beforeEach(() => {
    params = {
      id: faker.datatype.number(),
      value: faker.commerce.price(),
      itemName: faker.commerce.productName()
    };
  });

  describe('valid key value', () => {
    it('replaces query param key values', () => {
      const result = sut(url, params);

      expect(result).toEqual(
        `v2/foo/bar?exampleId=${params.id}&value=${params.value}&item=${params.itemName}`
      );
    });
  });

  describe('undefined key value', () => {
    it('removes first query param', () => {
      params.id = undefined;

      const result = sut(url, params);

      expect(result).toEqual(
        `v2/foo/bar?value=${params.value}&item=${params.itemName}`
      );
    });

    it('removes middle query param', () => {
      params.value = undefined;

      const result = sut(url, params);

      expect(result).toEqual(
        `v2/foo/bar?exampleId=${params.id}&item=${params.itemName}`
      );
    });

    it('removes last query param', () => {
      params.itemName = undefined;

      const result = sut(url, params);

      expect(result).toEqual(
        `v2/foo/bar?exampleId=${params.id}&value=${params.value}&`
      );
    });

    it('removes all query params', () => {
      params.id = undefined;
      params.value = undefined;
      params.itemName = undefined;

      const result = sut(url, params);

      expect(result).toEqual(`v2/foo/bar?`);
    });
  });
});
