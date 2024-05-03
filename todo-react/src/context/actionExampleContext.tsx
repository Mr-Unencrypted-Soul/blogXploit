import React, { useReducer, createContext } from 'react';

import { actionExampleReducer, Actions, State as InitialStateType, initialState } from '../reducers/actionExample';

export const actionExampleContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null
});

interface Props {
  children: React.ReactNode;
}

export const ActionExampleContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(actionExampleReducer, initialState as never);
  const value = { state, dispatch };
  return <actionExampleContext.Provider value={value}>{children}</actionExampleContext.Provider>;
};
