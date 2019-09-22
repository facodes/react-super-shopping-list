import React, { useState } from 'react';
import styled from 'styled-components';


import LoginForm from './LoginForm';
import SignInForm from './SignInForm';
import Heading from './Heading';

const FormSwitchWrapper = styled.div`
  width: 99.5%;
  margin: 0 auto;
  background: var(--color-dark);
  color: var(--color-light);
  border-radius: 32px;
`;

const FormSwitchHeader = styled.div`
  padding: 3.125em 3rem 1em 3rem;
  border-bottom: 2px solid var(--color-black-lg);
`
const LinkContainer = styled.div`
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

export const FormSwitch = (props) => {
  const [formType, setFormType] = useState(true);

  return (
    <FormSwitchWrapper>
      {formType ? (
        <>
          <FormSwitchHeader>  
            <Heading fontSize={3.2}>
              Login
            </Heading>
          </FormSwitchHeader>
          <LoginForm onLogIn={props.onLogIn} />
          <LinkContainer>
            <Link onClick={()=> setFormType(false)}>
              Not registred yet?
            </Link>
          </LinkContainer>
        </>
      ) : (
        <>
          <FormSwitchHeader>  
            <Heading fontSize={3.2}>
              Register
            </Heading>
          </FormSwitchHeader>
          <SignInForm onSignIn={props.onSignIn} setFormType={setFormType}/>
          <LinkContainer>
            <Link onClick={()=> setFormType(true)}>
              Go back to login.
            </Link>
          </LinkContainer>
        </>
      )}
    </FormSwitchWrapper>
  );
}

export default FormSwitch;
