import React, { Component } from 'react'

import { connect } from 'react-redux'
import { signIn , logIn } from '../actions/auth'

import LoginForm  from '../components/LoginForm'
import SignInForm  from '../components/SignInForm'

export class FormSwitch extends Component {

  state = { 
    type:true,
  }
  setFormType = value => {
    this.props.onClearAlert()
    this.setState({type:value});
  }
  render() {
    return (
      <div className="bg-light p-4 rounded border border-secondary mb-3">
        <h5 className="text-center mb-3">Welcome to Super Shopping List!</h5>  
        {
          this.state.type ? 
          ( <React.Fragment>
              <LoginForm onLogIn = {this.props.onLogIn}/>
              <hr className="my-4"></hr>
              <div className="text-center"> 
                <button type="button" className="btn btn-link"
                  onClick={this.setFormType.bind(this,false)}
                >Sign Up!</button>
              </div>
           
            </React.Fragment>)
          :
          ( <React.Fragment>
                
              <SignInForm onSignIn ={this.props.onSignIn}/>
              <hr className="my-4"></hr>
              <div className="text-center"> 
                <button type="button" className="btn btn-link"
                  onClick={this.setFormType.bind(this,true)}
                >Go To Login</button>
              </div>
            </React.Fragment>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn(payload){
      dispatch(signIn(payload));
    },
    onLogIn(payload){
      dispatch(logIn(payload));
    },
  }
  
}


export default connect(mapStateToProps, mapDispatchToProps)(FormSwitch)
