import styled from 'styled-components';

export const Row = styled.div`
	padding: 0 2em;

	@media ${props => props.theme.mediaQueries.land}{
		width: 80%;
		margin:0 auto;
	}
	@media ${props => props.theme.mediaQueries.desktop}{
		max-width: 950px ;
		width: 100%;
		margin:0 auto;
	}
	
`