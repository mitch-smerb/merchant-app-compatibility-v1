import { BaseMap } from '../types/generic'
import { AppState, initialState } from './state';
import { Action } from '@features/actions/actions-types';
import { actionsReducer } from '@features/actions/actions-reducer';
import { queryReducer } from '@features/query/query-reducer';

export function combineReducers(reducers: BaseMap<Reducer>) {
  return (state: AppState = initialState, action: Action<never>) => {
    const newState: Partial<AppState> = {};
    for (const key in reducers) {
      // guarding against unnecessary prototype field iterations
      // see: https://eslint.org/docs/rules/guard-for-in
      if (Object.prototype.hasOwnProperty.call(reducers, key)) {
        newState[key as keyof AppState] = reducers[key](
          state[key as keyof AppState],
          action
        );
      }
    }
    return newState as AppState;
  };
}

export const reducer = combineReducers({
  actions: actionsReducer,
  query: queryReducer
});

export type Reducer<T = any> = (state: T, action: Action<never>) => T;
