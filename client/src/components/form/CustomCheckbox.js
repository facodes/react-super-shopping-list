import React from 'react';
import styled from 'styled-components';

const ChechboxLabelWrapper = styled.label``;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  /* clippath: inset(50 %); */
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Label = styled.label`
  font-size: 1.8rem;
  margin-left: 8px;
  pointer-events: none;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 2.8rem;
  height: 2.8rem;
  background: pink;

  transition: all 150ms;

  /* gradient radius trick */

  border: double 3px transparent;
  border-radius: 8px;
  background-image: linear-gradient(var(--color-dark), var(--color-dark)),
    radial-gradient(
      circle at top left,
      var(--color-primary),
      var(--color-secondary)
    );
  background-origin: border-box;
  background-clip: content-box, border-box;

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;

function CustomCheckbox({ label, checked, ...props }) {
  return (
    <ChechboxLabelWrapper>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <Label>{label}</Label>
    </ChechboxLabelWrapper>
  );
}

export default CustomCheckbox;
