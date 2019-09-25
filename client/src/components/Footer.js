import React from 'react';
import styled from 'styled-components';

import logo from '../assets/logo.jpg';

const StyledFooter = styled.footer`
	width: 99%;
	margin: 4.7rem auto;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`

const ImgContainer = styled.div`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 2rem;
	img{
		width:100%;
	}

	@media ${props => props.theme.mediaQueries.desktop}{
		display: none;
	}

`

const Credits = styled.p`
	color: var(--color-grey);
	font-size: 1.4rem;	
`

const Link = styled.a`
	color: var(--color-primary);
	text-decoration: underline;
`

const Footer = (props) => {
  return (
  	<StyledFooter>
  		<ImgContainer>
  			<img src={logo} alt="logo"/>
  		</ImgContainer>
			<Credits> 
				Built by <Link href="#">Felix Lopez</Link>. All rights reserved <span>&copy;</span>
			</Credits>
  	</StyledFooter>
  )
}

export default Footer;