import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  color: ${props =>
    props.color !== 'light' ? 'var(--color-ligth) ' : 'var(--color-dark)'};
  background: ${props =>
    props.color ? `var(--color-${props.color})` : `var(--color-primary)`};
  border: none;
  outline: none;
  border-radius: 64px;
  font-weight: var(--bold);
  text-transform: uppercase;
  padding: 0.4em 2em;
  font-size: ${props => (props.fontSize ? `${props.fontSize}rem` : `2rem`)};
`;

function Button({ color, fontSize, size, text, ...props }) {
  return <StyledButton color={color}>{text}</StyledButton>;
}

export default Button;
