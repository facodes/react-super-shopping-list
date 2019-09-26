import React, { Component } from 'react';
import styled from 'styled-components';

import { SlideRightAnimation } from '../utils/animations';

import { Button } from './Buttons';
import CustomInput from './form/CustomInput';
import CustomCheckbox from './form/CustomCheckbox';

const StyledForm = styled.form`
  padding: 4.625em 3rem 1em 3rem;
  min-height: 33rem;
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
    email: '',
    password: '',
    keepUserLoggedIn: false
  };

  onCheckboxChange = evt => this.setState({ keepUserLoggedIn: evt.target.checked });

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onLogIn(this.state);
  };

  render() {
    return (
    	<SlideRightAnimation>
	      <StyledForm onSubmit={this.onSubmit}>
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
	            checked={this.state.keepUserLoggedIn}
	            onChange={this.onCheckboxChange}
	          />
	        </FormGroup>
	        <ButtonWrapper>
	          <Button type="submit" color="accent" spinner>
	            Login
	          </Button>
	        </ButtonWrapper>
	      </StyledForm>
    	</SlideRightAnimation>
    );
  }
}

export default LoginForm;
