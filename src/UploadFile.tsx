import { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import styled from 'styled-components';

const OutputLine = styled.div`
  display: flex;
  align-items:;
  margin-bottom: 6px;
`;

const LineNumber = styled.div`
  margin-right: 6px;
  font-weight: bold;
  color: gray;
`;

const LineText = styled.div`
  overflow-wrap: break-word;
`;

export default function OutputBox() {
	const [transcript, setTranscript] = useState( [] );
	const [isLoading, setIsLoading] = useState( true );
	const [hasError, setHasError] = useState( false );
	const virtuosoRef = useRef( null );
	const [showButton, setShowButton] = useState( false );
	const showButtonTimeout = 500; // in milliseconds

	useEffect( () => {
		async function fetchData() {
			try {
				const response = await fetch( '/api/transcribe' );
				if ( !response.ok ) {
					throw new Error( 'Failed to fetch transcript' );
				}
				const reader = response.body.getReader();
				let chunk = '';
				let transcriptChunks = [];

				while ( true ) {
					const { done, value } = await reader.read();
					if ( done ) {
						break;
					}
					chunk += value;
					if ( chunk.includes( '\n' ) ) {
						const split = chunk.split( '\n' );
						split.forEach( ( str, i ) => {
							if ( i === split.length - 1 ) {
								chunk = str;
							} else {
								transcriptChunks.push( str );
							}
						} );
					}
				}

				setTranscript( transcriptChunks );
				setIsLoading( false );
			} catch ( error ) {
				console.error( error );
				setHasError( true );
			}
		}
		fetchData();
	}, [] );

	const toggleBg = ( index ) => {
		return index % 2 === 0 ? 'lightgray' : 'white';
	};

	const handleShowButtonTimeout = () => {
		setShowButton( !virtuosoRef.current?.isAtBottom() );
	};

	useEffect( () => {
		const handleScroll = () => {
			setShowButton( !virtuosoRef.current?.isAtBottom() );
		};
		const showButtonTimeoutId = setTimeout( handleShowButtonTimeout, showButtonTimeout );
		if ( virtuosoRef.current ) {
			virtuosoRef.current.addOnScrollListener( handleScroll );
		}
		return () => {
			clearTimeout( showButtonTimeoutId );
			if ( virtuosoRef.current ) {
				virtuosoRef.current.removeOnScrollListener( handleScroll );
			}
		};
	}, [showButtonTimeout] );

	const scrollToBottom = () => {
		virtuosoRef.current?.scrollToIndex( { index: transcript.length - 1, behavior: 'smooth' } );
	};

	return (
		<>
			{ hasError && <div>Error fetching transcript</div> }
			{ isLoading && <div>Loading transcript...</div> }
			{ !isLoading && !hasError && (
				<>
					<Virtuoso
						style={ { height: '400px', marginBottom: '10px' } }
						ref={ virtuosoRef }
						data={ transcript }
						itemContent={ ( index, segment ) => {
							return (
								<OutputLine>
									<LineNumber>{ index + 1 }</LineNumber>
									<LineText>{ segment }</LineText>
								</OutputLine>
							);
						} }
					/>
					<div style={ { textAlign: 'right' } }>
						{ showButton && (
							<button onClick={ scrollToBottom } style={ { marginRight: '10px' } }>
								Scroll to Bottom
							</button>
						) }
					</div>
				</>
			) }
		</>
	);
}