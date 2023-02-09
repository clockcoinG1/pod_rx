import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const HeaderContainer = styled.div`
	font-family: 'Roboto', sans-serif;
	background-color: #282c34;
	min-height: 10vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
	animation: ${fadeIn} 1s ease-in;
`;

const Header = () => {
	return (
		<HeaderContainer>
			<h1>Voice Transcription</h1>
		</HeaderContainer>
	);
};

export default Header;
