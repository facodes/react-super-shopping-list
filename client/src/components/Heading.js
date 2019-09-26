import React from 'react';
import styled from 'styled-components';

const Text = styled.h2`
  color: var(--color-light);
  font-size: ${props => `${props.fontSize}rem`};
  font-weight: var(--bold);
  text-transform: capitalize;
`;

function Heading({ fontSize, style, ...props }) {
  return <Text fontSize={fontSize} style={style}> {props.children} </Text>;
}

export default Heading;
