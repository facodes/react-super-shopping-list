import React from 'react';
import styled from 'styled-components';

const HelloWrapper = styled.div``;

const HelloText = styled.h1`
  font-size: 6.4rem;
  color: var(--color-dark);
  font-weight: var(--bold);
  text-transform: capitalize;
  line-height: 0.8;
`;

const Username = styled.h1`
  font-size: 4.8rem;
  color: var(--color-primary);
  font-weight: var(--regular);
  text-transform: capitalize;
  line-height: 0.9;
  margin-top: 10px;
`;

function Hello({ username, inline }) {
  return (
    <HelloWrapper inline={inline}>
      <HelloText>Hello</HelloText>
      <Username>{username || 'welcome'}</Username>
    </HelloWrapper>
  );
}

export default Hello;
