import { api } from '@/api/api-client';
// Types
import {  PaginatedResponseDefault } from '@/api/api-types';
import { Business } from '../../businesses-types';

const getBusinessesURLs = {
  get: '/v2/businesses',
}

export const fetchBusinesses = async (page: number, limit: number, query: string) => {
  const response = await api.get<PaginatedResponseDefault<Business[]>>(
    getBusinessesURLs.get,
    {
      params: {
        page,
        limit,
        query
      }
    }
  );

  return response.data?.data;
};
