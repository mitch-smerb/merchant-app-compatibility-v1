import { isEmpty } from 'lodash';
import { useQuery } from '@utils/hooks';
import { useAppState } from '@shared/AppContext';
import { setQuery } from './query-actions';

export const useURLQuery = () => {
  const query = useQuery();
  const { state, dispatch } = useAppState();
  return {
    storeURLQuery: () => {
      // stores URL search query params in the app state if exist.
      if (!isEmpty(query)) {
        dispatch(setQuery(query));
      }
      return query;
    },
    // selecting URL search query params from app state.
    readURLQueryFromAppState: () => state.query
  };
};
export const test = 'test';
