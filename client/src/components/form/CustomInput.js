import React from 'react';
import styled from 'styled-components';

const CustomInputWrapper = styled.div`
  width: 100%;
  position: relative;
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
    top: 100%;
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
  padding: 0.2em;
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

function CustomInput({ label, placeholder, ...props }) {
  return (
    <CustomInputWrapper>
      <Input placeholder={placeholder || ' '} {...props} />
      <Label>{label}</Label>
      <InputBorder />
    </CustomInputWrapper>
  );
}

export default CustomInput;
