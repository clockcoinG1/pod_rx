// BEGINNING OF FILE: Transcribe.jsx
import * as React from 'react';
import styled from 'styled-components';

const UrlForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
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
const FormTitle = styled.h1`
	font-size: 2.5rem;
	color: #333;
	margin-bottom: 2rem;
`;

// styled component for the form button
const FormButton = styled.button`
	width: 100%;
	padding: 1rem;
	border: none;
	border-radius: 0.5rem;
	background-color: #333;
	color: #fff;
	font-size: 1.6rem;
	cursor: pointer;
	transition: all 0.2s;
	&:hover {
		background-color: #444;
	}
`;

const AudioForm = ({ handleSubmit, handleFileChange }) => {
	return (
		<form id='audio-form' onSubmit={handleSubmit}>
			<label>
				Upload audio file:
				<input type='file' id='audio-file' onChange={handleFileChange} />
			</label>
			<input type='submit' value='Submit' />
		</form>
	);
};

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
	AudioForm = ({ handleSubmit, handleFileChange }) => {
		return (
			<form id='audio-form' onSubmit={handleSubmit}>
				<label>
					Upload audio file:
					<input type='file' id='audio-file' onChange={handleFileChange} />
				</label>
				<input type='submit' value='Submit' />
			</form>
		);
	};

	handleSubmit(event) {
		event.preventDefault();
		var formData = new FormData();
		formData.append('file', this.state.file);

		var request = new XMLHttpRequest();
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.open('POST', 'http://localhost:8833/t', true);
		request.responseType = 'json';
		request.onload = () => {
			if (request.status === 200) {
				var fileName = request.response;
				console.log(request.response);
				this.setState({
					response: <p>File uploaded: {fileName.file}</p>,
				});
				var requestStream = new XMLHttpRequest();
				requestStream.open('GET', '/transcribe?=' + fileName.file);
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
			console.log(event.target.response);
			this.setState({
				response: <p>{event.target.response}</p>,
			});
		};
		request.send(formData);
	}

	render() {
		return (
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
				<div id='response'>{this.state.response}</div>
			</FormContainer>
		);
	}
}

export default Transcribe;

/* END OF FILE: Transcribe.tsx */

/* BEGINNING OF FILE: Results.tsx */
// TODO: make the transcription response component, should show loading state, and output the transcript in a very clean output box.
