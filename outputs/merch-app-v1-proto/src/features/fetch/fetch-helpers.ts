import { FetchError } from './fetch-types';

type FetchAction = (payload: any) => { type: string; payload?: any };

export const doFetch = async <T>(
  url: string,
  config: any,
  appDispatch: any,
  fetchDispatch: any,
  successAction?: FetchAction | FetchAction[],
  client?: string
): Promise<any | FetchError> => {
  // TODO: attach headers here instead of resolvers.
  const clientUrlMapping: { [key: string]: string | undefined } = {
    tokenService: process.env.VITE_TOKEN_SERVICE_URL
  };
  try {
    fetchDispatch({ type: 'FETCH_START' });
    const clientUrl = client
      ? clientUrlMapping[client]
      : process.env.VITE_API_URL;

    const response = await fetch(`${clientUrl}/${url}`, config);
    const rawResult = {
      ...(await response.json()),
      statusCode: response.status
    };

    if (response.ok) {
      const result =
        rawResult.status === 'success' ? rawResult.data || true : rawResult;
      if (successAction) {
        if (Array.isArray(successAction)) {
          successAction.forEach((action) => appDispatch(action(result)));
        } else {
          appDispatch(successAction(result));
        }
      }

      fetchDispatch({
        type: 'FETCH_SUCCESS',
        payload: result as unknown as T
      });

      return result;
    }

    throw rawResult;
  } catch (e) {
    const error = e as any;

    let code;
    let message;
    let statusCode;

    // this type of error will usually be an API error ie. Collinson
    if ('error' in error) {
      const { error: APIError } = error;

      code = APIError.code;
      message = APIError.message;
      statusCode = APIError.statusCode;
    } else {
      code = error.code;
      message = error.message;
      statusCode = error.statusCode;
    }

    const errorObject = {
      errorCode: code || 'DEFAULT_ERROR_CODE',
      message,
      statusCode
    };
    fetchDispatch({
      type: 'FETCH_ERROR',
      payload: errorObject
    });

    return errorObject;
  }
};

export const getHeaders = (appState: any) => {
  return {
    'Content-Type': 'application/json',
    Authorization: appState.auth?.id || appState.reportsAuth?.id || ''
  };
};

export const interpolate = (url: string, params: any) => {
  // Replace param key values in url (e.g. :id => 123)
  // Remove params whem key values are undefined
  return Object.keys(params).reduce((prev, i) => {
    return params[i] !== undefined
      ? prev.replace(new RegExp(`:${i}`, 'g'), params[i])
      : prev.replace(new RegExp(`(&|\\?)([^&]*)(:${i})(&|$)`, 'g'), '$1');
  }, url);
};
