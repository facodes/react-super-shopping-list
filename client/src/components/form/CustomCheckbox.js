import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChechboxLabelWrapper = styled.label`
	

`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;

`;

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`  
  border: 0;
  clip: rect(0 0 0 0);
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
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
   width:80%;
   height:80%;
   transition: all 0.15s ease-in-out;
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
  

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
  /* End of trick */

  ${Icon} {
    opacity: ${props => props.checked ? 1 : 0};
  }
`;

function CustomCheckbox({ label, checked, ...props }) {
  return (
    <ChechboxLabelWrapper>
      <CheckboxContainer>
        <HiddenCheckbox checked={checked} {...props} />
        <StyledCheckbox checked={checked}>
          <Icon>
            <FontAwesomeIcon icon="check" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <Label>{label}</Label>
    </ChechboxLabelWrapper>
  );
}

export default CustomCheckbox;
