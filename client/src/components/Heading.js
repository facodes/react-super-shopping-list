import React from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  color: var(--color-light);
  font-size: 3.6rem;
  font-weight: var(--bold);
  text-transform: capitalize;
`;

function Heading({ text }) {
  return <Text>{text}</Text>;
}

export default Heading;
