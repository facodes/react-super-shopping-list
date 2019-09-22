import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import Hello from './Hello';

import { connect } from 'react-redux';
import { logOut } from '../actions/auth';

export class NavBar extends Component {
  render() {
    const { isUserLogged, isAppInitialized } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={10}>
            <Hello username={this.props.username || 'Welcome'} />
          </Col>
          <Col xs={2} style={{display: 'flex', justifyContent: 'center'}}>
            {isUserLogged && isAppInitialized && (
              <FontAwesomeIcon icon="sign-out-alt" size="3x"
								 onClick={() => this.props.onLogOut()}
								 style={{
								 	color: '#223843',
								 	marginTop: '3rem'
								 }}
              />
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
