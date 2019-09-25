import { UPDATE_SHOPPINGLISTS } from '../actions/types'
import {
  URL
} from '../API'

import { setLoading, selectShoppingList, setShoppingListSelected } from './control'

export const addNewShoppingList = (payload) => {
   return async (dispatch, getState) => {
      dispatch(setLoading(true));
      const res = await fetch(`${URL}/api/user/shopping` ,{
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
          'Content-Type': 'application/json',
          'x-auth-token': getState().control.authToken
        },
      })

      if (res.status === 200 ){
        const data = await res.json();
        dispatch(updateShoppingLists(data.shoppingLists));
        dispatch(setLoading(false));
        return Promise.resolve();
      }else{
        dispatch(setLoading(false));
        return Promise.reject();
      }
  
   }
} 

export const updateShoppingList = payload =>{
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const res = await fetch(`${URL}/api/user/shopping/${payload.id}` ,{
      method:'PATCH',
      body:JSON.stringify(payload),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken
      },
    })
    
    if (res.status === 200 ){
      const data = await res.json();
      dispatch(updateShoppingLists(data.shoppingLists));

      if (getState().control.isShoppingListSelected){
        const selectedShoppingList = data.shoppingLists.find( 
          shoppingList => shoppingList._id === getState().control.shoppingListSelected._id);
        dispatch (selectShoppingList(selectedShoppingList));
      }
      dispatch(setLoading(false));
      return Promise.resolve();
    }else{
      dispatch(setLoading(false));
      return Promise.reject();
    }
  }
}


export const removeShoppingList = id => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const res = await fetch(`${URL}/api/user/shopping` ,{
      method:'DELETE',
      body:JSON.stringify({id}),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken
      },
    })


    
    if (res.status === 200 ){
      const data = await res.json();
      if (getState().control.isShoppingListSelected){
        dispatch (setShoppingListSelected(false));
        dispatch (selectShoppingList(null));
      }
      dispatch(updateShoppingLists(data.shoppingLists));
      dispatch(setLoading(false));
      
      return Promise.resolve();
    }else{
      dispatch(setLoading(false));
      return Promise.reject();
    }
  }
}

export const updateShoppingLists = (shoppingLists) => {
    return dispatch => {
      dispatch({
        type:UPDATE_SHOPPINGLISTS,
        payload:{shoppingLists}
      })
    }
}