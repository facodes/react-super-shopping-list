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

const FadeOut = keyframes`
	0%{
		opacity: 1;
	}
	100%{
		opacity: 1;
	}
`

export const FadeOutAnimation = styled.div`
	animation-name: ${FadeOut};
	animation-duration: .3s;
 	animation-timing-function: ease;
 	animation-delay: 0s;
 	animation-iteration-count: 1;
 	animation-direction: normal;
 	animation-fill-mode: forwards;
 	animation-play-state: running;
`


const FadeIn= keyframes`
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`

export const FadeInAnimation  = styled.div`
	animation-name: ${FadeIn};
	animation-duration: 1s;
 	animation-timing-function: ease;
 	animation-delay: 0s;
 	animation-iteration-count: 1;
 	animation-direction: normal;
 	animation-fill-mode: forwards;
 	animation-play-state: running;
`
