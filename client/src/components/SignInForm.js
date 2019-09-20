import React, { Component } from 'react';
import styled from 'styled-components';

import Heading from './Heading';
import { Button } from './Buttons';
import CustomInput from './form/CustomInput';

const FormHeader = styled.div`
  padding: 3.125em 2em 1em 2em;
  border-bottom: 2px solid var(--color-black-lg);
`;

const FormBody = styled.div`
  padding: 4.625em 2em 1em 2em;
`;

const ButtonWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;

const FormGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

export class SignInForm extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSignIn(this.state);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormHeader>
          <Heading fontSize={3.6}>
          	register
          </Heading>
        </FormHeader>
        <FormBody>
          <FormGroup>
            <CustomInput
              label="email"
              type="email"
              name="email"
              onChange={this.onInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <CustomInput
              label="name"
              type="text"
              name="name"
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
          <ButtonWrapper>
            <Button type="submit" color="accent" spinner>
              Register
            </Button>
          </ButtonWrapper>
        </FormBody>
      </form>
    );
  }
}

export default SignInForm;
