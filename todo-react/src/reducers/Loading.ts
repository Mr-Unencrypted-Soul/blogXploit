import { START_LOADING, STOP_LOADING } from '../actions/types';

export type Actions =
  | {
      type: typeof START_LOADING;
    }
  | {
      type: typeof STOP_LOADING;
    };

interface LoadingInterface {
  loading: boolean;
}

export type State = LoadingInterface;

export const initialState: State = {
  loading: false
};

export const Loading = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
