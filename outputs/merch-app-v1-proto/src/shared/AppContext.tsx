import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { AppState, initialState } from './state';
import { useAuthTokenStore } from '@/features/auth/hooks';

// @ts-expect-error -- Path alias is correctly configured in tsconfig
import { DeepPartial } from '@types/generic';

export interface AppContextInterface {
  state: AppState;
  dispatch: (callback: any) => void;
}

export interface AppContextProviderProps {
  state?: DeepPartial<AppState>;
  children: React.ReactNode;
}

const persistedState = window.localStorage.persistedState
  ? JSON.parse(window.localStorage.persistedState)
  : {};

export const AppContext = createContext<AppContextInterface>({
  // TODO: use initialState instead of an empty object
  state: {} as AppState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {}
});

export const AppContextProvider = ({
  state: propsState,
  children
}: AppContextProviderProps) => {
  const combinedState = {
    ...initialState,
    ...persistedState,
    ...propsState
  } as AppState;

  const [state, dispatch] = useReducer(reducer, combinedState);

  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppState = (): AppContextInterface => {
  return useContext(AppContext);
};
