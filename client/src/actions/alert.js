import { SHOW_ALERT, CLEAR_ALERT } from './types';

export const showAlert = (payload) => {
  return (dispatch, getState) => {


    if (getState().alert.timeoutId){
      dispatch({
        type:CLEAR_ALERT
      })
    }

    const timeoutId = setTimeout(() => {
      dispatch({
        type:CLEAR_ALERT
      });
    }, 4000);

    payload.timeoutId = timeoutId; // adding property to payload

    dispatch({
      type:SHOW_ALERT,
      payload,
    });

   
  }
}

export const clearAlert = () => {
  return (dispatch, getState) => {

    clearTimeout(getState().alert.timeoutId);
    dispatch({
      type:CLEAR_ALERT
    })
  }
}

