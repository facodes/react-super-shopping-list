import React, { Component } from 'react';
import styled from 'styled-components';

import Heading from './Heading';
import { Button } from './Buttons';
import CustomInput from './form/CustomInput';
import CustomCheckbox from './form/CustomCheckbox';

const FormHeader = styled.div`
  padding: 3.125em 2em 1em 2em;
  border-bottom: 2px solid var(--color-black-lg);
`;

const FormBody = styled.div`
  padding: 4.625em 2em 1em 2em;
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;

const FormGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

export class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    checked: false
  };

  onCheckboxChange = evt => this.setState({ checked: evt.target.checked });

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onLogIn(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormHeader>
          <Heading fontSize={3.6}>Login</Heading>
        </FormHeader>
        <FormBody>
          <FormGroup>
            <CustomInput
              label="username"
              type="text"
              name="username"
              onChange={this.onInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <CustomInput
              label="password"
              type="password"
              name="password"
              onChange={this.onInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <CustomCheckbox
              label="keep me log in"
              checked={this.state.checked}
              onChange={this.onCheckboxChange}
            />
          </FormGroup>
          <ButtonWrapper>
            <Button type="submit" color="accent">
              Login
            </Button>
          </ButtonWrapper>
        </FormBody>
      </form>
    );
  }
}

export default LoginForm;
