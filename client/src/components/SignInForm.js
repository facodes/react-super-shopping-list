import React, { Component } from 'react'
import { Form , Input , Label , Button , FormGroup } from 'reactstrap'

export class SignInForm extends Component {

  state = {
    username:'',
    name:'',
    password:'',
  }

  onChange = (evt) => {
    this.setState({[evt.target.name]:evt.target.value});
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSignIn(this.state);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text"  name="name" onChange={this.onChange} autoComplete="off" 
            placeholder="Enter Your Name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text"  name="username" onChange={this.onChange} autoComplete="off" 
            placeholder="Enter Your Email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password"  name="password" onChange={this.onChange} autoComplete="off"
            placeholder="Enter Your Password"
          />
        </FormGroup>
        <div className="text-center">
          <Button type="submit" color="success" >Sign In</Button>
        </div>
      </Form>
    )
  }
}

export default SignInForm
