import { ParsedQuery } from 'query-string';
import { queryActionTypes } from './query-actions';
import { actionTypes } from '@features/actions/actions';
import { Action } from '@features/actions/actions-types';

export const queryInitialState = () => ({} as ParsedQuery);

export const queryReducer = (
  state = queryInitialState(),
  action: Action<ParsedQuery>
) => {
  switch (action.type) {
    case queryActionTypes.SET_QUERY: {
      return action.payload;
    }
    case actionTypes.CLEAR_STATE: {
      return queryInitialState();
    }
    default:
      return state;
  }
};
