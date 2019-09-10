import React, { Component } from 'react'
import { Form , Input , Label , Button , FormGroup } from 'reactstrap'

export class LoginForm extends Component {

  state = {
    username:'',
    password:'',
  }

  onChange = (evt) => {
    this.setState({[evt.target.name]:evt.target.value});
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onLogIn(this.state);
  }

  render() {
    return (
      <div>
         <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text"  name="username" 
              onChange={this.onChange} autoComplete="off" placeholder="Enter Your Username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="pw">Password</Label>
            <Input type="password"  name="password" onChange={this.onChange} autoComplete="off"  
              placeholder="Enter Your Password"
            />
          </FormGroup>
          <div className="text-center">
            <Button type="submit" color="success"  >Log In</Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginForm
