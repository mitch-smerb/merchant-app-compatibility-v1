import { Action } from './actions-types';

export const actionsInitialState = () => [] as Action[];

export const actionsReducer = (
  state = actionsInitialState(),
  action: Action
): any => {
  switch (action.type) {
    default:
      return [...state, action];
  }
};
