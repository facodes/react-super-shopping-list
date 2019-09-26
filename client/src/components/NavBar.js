import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from '../assets/logo.jpg';

// Components
import { Row } from '../utils/grid';
import Hello from './Hello';

import { connect } from 'react-redux';
import { logOut } from '../actions/auth';

const StyledNavBar = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 2em 0;
`
const HelloWrapper = styled.div`
	@media ${props => props.theme.mediaQueries.desktop}{
		display: none;
	}
`
const DesktopHello = styled.h2`
  @media ${props => props.theme.mediaQueries.desktop}{
    display: flex;
    align-items: center;
    font-size: 4.8rem;
    color: var(--color-dark);
    font-weight: var(--bold);
    text-transform: capitalize;
    margin-left: 3rem;
    span {
      margin-left: 1rem;
      font-size: 4rem;
      color: var(--color-primary);
      font-weight: var(--regular);
      text-transform: capitalize;
    }
  } 
`

const ImgContainer = styled.div`
	display: none;
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 2rem;
	img{
		width:100%;
	}

	@media ${props => props.theme.mediaQueries.desktop}{
		display: flex;
	}
`
export class NavBar extends Component {
  render() {
    const { isUserLogged, isAppInitialized } = this.props;
    return (
      <Row>
      	<StyledNavBar>
      		<HelloWrapper>
		      	<Hello username={this.props.username} />
      		</HelloWrapper>
      		<ImgContainer>
      			<img src={logo} alt="logo"/>
            {
              isUserLogged &&
               <DesktopHello>
                 Hello <span>{this.props.username}</span>
               </DesktopHello>
            }
      		</ImgContainer>
          
		      {isUserLogged && isAppInitialized && (
		        <FontAwesomeIcon icon="sign-out-alt" size="3x"
						  onClick={() => this.props.onLogOut()}
              style={{color: '#223843'}}
  		      />
		      )}
      	</StyledNavBar>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.user.name,
    isUserLogged: state.control.isUserLogged,
    isAppInitialized: state.control.isAppInitialized
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogOut() {
      dispatch(logOut());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
