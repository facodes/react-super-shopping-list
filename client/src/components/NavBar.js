import React, { Component } from 'react'
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from 'reactstrap'
import { connect } from 'react-redux'
import { logOut } from '../actions/auth'


export class NavBar extends Component {

  render() {
    const { isUserLogged , isAppInitialized} = this.props;
    return (
      <Navbar 
        color="light" dark expan="lg" className="mb-5"
      >
        <Container>
          <NavbarBrand>Super Shopping Listing</NavbarBrand>
          <Nav className="ml-auto" navbar>
            {
              isUserLogged && isAppInitialized ? (
               <NavItem>
                  <Button 
                    color="danger"
                    onClick={this.props.onLogOut}
                  > 
                    <i className="fas fa-sign-out-alt"/>
                  </Button>
                </NavItem>) : ''
            }
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

function mapStateToProps(state){
  return{
     isUserLogged:state.control.isUserLogged,
     isAppInitialized:state.control.isAppInitialized,
  }
}

function mapDispatchToProps (dispatch){
  return{
    onLogOut(){
      dispatch(logOut());
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(NavBar);
