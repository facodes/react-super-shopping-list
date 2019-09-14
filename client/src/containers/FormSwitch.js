import React, { Component } from 'react';

import { connect } from 'react-redux';
import { signIn, logIn } from '../actions/auth';

import styled from 'styled-components';

import LoginForm from '../components/LoginForm';
import SignInForm from '../components/SignInForm';

const FormSwitchWrapper = styled.div`
  width: 99.5%;
  margin: 0 auto;
  background: var(--color-dark);
  color: var(--color-light);
  border-radius: 32px;
`;

const SwitchWrapper = styled.div`
  margin-top: 3em;
  padding: 5em;
  display: flex;
  justify-content: center;
`;

const Link = styled.button`
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-secondary);
  font-size: 1.8rem;
  text-decoration: underline;
  font-weight: var(--regular);
`;

export class FormSwitch extends Component {
  state = {
    type: true
  };
  setFormType = value => {
    this.props.onClearAlert();
    this.setState({ type: value });
  };
  render() {
    return (
      <FormSwitchWrapper>
        {this.state.type ? (
          <React.Fragment>
            <LoginForm onLogIn={this.props.onLogIn} />

            <SwitchWrapper className="text-center">
              <Link onClick={this.setFormType.bind(this, false)}>
                Not registred yet?
              </Link>
            </SwitchWrapper>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <SignInForm onSignIn={this.props.onSignIn} />
            <SwitchWrapper className="text-center">
              <Link onClick={this.setFormType.bind(this, true)}>
                Go back to login.
              </Link>
            </SwitchWrapper>
          </React.Fragment>
        )}
      </FormSwitchWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn(payload) {
      dispatch(signIn(payload));
    },
    onLogIn(payload) {
      dispatch(logIn(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormSwitch);
