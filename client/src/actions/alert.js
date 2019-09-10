import { SHOW_ALERT, CLEAR_ALERT } from './types';

export const showAlert = (payload) => {
  return dispatch => {
    dispatch({
      type:SHOW_ALERT,
      payload,
    })
  }
}

export const clearAlert = () => {
  return dispatch => {
    dispatch({
      type:CLEAR_ALERT
    })
  }
}

