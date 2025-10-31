import { ActionCreator } from '@features/actions/actions-types';

export const queryActionTypes = {
  SET_QUERY: 'setQuery'
};

export const setQuery: ActionCreator = (payload) => ({
  type: queryActionTypes.SET_QUERY,
  payload
});
