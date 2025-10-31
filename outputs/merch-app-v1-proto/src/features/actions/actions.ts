import { ActionCreator } from './actions-types';

export const actionTypes = {
  CLEAR_STATE: 'clearState'
};

export const clearState: ActionCreator = () => ({
  type: actionTypes.CLEAR_STATE
});
