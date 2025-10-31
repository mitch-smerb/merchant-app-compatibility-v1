import { actionsInitialState } from '@features/actions/actions-reducer';
import { queryInitialState } from '@features/query/query-reducer';

export const initialState = {
  actions: actionsInitialState(),
  query: queryInitialState()
};

export type AppState = typeof initialState;
