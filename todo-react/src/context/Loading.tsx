import React, { useReducer, createContext } from 'react';

import { Loading, Actions, State as InitialStateType, initialState } from '../reducers/Loading';

export const LoadingContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

interface Props {
  children: React.ReactNode;
}

export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(Loading, initialState as never);
  const value = { state, dispatch };
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};
