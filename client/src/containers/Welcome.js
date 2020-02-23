import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

// Actions 
import { signIn, logIn } from '../actions/auth';

import shoppint_cart from '../assets/shopping_cart.png';

// Components
import FormSwitch from '../components/FormSwitch';
import Hello from '../components/Hello';

const WelcomeContainer = styled.div`
	display: flex;
	flex-flow: column nowrap;

	@media ${props => props.theme.mediaQueries.desktop}{
		max-width: 850px;
		margin: 0 auto;
		flex-flow: row nowrap;
		padding: 0 2rem;
	}
`
const IntroAside = styled.aside`
	@media ${props => props.theme.mediaQueries.desktop}{
		display: block;
		flex-basis: 475px;
	}
`
const HelloWrapper = styled.div`
	display: none;
	@media ${props => props.theme.mediaQueries.desktop}{
		display: block;
	}
`
const ImgContainer = styled.div`
	display: none;
	@media ${props => props.theme.mediaQueries.desktop}{
		display: block;
	}
	img{
		width: 100%;
	}
`

const WelcomeText = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey);
  margin: 0.5rem 0 3rem 0;
  padding: 0 2rem;

  @media ${props => props.theme.mediaQueries.land}{
  	width: 80%;
  	margin: 0.5rem auto 3rem auto;
  	padding: 0 2rem;
  }

	@media ${props => props.theme.mediaQueries.desktop}{
		margin-right: 8rem;
		padding: 0;
	}

`;

export class Welcome extends Component {

  render() {
    return (
			<WelcomeContainer>
				<IntroAside>
					<HelloWrapper>
						<Hello />
					</HelloWrapper>
        	<WelcomeText>
          	A shopping list app, that helps you to keep track off all your
          	needs.
        	</WelcomeText>
        	<ImgContainer>
        		<img src={shoppint_cart} alt="guy with a cart and a shoppig list"/>
        	</ImgContainer>
				</IntroAside>
        <FormSwitch
				 onSignIn= {this.props.onSignIn}
				 onLogIn= {this.props.onLogIn}
        />
			</WelcomeContainer>
    );
  }
}

const mapStateToProps = state => ({

});


const mapDispatchToProps = dispatch  => ({
	async onSignIn(payload) {
	  await dispatch(signIn(payload));
	},
	onLogIn(payload) {
	  dispatch(logIn(payload));
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
