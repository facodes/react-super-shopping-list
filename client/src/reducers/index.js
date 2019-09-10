import { combineReducers } from 'redux';
import alert from './alert';
import user from './user';
import control from './control';


 export default combineReducers({
    alert,
    user,
    control,
 })