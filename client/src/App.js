import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBars,
  faTimes, 
  faCheck,
  faPlus,
  faChevronLeft,
 } from '@fortawesome/free-solid-svg-icons';

// components
import NavBar from './components/NavBar';

// Containers
import DashBoard from './containers/DashBoard';
import Welcome from './containers/Welcome';
// redux
import { connect } from 'react-redux';
// actions
import { logOut } from './actions/auth';
import { initApp } from './actions/control';

library.add(
 faBars,
 faTimes,
 faCheck,
 faPlus, 
 faChevronLeft,
);

const shoppingCartContainer = {
  height: '100vh',
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
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
        <NavBar/>
        <DashBoard />
        {/* {isAppInitialized ? (
          <div>
            <NavBar/>
            {isUserLogged ? <DashBoard /> : <Welcome />}
          </div>
        ) : (
          <div style={shoppingCartContainer}>
            <h1>Loading...</h1>
          </div>
        )} */}
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
