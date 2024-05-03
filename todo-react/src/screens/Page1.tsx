import React, { useContext, useEffect } from 'react';
import { LoadingContext } from '../context/Loading';
import { actionExampleContext } from '../context/actionExampleContext';
import { actionExampleAction, setActionExampleTwo } from '../actions/actionExample';

const Page1 = () => {
  const { state: loadingState, dispatch: loadingDispatch } = useContext(LoadingContext);
  const { state: actionExampleState, dispatch: actionExampleDispatch } = useContext(actionExampleContext);
  console.log('actionExampleState: ', actionExampleState);

  return (
    loadingState.loading ?
    <div>loading</div>
    :
    <div>
      Page1
      {/* since i am not using data, i have just mocked it inside action */}
      <div onClick={()=>{actionExampleAction({data: 1 as any})(actionExampleDispatch, loadingDispatch)}}>
        context1
      </div>
      <div onClick={()=>{setActionExampleTwo(actionExampleDispatch, {emailId2: 'hello', userId2: 'world'})}}>
        context2
      </div>
    </div>
  )
}

export default Page1