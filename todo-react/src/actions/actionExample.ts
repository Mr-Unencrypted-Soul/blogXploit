import axios from 'axios';
import { startLoading, stopLoading } from '../actions/Loading';
import { Actions as LoadingActions } from '../reducers/Loading';
import { actionExampleBaseUrl } from './serverConnection';

import { Actions, IactionExampleTwoReducerProps } from '../reducers/actionExample';

import { ACTION_EXAMPLE, ACTION_EXAMPLE_ERROR, ACTION_EXAMPLE_TWO } from './types';

export interface IactionExampleProps {
  emailId: string;
  password: string;
}

export const actionExampleAction = ({ data }: { data: IactionExampleProps }) =>
  async (
    dispatch: React.Dispatch<Actions>,
    loadingDispatch: React.Dispatch<LoadingActions>
  ) => {
    try {
      startLoading(loadingDispatch);
      // const result = await axios.post(`${actionExampleBaseUrl}/api/user/signup`, data);
      // result.data --> to get the api response
      const result = { 
        emailId: "string",
        userId: "string",
      }
      dispatch({
        type: ACTION_EXAMPLE,
        payload: result as any
      });
      stopLoading(loadingDispatch);
    } catch (err: any) {
      stopLoading(loadingDispatch);
      dispatch({
        type: ACTION_EXAMPLE_ERROR,
        payload: err?.response?.data?.message ?? err?.message ?? 'Error'
      });
    }
  };

export const setActionExampleTwo = (
  dispatch: React.Dispatch<Actions>,
  data: IactionExampleTwoReducerProps
) => {
  dispatch({
    type: ACTION_EXAMPLE_TWO,
    payload: data
  });
}
