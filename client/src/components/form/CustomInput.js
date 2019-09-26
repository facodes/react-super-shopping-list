import React , { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
	width: 100%;
`

const CustomInputWrapper = styled.div`
	position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  color: var(--color-white);
  width: 100%;
  
  background: transparent;
  padding: 0.2em;
  font-size: 2rem;
  border: none;
  outline: none;

  &:not(:placeholder-shown) ~ label,
  &:focus ~ label {
    top: 120%;
    font-size: 1.4rem;
  }

  &[required] ~ label::after {
    content: '*';
    color: var(--color-accent);
    margin-left: 5px;
  }
`;

const Label = styled.label`

  position: absolute;
  padding: 0 0.2em;
  font-size: 2rem;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
  
`;

const InputBorder = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: var(--color-primary);
`;

function getFaIconColor(inputType){
	return inputType === 'password' ? 
		({ padding: '0.2em', opacity: '0.5' })
	: ({	padding: '0.2em', opacity: '1' });
}

function CustomInput({ label, placeholder, ...props }) {
	const [inputType, setInputType] = useState(props.type);
	if (props.type === 'password'){
		return(
	  	<Container>
		    <CustomInputWrapper>
		      <Input {...props} placeholder={placeholder || ' '} type={inputType} />
		      <Label>{label}</Label>
		      <FontAwesomeIcon icon="eye" size="3x" style={getFaIconColor(inputType)} 
						onClick={() => {
							if (inputType === 'password')
								setInputType('text');
							else
								setInputType('password');
						}}
		      />
		    </CustomInputWrapper>
		    <InputBorder />
	  	</Container>
		)
	}	
	else
	  return (
	  	<Container>
		    <CustomInputWrapper>
		      <Input placeholder={placeholder || ' '} {...props} />
		      <Label>{label}</Label>
		      {
		      	props.icon ? 
		      		<FontAwesomeIcon icon={props.icon} size="2x" />
		      		: ''
		      }
		    </CustomInputWrapper>
		    <InputBorder />
	  	</Container>
	  );
}

export default CustomInput;
