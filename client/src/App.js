import React, { Component } from 'react';
import { Container, } from 'reactstrap'

// components 
import NavBar from './components/NavBar';

// Containers
import DashBoard from './containers/DashBoard';
import Welcome from './containers/Welcome';
// redux
import { connect } from 'react-redux'
// actions
import { logOut } from './actions/auth'
import { initApp } from './actions/control'

// styles
import './App.css';

class App extends Component {

  componentDidMount(){
    this.props.onInitApp();
  }

  render() {
    
    const { isUserLogged, isAppInitialized } = this.props.control;
    return (
      <div className="App">
        <NavBar/>
        <Container>
          { isAppInitialized ? (
              <React.Fragment>
                {isUserLogged ?  (<DashBoard/>) : (<Welcome/>)} 
              </React.Fragment>
            ) : ( 
              <div style={shoppingCartContainer}>
                <img
                  style={{width:'100%', verticalAlign:'middle'}} 
                  src="http://pluspng.com/img-png/shop-png-black-and-white-logo-512.png" alt="shopping cart"
                />
              </div>
            ) 
          }
        </Container>
      </div> 
    );
  }
}

const shoppingCartContainer = {
  width:'40%',
  margin:'0 auto'
}

function mapStateToProps(state){
  return{
    control: state.control,
    
  }
}

function mapDispatchToProps(dispatch){
  return{
    onInitApp(){
      dispatch(initApp());
    },
    onLogOut(){
      dispatch(logOut());
    }
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
