import axios from 'axios';
import { links } from '@/shared/constants';
import { useReportsAuthStore } from '@/features/reports-auth/hooks';
import { useAuthTokenStore } from '@/features/auth/hooks';

export const api = axios.create({
  baseURL: links.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const auth = useAuthTokenStore.getState().authToken;
  const reportsAuth = useReportsAuthStore.getState().auth;

  if (auth || reportsAuth) {
    config.headers['Content-Type'] = ' application/json'
    config.headers['Authorization'] = auth?.id || reportsAuth?.id;
  }
  return config;
});
