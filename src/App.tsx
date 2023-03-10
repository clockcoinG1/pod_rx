import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Header from './Header';
import Transcribe from './Transcribe';

const App: React.FC = () => {
	return (
		<div className={ styles.app }>
			<Router>
				<Header />
				<Routes>
					<Route path="/" Component={ Transcribe } />
					<Route path="/about" Component={ About } />
					<Route path="/contact" Component={ Contact } />
					<Route Component={ NotFound } />
				</Routes>
			</Router>
		</div>
	);
};

const About: React.FC = () => {
	return <h1>About Page</h1>;
};

const Contact: React.FC = () => {
	return <h1>Contact Page</h1>;
};

const NotFound: React.FC = () => {
	return <h1>404 Not Found</h1>;
};

export default App;