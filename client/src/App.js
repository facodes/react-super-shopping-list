import React, { Component } from 'react';

// components
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import Hello from './components/Hello';
import NavBar from './components/NavBar';

// Containers
import DashBoard from './containers/DashBoard';
import Welcome from './containers/Welcome';
// redux
import { connect } from 'react-redux';
// actions
import { logOut } from './actions/auth';
import { initApp } from './actions/control';

const shoppingCartContainer = {
  width: '40%',
  margin: '0 auto'
};

class App extends Component {
  componentDidMount() {
    this.props.onInitApp();
  }

  render() {
    const { isUserLogged, isAppInitialized } = this.props.control;
    return (
      <>
        {/* <NavBar /> */}
        <Grid>
          <Row>
            <Col xs={9}>
              <Hello />
            </Col>
            <Col xs={3}></Col>
          </Row>
        </Grid>
        <div className="row">
          {isAppInitialized ? (
            <>{isUserLogged ? <DashBoard /> : <Welcome />}</>
          ) : (
            <div style={shoppingCartContainer}>
              <img
                style={{ width: '100%', verticalAlign: 'middle' }}
                src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png"
                alt="shopping cart"
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    control: state.control
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onInitApp() {
      dispatch(initApp());
    },
    onLogOut() {
      dispatch(logOut());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
