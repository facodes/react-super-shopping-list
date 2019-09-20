import {
  LOAD_USER,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
} from './types';

import { setLoading } from './control';
import { showAlert } from './alert';


import {
  URL
} from '../API'

export const signIn = (payload) =>{
  return async dispatch => {
    // Client side validation for inputs
    if( !payload.email || !payload.name || !payload.password ){
      dispatch(showAlert({msg:'Please complete all the fields', color:'warning'}));
      return;
    }else if(payload.password.length < 4 ){
      dispatch(showAlert({msg:'Password must be at least 4 characters', color:'warning'}));
      return;
    } 

    dispatch(setLoading(true));
    // Making the request
    const res =  await fetch(`${URL}/api/signin`,{
      method:'POST',
      body:JSON.stringify(payload),
      headers:{
        "Content-type": "application/json",
      }
    })
    const data =  await res.json();
    dispatch(setLoading(false));

    // reading response
    if (res.status === 200){
      console.log('success');
      dispatch(showAlert({ msg: 'You are now Register!', color:'success'}));
    }else{ // an error occur
      dispatch(showAlert({ msg: data.msg, color:'danger'}));
    }

    dispatch(setLoading(false));
  }
  
}

export const logIn = payload =>{
  return async dispatch =>{

    if( !payload.email || !payload.password ){
      dispatch(showAlert({msg:'Please complete all the fields', color:'warning'}));
      return;
    }

    dispatch(setLoading(true));
    const res = await fetch(`${URL}/api/login`,{
      method:'POST',
      body:JSON.stringify(payload),
      headers:{"Content-type" : "application/json"}
    })
    dispatch(setLoading(false));
    
    const data = await res.json();
    if(res.status === 200){
      dispatch(loadUser(data.token));
    }else{
      dispatch(showAlert({ msg: data.msg, color:'danger'}));
    } 
  }
}

export const logOut = () => {
  return{
    type:LOGOUT_SUCCESS,
  }
}

export const loadUser = (token) => {
  return async (dispatch) => {
    const res = await fetch(`${URL}/api/user/`, {
      headers:{
        'x-auth-token':token,
      }
    });
    if (res.status === 200){
      const user = await res.json();
      dispatch({type:LOAD_USER,payload:{user}});
      dispatch({type:LOGIN_SUCCESS,payload:{token}});
    }
  }
}
