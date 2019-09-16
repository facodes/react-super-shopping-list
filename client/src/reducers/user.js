
import {  LOAD_USER, UPDATE_SHOPPINGLISTS, LOGOUT_SUCCESS } from '../actions/types';

const initialState = {
  name:'',
  shoppingLists:[],
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
        shoppingLists:[...payload.shoppingLists]
      }
    case LOGOUT_SUCCESS:
      return{
        ...state, 
        name:'',
        shoppingLists:[],
        _id:'',
        username:'',
        register_date:Date,
      }
    default:
      return state
  }
}
