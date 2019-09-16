import React from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  color: var(--color-light);
  font-size: ${props => `${props.fontSize}rem`};
  font-weight: var(--bold);
  text-transform: capitalize;
  line-height:1;
`;

function Heading({ text, fontSize, style }) {
  return <Text fontSize={fontSize} style={style}> {text} </Text>;
}

export default Heading;
