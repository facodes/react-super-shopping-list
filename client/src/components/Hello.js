import React from 'react';
import styled from 'styled-components';

const HelloWrapper = styled.div`
  margin-bottom: 3rem;
`;

const HelloText = styled.h1`
  font-size: 6.4rem;
  color: var(--color-dark);
  font-weight: var(--bold);
  text-transform: capitalize;
`;

const Username = styled.h1`
  font-size: 4.8rem;
  color: var(--color-primary);
  font-weight: var(--regular);
  text-transform: capitalize;
  line-height: 0;
`;

function Hello({ username }) {
  return (
    <HelloWrapper>
      <HelloText>Hello,</HelloText>
      <Username>{username || 'welcome'}</Username>
    </HelloWrapper>
  );
}

export default Hello;
