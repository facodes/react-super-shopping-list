import { 
  SHOW_ALERT, CLEAR_ALERT
}from '../actions/types'


const initialState = {
  msg:'',
  color:'',
  showAlert:false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
 case SHOW_ALERT:
   return{
     ...state,
     ...payload,
     showAlert:true,
   }
  case CLEAR_ALERT:    
    return{
      ...state,
      msg:'',
      color:'',
      showAlert:false,
    }
  default:
    return state
  }
}
