import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button = styled.button`
  color: ${ props =>
    props.color !== 'light' ? 'var(--color-ligth) ' : 'var(--color-dark)'
  };
  background: ${ props =>
    props.color ? `var(--color-${props.color})` : `var(--color-primary)`
  };
  border: none;
  outline: none;
  border-radius: 64px;
  line-height: 1;
  font-weight: var(--bold);
  text-transform: uppercase;
  padding: ${ ({size}) => {
    if (size === 'lg')
      return // this is not set
    else if(size === 'md')
      return // this is not set
    else if ( size === 'sm')
      return `0.4em 1em`
    else 
      return `0.4em 2em`
  }};
  font-size: ${props => (props.fontSize ? `${props.fontSize}rem` : `2rem`)};
`;

const StyledIconButton = styled.button`
  color: var(--color-light);
  border:0;
  outline:0;

  ${({bg}) =>
    bg ? ` 
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;    
    ` : ``
  }

  background: ${({bg}) => 
    bg ? `var(--color-${bg})`: `none`
  };
`

export const IconButton = ({icon, bg, size, onClick}) => {
  return (
    <StyledIconButton bg={bg} onClick={ () => { if(onClick) onClick()} }  >
      <FontAwesomeIcon icon={icon} size={size || '2x'}/>
    </StyledIconButton>
  )
}
