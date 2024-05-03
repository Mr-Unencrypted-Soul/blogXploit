import { ACTION_EXAMPLE, ACTION_EXAMPLE_TWO, ACTION_EXAMPLE_ERROR } from '../actions/types';

export interface IactionExampleReducerProps {
  emailId: string;
  userId: string;
}
export interface IactionExampleTwoReducerProps {
  emailId2: string;
  userId2: string;
}

export type Actions =
  | {
      type: typeof ACTION_EXAMPLE;
      payload: IactionExampleReducerProps;
    }
  | {
      type: typeof ACTION_EXAMPLE_TWO;
      payload: IactionExampleTwoReducerProps;
    }
  | {
      type: typeof ACTION_EXAMPLE_ERROR;
      payload: string;
    };

interface IsignUp {
  actionExample: IactionExampleReducerProps;
  actionExampleError: string;
  actionExample2: IactionExampleTwoReducerProps;
}

export type State = IsignUp;

export const initialState: State = {
  actionExample: {} as IactionExampleReducerProps,
  actionExample2: {} as IactionExampleTwoReducerProps,
  actionExampleError: ''
};

export const actionExampleReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ACTION_EXAMPLE:
      return {
        ...state,
        actionExample: action.payload,
        actionExampleError: ''
      };
    case ACTION_EXAMPLE_TWO:
      return {
        ...state,
        actionExample2: action.payload,
      };
    case ACTION_EXAMPLE_ERROR:
      return {
        ...state,
        actionExampleError: action.payload,
        actionExample: {}
      };
    default:
      return state;
  }
};
