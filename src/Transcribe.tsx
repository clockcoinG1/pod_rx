// BEGINNING OF FILE: Transcribe.jsx

import * as React from 'react';
import styled from 'styled-components';

class Transcribe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			url: null,
			response: null,
			error: null,
		};
		this.handleFileChange = this.handleFileChange.bind(this);
		this.handleUrlChange = this.handleUrlChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
	}

	handleFileChange(event) {
		this.setState({
			file: event.target.files[0],
		});
	}

	handleUrlChange(event) {
		this.setState({
			url: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		var formData = new FormData();
		formData.append('file', this.state.file);

		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:8833/t', true);
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.responseType = 'json';
		request.onload = () => {
			if (request.status === 200) {
				var fileName = request.response;
				console.log(request.response);
				this.setState({
					response: <p>File uploaded: {fileName.file}</p>,
				});

				var requestStream = new XMLHttpRequest();
				requestStream.open('GET', 'http://localhost:8833/transcribe?=' + fileName.file);
				requestStream.setRequestHeader('Access-Control-Allow-Origin', '*');
				requestStream.onprogress = (event) => {
					this.setState({
						response: <p>{event.target.response}</p>,
					});
				};
				requestStream.send();
			} else {
				this.setState({
					response: 'Error uploading file',
				});
			}
		};
		request.send(formData);
	}

	handleUrlSubmit(event) {
		event.preventDefault();
		var formData = new FormData();
		formData.append('url', this.state.url);

		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:8833/url', true);
		request.onprogress = (event) => {
			let transcript = event.target.response?.split(/\n/);
			console.log('res: %s', transcript);
			this.setState({
				response: transcript,
			});
		};
		request.send(formData);
	}
	render() {
		return (
			<div>
				<TranscriptRes>
					<FormContainer>
						<UrlForm id='audio-form' onSubmit={this.handleSubmit}>
							<label>
								Upload audio file:
								<input type='file' id='audio-file' onChange={this.handleFileChange} />
							</label>
							<input type='submit' value='Submit' />
						</UrlForm>
						<UrlForm onSubmit={this.handleUrlSubmit}>
							<label>
								Enter URL:
								<input type='text' id='url-full' onChange={this.handleUrlChange} />
							</label>
							<input type='submit' value='Submit' />
						</UrlForm>
					</FormContainer>
				</TranscriptRes>
				<div
					id='transcribe'
					style={{
						flex: '1 1 auto',
						overflowY: 'scroll',
						maxHeight: '50vh',
						maxWidth: '50vh',
						minHeight: '50vh',
						minWidth: '50vh',
						color: '#000000',
						padding: 10,
					}}>
					{this.state.response ? this.state.response : `Add a link or file to begin...`}
				</div>
				{/* {this.state.response && <OutputBox transcript={this.state.response} />} */}
			</div>
		);
	}
}

const TranscriptRes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 auto;
	width: 80vw;
	height: 100%;
	background-color: #f2f2f2;
	padding: 2rem;
	#response {
		width: 100%;
		height: 100%;
		overflow: scroll;
		background-color: #f2f2f2;
		padding: 2rem;
	}
`;

const UrlForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80vw;
	height: 100%;
	background-color: #f2f2f2;
	border-radius: 5px;
	padding: 20px;
	box-sizing: border-box;
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
	margin: 20px;
	label {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		font-size: 1.5em;
		font-weight: bold;
		color: #333;
		input {
			width: 100%;
			height: 30px;
			border-radius: 5px;
			border: 1px solid #333;
			padding: 5px;
			box-sizing: border-box;
			margin: 10px;
		}
	}
	input[type='submit'] {
		width: 100%;
		height: 30px;
		border-radius: 5px;
		border: 1px solid #333;
		padding: 5px;
		box-sizing: border-box;
		margin: 10px;
		background-color: #333;
		color: #fff;
		font-size: 1.2em;
		font-weight: bold;
		cursor: pointer;
	}
`;

// styled component for the parent container
const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #f2f2f2;
`;

// styled component for the form title
const TranscriptResponse = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80vw;
	height: 50%;
	background-color: #f2f2f2;
	border-radius: 5px;
	padding: 20px;
	box-sizing: border-box;
	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
	margin: 20px;
`;

export default Transcribe;

/* END OF FILE: Transcribe.tsx */

/* BEGINNING OF FILE: Results.tsx */
// TODO: make the transcription response component, should show loading state, and output the transcript in a very clean output box.

// TODO: Add chat box for interacting with the llm
// add container for list
