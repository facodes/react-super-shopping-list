import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'; 

import { clearAlert } from '../actions/alert';

import { IconButton } from './Buttons'


const StyledAlert = styled.div`
	padding: 1.8em 2em;
	position: fixed;
	bottom: -1px;
	left: 0; right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${props => props.background ? `var(--color-${props.background})` : 'var(--color-primary)'};
	transform: ${props => props.showAlert ? `translateY(0)` : `translateY(100%)`};
	color: var(--color-light);
	transition : transform 0.3s ease-in;
`

const AlertText = styled.span`
	font-size: 1.8rem;
	font-weight: var(--regular);
`

const Alert = (props) => {
  return (
    <StyledAlert showAlert={props.alert.showAlert} background={props.alert.color}>
    	<AlertText> 
    		{props.alert.msg}
    	</AlertText>
    	<IconButton icon="times" onClick={() => props.clearAlert()}></IconButton>
    </StyledAlert>
  )
}

function mapStateToProps (state){
	return{
		alert: state.alert
	}
}

function mapDispatchToProps (dispatch){
	return{
		clearAlert(){
			dispatch(clearAlert());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);