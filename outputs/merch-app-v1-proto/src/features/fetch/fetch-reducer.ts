import { FetchState, FetchReducer } from './fetch-types';

export const fetchInitialState: FetchState = {
  isLoading: false,
  error: null
};

// IMPORTANT: this reducer is not a part of the app state, we create a new reducer instance for each request
// See useGet(), usePost(), and useDelete() hooks in fetch-resolver.ts file.
export const fetchReducer: FetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START': {
      return { isLoading: true, error: null };
    }
    case 'FETCH_SUCCESS': {
      return {
        isLoading: false,
        error: null
      };
    }

    case 'FETCH_ERROR': {
      return { isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
