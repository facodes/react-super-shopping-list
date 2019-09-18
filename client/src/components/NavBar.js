import React, { Component } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';

// Components
import Hello from './Hello';

import { connect } from 'react-redux';
import { logOut } from '../actions/auth';

const MenuButton = styled.button`
  outline: none;
  border: none;
  width: 5rem;
  height: 5rem;
  padding:1rem;
  border-radius: 50%;
  background: none;
  margin-top: 1.2em;
  display: flex;
  align-items: center;
  justify-content:center;
  transition: all 0.3s;

  &:hover{
    background: var(--color-accent);
  }

`;

const MenuIcon = styled.div`
position: relative;
  width: 3rem;
  height: 2rem;
`;

const Icon = styled.div`
  &,
  &::after,
  &::before {
    width: 100%;
    height: 0.4rem;
    background: var(--color-dark);
    border-radius: 8px;
  }

  &::after,
  &::before {
    content: '';
    width: 70%;
    position: absolute;
    left: 0;
  }

  &::after {
    top: 0.9rem;
  }
  &::before {
    top: 1.8rem;
  }
`

export class NavBar extends Component {
  render() {
    const { isUserLogged, isAppInitialized } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={10}>
            <Hello username={this.props.username || 'Welcome'} />
          </Col>
          <Col xs={2}>
            {isUserLogged && isAppInitialized ? (
              <MenuButton color="danger" onClick={this.props.onLogOut}>
                <MenuIcon>
                  <Icon></Icon>
                </MenuIcon>
              </MenuButton>
            ) : (
                ''
              )}
          </Col>
        </Row>
      </Grid>
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
