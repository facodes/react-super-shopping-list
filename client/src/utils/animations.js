import styled , { keyframes } from 'styled-components';

 const SlideRight = keyframes`
	
	0%{
		transform: translateX(-100%);
	}
	100%{
		transform: translateX(0);
	}

`
export const SlideRightAnimation = styled.div`
	animation-name: ${SlideRight};
	animation-duration: .3s;
 	animation-timing-function: ease;
 	animation-delay: 0s;
 	animation-iteration-count: 1;
 	animation-direction: normal;
 	animation-fill-mode: forwards;
 	animation-play-state: running;
`