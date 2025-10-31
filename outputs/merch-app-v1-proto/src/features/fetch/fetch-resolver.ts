import { useReducer } from 'react';
import { isEmpty } from 'lodash';
import {
  FetchReducer,
  GetFetchOptions,
  UseGetOptions,
  UseGetPayload,
  UsePostOptions,
  UsePostPayload,
  UseDeleteOptions,
  UseDeletePayload,
  UsePatchOptions,
  UsePatchPayload
} from './fetch-types';
import { fetchInitialState, fetchReducer } from './fetch-reducer';
import { doFetch, getHeaders, interpolate } from './fetch-helpers';
import { useAppState } from '@shared/AppContext';
// @ts-expect-error -- Path alias is correctly configured in tsconfig
import { BaseMap } from '@types/generic';

export const useGet = <T = any>(options: UseGetOptions): UseGetPayload<T> => {
  const {
    url,
    client,
    action,
    version,
    selector,
    paginated,
    initialParams = {},
    useSameCredentials
  } = options;

  if (paginated) {
    if (!initialParams.page || !initialParams.limit) {
      throw new Error(
        'Paginated resolvers must have "page" and "limit" initial params and must be managed by the component to avoid errors.'
      );
    }
  }

  const { dispatch: appDispatch, state: appState } = useAppState();
  const [fetchState, fetchDispatch] = useReducer<FetchReducer<T>>(
    fetchReducer,
    fetchInitialState
  );

  const doGet = async (
    _options: GetFetchOptions = { params: {} },
    extraHeaders?: any
  ): Promise<T> => {
    const combinedParams = {
      ...initialParams,
      ..._options.params
    };
    const intParamStr = `&${Object.keys(combinedParams)
      .map((k) => `${k}=:${k}`)
      .join('&')}`;

    // fetch data and return data from store
    const urlPrefix = version ? `${version}/` : '';
    const queryPrefix = url.includes('?') ? '&' : '?';
    const paginationQueryParams = `${queryPrefix}${intParamStr}`;
    const fullUrl =
      `${urlPrefix}` + `${url}` + `${paginated ? paginationQueryParams : ''}`;

    // getting cached data from app state
    const cachedData = paginated
      ? selector(appState, combinedParams).data
      : selector(appState, combinedParams);

    if (_options.refresh || isEmpty(cachedData)) {
      // Fetching data from B/E
      return doFetch(
        interpolate(fullUrl, combinedParams),
        {
          method: 'GET',
          headers: {
            ...getHeaders(appState),
            ...extraHeaders
          },
          ...(useSameCredentials ? { credentials: 'include' } : {})
        },
        appDispatch,
        fetchDispatch,
        action,
        client
      );
    }
    // Resolving with cached data
    return Promise.resolve(cachedData);
  };

  const { isLoading, error } = fetchState;

  return [{ isLoading, error, data: selector(appState, initialParams) }, doGet];
};

export const usePost = <D = any, T = any>(
  options: UsePostOptions<D>
): UsePostPayload<D, T> => {
  const { url, action, client, initialData, version, useSameCredentials } =
    options;

  const { state: appState } = useAppState();
  const { dispatch: appDispatch } = useAppState();
  const [fetchState, fetchDispatch] = useReducer<FetchReducer<T>>(
    fetchReducer,
    fetchInitialState
  );

  const urlPrefix = version ? `${version}/` : '';
  const fullUrl = `${urlPrefix}${url}`;

  const doPost = (data?: D, extraHeaders?: any) =>
    doFetch(
      fullUrl,
      {
        method: 'POST',
        headers: {
          "X-Frontend-Path": window.location.pathname,
          ...getHeaders(appState),
          ...extraHeaders,
        },
        body: JSON.stringify(data || initialData),
        ...(useSameCredentials ? { credentials: 'include' } : {})
      },
      appDispatch,
      fetchDispatch,
      action,
      client
    );

  return [fetchState, doPost];
};

export const useDelete = <T>(
  options: UseDeleteOptions<T>
): UseDeletePayload<T> => {
  const { url, action, client, version, initialParams } = options;

  const { dispatch: appDispatch, state: appState } = useAppState();
  const [fetchState, fetchDispatch] = useReducer<FetchReducer<T>>(
    fetchReducer,
    fetchInitialState
  );

  const urlPrefix = version ? `${version}/` : '';
  const fullUrl = `${urlPrefix}${url}`;

  const doDelete = (params: BaseMap = {}): Promise<any> =>
    doFetch(
      interpolate(fullUrl, { ...initialParams, ...params }),
      {
        method: 'DELETE',
        headers: getHeaders(appState)
      },
      appDispatch,
      fetchDispatch,
      action,
      client
    );

  return [fetchState, doDelete];
};

export const usePatch = <D = any, T = any>(
  options: UsePatchOptions<D>
): UsePatchPayload<D, T> => {
  const { url, action, client, initialData, version } = options;

  const { state: appState } = useAppState();
  const { dispatch: appDispatch } = useAppState();
  const [fetchState, fetchDispatch] = useReducer<FetchReducer<T>>(
    fetchReducer,
    fetchInitialState
  );

  const urlPrefix = version ? `${version}/` : '';
  const fullUrl = `${urlPrefix}${url}`;

  const doPatch = (data?: D, extraHeaders?: any) =>
    doFetch(
      fullUrl,
      {
        method: 'PATCH',
        headers: {
          ...getHeaders(appState),
          ...extraHeaders
        },
        body: JSON.stringify(data || initialData)
      },
      appDispatch,
      fetchDispatch,
      action,
      client
    );

  return [fetchState, doPatch];
};
