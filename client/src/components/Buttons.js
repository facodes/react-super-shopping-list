import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactLoading from 'react-loading';

const StyledButton = styled.button`
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
  display: flex;
  justify-content: center;
  min-width: ${({size}) => {
  	if (size === 'sm')
  		return 0
  	else
  		return `14rem`
  }};
  padding: ${({size}) => {
    if (size === 'lg')
      return // this is not set
    else if(size === 'md')
      return // this is not set
    else if ( size === 'sm')
      return `0.4em 1em`
    else 
      return `0.4em 1em`
  }};
  font-size: ${props => (props.fontSize ? `${props.fontSize}rem` : `2rem`)};
`;

const ConnectedButton = ({spinner, isLoading,  ...props}) => {
	return ( 
		<StyledButton {...props}>
			{isLoading && spinner ?  
				<ReactLoading type="spin" color="white" height={20} width={20}/>
				: props.children 
			}
		</StyledButton>
	)
}


// Icon Buttons
const StyledIconButton = styled.button`
  color: var(--color-light);
  border:0;
  outline:0;

  ${({bg}) =>
    bg ? ` 
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;    
    ` : ``
  }

  background: ${({bg}) => 
    bg ? `var(--color-${bg})`: `none`
  };

	@media ${props => props.theme.mediaQueries.desktop}{
	  cursor: pointer;
	}
`

export const IconButton = ({icon, bg, size, onClick, style, ...props}) => {
  return (
    <StyledIconButton bg={bg} onClick={ () => { if(onClick) onClick()}} style={style} {...props} >
      <FontAwesomeIcon icon={icon} size={size || '2x'}/>
    </StyledIconButton>
  )
}

const mapStateToProps = state => ({
  isLoading: state.control.isLoading,
});

export const Button = connect(mapStateToProps)(ConnectedButton);