import { START_LOADING, STOP_LOADING } from '../actions/types';
import { Actions } from '../reducers/Loading';

export const startLoading = (dispatch: React.Dispatch<Actions>) => {
  dispatch({
    type: START_LOADING
  });
};

export const stopLoading = (dispatch: React.Dispatch<Actions>) => {
  dispatch({
    type: STOP_LOADING
  });
};
