import { Reducer } from 'react';
// @ts-expect-error -- Path alias is correctly configured in tsconfig
import { BaseMap } from '@types/generic';
import { AppState } from '@shared/state';
import { ActionCreator } from '@features/actions/actions-types';

export interface FetchState {
  isLoading: boolean;
  error: any;
}

// eslint-disable-next-line
export type FetchAction<T> =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: FetchState }
  | { type: 'FETCH_ERROR'; payload: FetchState['error'] };

export type FetchReducer<T = any> = Reducer<FetchState, FetchAction<T>>;

export type FetchError = {
  errorCode: string;
  message: string;
  statusCode: number;
};

export interface GetFetchOptions {
  refresh?: boolean;
  params?: BaseMap;
}

export interface UseResolverOptions {
  // Resource URI
  url: string;
  // Success Action Creator
  action?: ActionCreator | ActionCreator[];
  // API Version
  version?: 'v1' | 'v2';
  // Client
  client?: string;
}

export interface UseGetOptions extends UseResolverOptions {
  // Paginated Endpoint Flag
  paginated?: boolean;
  // Initial Params
  initialParams?: any;
  // Cache Selector
  selector: (state: AppState, params?: any) => any;
  // Pass cookies to the request
  useSameCredentials?: boolean;
}

export interface UseGetPayload<T = any>
  extends Array<
    | ({ data: T } & FetchState)
    | ((options?: GetFetchOptions) => Promise<T | FetchError>)
  > {
  0: {
    data: T;
  } & FetchState;
  1: (options?: GetFetchOptions, extraHeaders?: any) => Promise<T | FetchError>;
}

export interface UsePostOptions<D = any> extends UseResolverOptions {
  initialData?: D;
  useSameCredentials?: boolean;
}

export interface UsePostPayload<D = any, T = any>
  extends Array<FetchState | ((data?: D) => Promise<T | FetchError>)> {
  0: FetchState;
  1: (data?: D, extraHeaders?: any) => Promise<T | FetchError>;
}

export interface UseDeleteOptions<T = any> extends UseResolverOptions {
  initialParams?: T;
}

export interface UseDeletePayload<T = any>
  extends Array<FetchState | ((params?: BaseMap) => Promise<T | FetchError>)> {
  0: FetchState;
  1: (params?: BaseMap) => Promise<T | FetchError>;
}

export interface UsePatchOptions<D = any> extends UseResolverOptions {
  initialData?: D;
}

export interface UsePatchPayload<D = any, T = any>
  extends Array<FetchState | ((data?: D) => Promise<T | FetchError>)> {
  0: FetchState;
  1: (data?: D, extraHeaders?: any) => Promise<T | FetchError>;
}
