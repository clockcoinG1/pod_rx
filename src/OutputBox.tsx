// BEGINNING OF FILE: Transcribe.jsx
import styled from 'styled-components';
/* TODO: create a styled transcript output box
				- vertical scrolling with a responsive height and width
				- autoscroll as transcript http stream comes in
				- line numbers and clean interface
*/

const OutputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	border-radius: 5px;
	border: 1px solid #e3e3e3;
	padding: 10px;
	margin: 10px;
	overflow: auto;
`;

const Output = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	border-radius: 5px;
	border: 1px solid #e3e3e3;
	padding: 10px;
	margin: 10px;
	overflow: auto;
`;

const OutputLine = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	border-radius: 5px;
	border: 1px solid #e3e3e3;
	padding: 10px;
	margin: 10px;
	overflow: auto;
`;

const LineNumber = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	border-radius: 5px;
	border: 1px solid #e3e3e3;
	padding: 10px;
	margin: 10px;
	overflow: auto;
`;

const LineText = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	border-radius: 5px;
	border: 1px solid #e3e3e3;
	padding: 10px;
	margin: 10px;
	overflow: auto;
`;

const TranscriptOutput = (props) => {
	const { transcript } = props;
	const transcriptLines = transcript.split('\n');
	const transcriptOutput = transcriptLines.map((line, index) => {
		return (
			<OutputLine key={index}>
				<LineNumber>{index + 1}</LineNumber>
				<LineText>{line}</LineText>
			</OutputLine>
		);
	});
	return (
		<OutputBox>
			<Output>{transcriptOutput}</Output>
		</OutputBox>
	);
};

export default TranscriptOutput;
