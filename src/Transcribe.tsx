import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import DisplayTranscript from './DisplayTranscript';
import UploadFile from './UploadFile';

const TranscriptRes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

const LoadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #636767;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: ${ LoadingAnimation } 1s linear infinite;
  margin-bottom: 1rem;
`;

const Transcribe = () => {
	const [response, setResponse] = useState( null );

	return (
		<TranscriptRes>
			<UploadFile />
			{ !response ? (
				<Loading />
			) : (
				<DisplayTranscript response={ response } />
			) }
		</TranscriptRes>
	);
};

export default Transcribe;
// EOF of 'src/components/Transcribe.js'

//	BOF of 'src/components/DisplayTranscript.js'

/*
	`DisplayTranscript` component will only be responsible for displaying the transcript received from the response.

	This separation of concerns will make the code more organized and easier to maintain.

*/
