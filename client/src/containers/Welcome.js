import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

// Actions 
import { signIn, logIn } from '../actions/auth';

// Components
import FormSwitch from '../components/FormSwitch';

const WelcomeText = styled.p`
  font-size: 1.8rem;
  color: var(--color-grey);
  margin: 0.5rem 0 3rem 0;
`;

export class Welcome extends Component {

  render() {
    return (
      <>
        <WelcomeText>
          A shopping list app, that helps you to get track off all your
          needs
        </WelcomeText>
        <FormSwitch
					 onSignIn= {this.props.onSignIn}
					 onLogIn= {this.props.onLogIn}
        />
      </>
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
