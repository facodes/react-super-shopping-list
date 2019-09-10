import {
  SET_LOADING, SET_APP_INIT,SET_USER_LOGGED, SET_SHOPPINGLIST, SET_SHOPPINGLIST_SELECTED,
}from './types'

import {loadUser} from './auth'

export const initApp = () => {
  return async (dispatch, getState) => { 
    const token = getState().control.authToken;
    if (token){
      await dispatch(loadUser(token));
      dispatch(setUserLogged(true));
    }
    setTimeout(() => {
      dispatch(setIsAppInit(true));
    }, 1000);
  }
}

export const selectShoppingList = (shoppingList) => {
  return dispatch => {

    if (shoppingList){
      dispatch({
        type:SET_SHOPPINGLIST,
        payload:{shoppingList}
      });
      dispatch(setShoppingListSelected(true));
    }else{
      dispatch({
        type:SET_SHOPPINGLIST,
        payload:{shoppingList}
      });
      dispatch(setShoppingListSelected(false));
    }
  }
}



export const setUserLogged = () => {
  return dispatch => {
    dispatch({
      type: SET_USER_LOGGED,
      payload:{value:true}
    });
  }
}

export const setShoppingListSelected = value => {
  return dispatch => {
    dispatch({
      type:SET_SHOPPINGLIST_SELECTED,
      payload:{value}
    })
  }
}


export const setIsAppInit = (value) => {
  return dispatch => {
    dispatch({type:SET_APP_INIT,payload:{value}});
  }
}

export const setLoading = (value) => {  
  return dispatch => {
    dispatch({
      type: SET_LOADING,
      payload:{value}
    });
  }
}
