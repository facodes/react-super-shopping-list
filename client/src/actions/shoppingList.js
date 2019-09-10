import { UPDATE_SHOPPINGLISTS } from '../actions/types'

export const addNewShoppingList = (name) => {
   return async (dispatch, getState) => {
      const res = await fetch('/api/user/shopping' ,{
        method:'POST',
        body:JSON.stringify({name}),
        headers:{
          'Content-Type': 'application/json',
          'x-auth-token': getState().control.authToken
        },
      })
      const data = await res.json();
      dispatch(updateShoppingLists(data.shopping_lists));
   }
} 

export const removeShoppingList = id => {
  return async (dispatch, getState) => {
    const res = await fetch('/api/user/shopping' ,{
      method:'DELETE',
      body:JSON.stringify({id}),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken
      },
    })
    const data = await res.json();
    dispatch(updateShoppingLists(data.shopping_lists));
  }
}

export const updateShoppingLists = (shopping_lists) => {
    return dispatch => {
      dispatch({
        type:UPDATE_SHOPPINGLISTS,
        payload:{shopping_lists}
      })
    }
}