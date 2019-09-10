import React, { Component } from 'react'
import FormSwitch from './FormSwitch'
import ReactLoading  from 'react-loading'
import {Alert} from 'reactstrap'
import { connect } from 'react-redux'
import { clearAlert } from '../actions/alert'

export class Welcome extends Component {
 
  showAlert = (showAlert, msg, color) => {   
    return (
      <Alert color={color} isOpen={showAlert} toggle={this.props.onClearAlert}> 
        <h5 className="mb-0">{msg}</h5>
      </Alert>
    ) 
  }
  
  
  render() {
    
    const { isLoading } = this.props;
    const { showAlert, msg, color } =  this.props.alert;
    return (
      <div className="d-flex align-items-center flex-column">
        <FormSwitch
          onClearAlert={this.props.onClearAlert}
        />
        { isLoading ? (<ReactLoading type="spin"color="white" height={50} width={50}/>) : ''}
        { showAlert && !isLoading ? this.showAlert(showAlert,msg,color) : ''}
       
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  isLoading: state.control.isLoading,
  alert: state.alert
})

const mapDispatchToProps = dispatch => {
  return{
    onClearAlert(){
      dispatch(clearAlert());
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Welcome)
 