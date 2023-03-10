import { FC } from 'react';
import styled from 'styled-components';

// Define the prop types using an interface
interface DisplayTranscriptProps {
	response?: string;
	marginTop?: string; // Add marginTop as an optional prop
}

const Container = styled.div<{ marginTop?: string }>`
  background-color: #f6f8fa;
  border-radius: 8px;
  padding: 24px;
  margin-top: ${ props => props.marginTop };
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #1a1d1f;
  margin-bottom: 16px;
`;

const Text = styled.p`
  font-size: 18px;
  color: #1a1d1f;
`;

// Use the FC type for the function component
const DisplayTranscript: FC<DisplayTranscriptProps> = ( { response, marginTop } ) => {

	// Set a default value for marginTop if it's not provided
	const marginTopValue = marginTop || "24px";

	return (
		<Container marginTop={ marginTopValue }>
			{ response ? (
				<>
					<Title>Transcription Result</Title>
					<Text>{ response }</Text>
				</>
			) : (
				<Title>No transcription to display</Title>
			) }
		</Container>
	);
};

export default DisplayTranscript;