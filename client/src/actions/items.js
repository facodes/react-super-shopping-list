import { UPDATE_SHOPPINGLISTS } from './types';

export const addNewItem  = name => {
  return async (dispatch, getState) => {

    const shoppingList =  getState().control.shoppingListSelected;
    const res = await fetch('/api/user/item' ,{
      method:'POST',
      body:JSON.stringify({name, id:shoppingList._id}),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken
      },
    });

    if(res.status === 200){
      const data = await res.json();  
      const shopping_lists = getState().user.shopping_lists;
      const foundIndex = shopping_lists.findIndex( sl => sl._id === shoppingList._id);
      shopping_lists[foundIndex].items = [...data.items];
      dispatch({
        type:UPDATE_SHOPPINGLISTS,
        payload:{shopping_lists}
      })
    }
  }
}

export const removeItem = itemID => {
  return async (dispatch, getState) => {
    const shoppingList =  getState().control.shoppingListSelected;
    const res = await fetch('/api/user/item' ,{
      method:'DELETE',
      body:JSON.stringify({itemID, shoppingListID:shoppingList._id}),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken
      }
    });

    if (res.status === 200){
      const data = await res.json();  
      const shopping_lists = getState().user.shopping_lists;
      const foundIndex = shopping_lists.findIndex( sl => sl._id === shoppingList._id);
      shopping_lists[foundIndex].items = [...data.items];
      dispatch({
        type:UPDATE_SHOPPINGLISTS,
        payload:{shopping_lists}
      });
    }
  }
}

export const toggleTodoDone = itemID => {
  return async (dispatch, getState) => { 
    const shoppingList =  getState().control.shoppingListSelected;
    const res = await fetch('/api/user/item/done' ,{
      method:'POST',
      body:JSON.stringify({itemID, shoppingListID:shoppingList._id}),
      headers:{
        'Content-Type': 'application/json',
        'x-auth-token': getState().control.authToken,
      }
    });
    if (res.status === 200){
      const data = await res.json();  
      const shopping_lists = getState().user.shopping_lists;
      const foundIndex = shopping_lists.findIndex( sl => sl._id === shoppingList._id);
      shopping_lists[foundIndex].items = [...data];
      dispatch({
        type:UPDATE_SHOPPINGLISTS,
        payload:{shopping_lists}
      });
    }
  }
}