import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS, SET_USER_LOGGED, SET_SHOPPINGLIST_SELECTED, SET_LOADING, SET_APP_INIT, SET_SHOPPINGLIST
} from '../actions/types'

const initialState = {
  authToken:localStorage.getItem('token'),
  shoppingListSelected:Object,
  isUserLogged:false,
  isShoppingListSelected:false,
  isLoading:false,
  isAppInitialized:false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case LOGIN_SUCCESS:
    localStorage.setItem('token' , payload.token);
    return{
      ...state,
      authToken:payload.token,
      isUserLogged:true
    }  
  case LOGOUT_SUCCESS:{
    localStorage.removeItem('token');
    return{
      ...state,
      authToken:null,
      isUserLogged:false,
    }
  } 
  case SET_USER_LOGGED:
    return{
      ...state,
      isUserLogged:payload.value,
    }
  case SET_LOADING:   
    return{
      ...state,
      isLoading:payload.value
    }
  case SET_APP_INIT:
    return{
      ...state,isAppInitialized:payload.value
    }
  case SET_SHOPPINGLIST_SELECTED:
    return{
    ...state,
    isShoppingListSelected: payload.value,

  } 
  case SET_SHOPPINGLIST:
   return{
     ...state,shoppingListSelected:payload.shoppingList
   }

  default:
    return state
  }
}
