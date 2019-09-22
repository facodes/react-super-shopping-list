import React, { Component } from 'react';
import styled from 'styled-components';

import { SlideRightAnimation } from '../utils/animations';

import { Button } from './Buttons';
import CustomInput from './form/CustomInput';

const StyledForm = styled.form`
  padding: 4.625em 3rem 1em 3rem;
  min-height: 33rem;
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
    this.props.onSignIn(this.state)
    	.then(() => {
    		setTimeout(() => {
    			this.props.setFormType(true);
    		}, 500)	
    	})
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
	      </StyledForm>
    	</SlideRightAnimation>
    );
  }
}

export default SignInForm;
