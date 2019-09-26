import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

import logo from '../assets/logo.jpg';	

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`

const LogoContainer = styled.div`
	width: 40%;
	max-width: 300px;
	img{
		width:100%;
	}
`
const Loading = (props) => {
  return (
    <Container>
    	<LogoContainer>
    		<img src={logo} alt="supper shopping list logo"/>
    	</LogoContainer>
    	<ReactLoading type="cylon" color="#9DA0A3" height={100} width={100}/>
    	
    </Container>
  )
}

export default Loading;