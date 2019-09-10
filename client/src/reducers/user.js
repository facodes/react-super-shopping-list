
import {  LOAD_USER, UPDATE_SHOPPINGLISTS, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  name:'',
  shopping_lists:[],
  _id:'',
  username:'',
  register_date:Date,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case LOAD_USER:
      return{
      ...state,
      ...payload.user
    }
    case UPDATE_SHOPPINGLISTS:    
      return{
        ...state,
        shopping_lists:[...payload.shopping_lists]
      }
    case LOGOUT_SUCCESS:
      return{
        ...state, 
        name:'',
        shopping_lists:[],
        _id:'',
        username:'',
        register_date:Date,
      }
    default:
      return state
  }
}
