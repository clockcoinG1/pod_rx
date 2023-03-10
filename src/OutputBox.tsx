import { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import styled from 'styled-components';

const OutputLine = styled.div`
  display: flex;
  align-items: center;
  margin: 5px;
`;
const LineNumber = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;
const BubbleContainer = styled.div`
  padding: 10px;
  background-color: lightblue;
  border-radius: 10px;
`;
const LineText = styled( BubbleContainer )`
  display: inline-block;
`;

export default function OutputBox( { transcript } ) {
	const [atBottom, setAtBottom] = useState( false );
	const virtuosoRef = useRef( null );
	const [showButton, setShowButton] = useState( false );
	const showButtonTimeout = 500; // in milliseconds

	useEffect( () => {
		const scrollToBottom = () => {
			virtuosoRef.current.scrollToIndex( { index: transcript.length - 1, behavior: 'smooth' } );
			setAtBottom( true );
		};
		if ( virtuosoRef.current ) {
			scrollToBottom();
		}
	}, [transcript] );

	const toggleBg = ( index ) => {
		return index % 2 === 0 ? 'lightgray' : 'white';
	};

	const handleScroll = ( event, scrollTop, _, scrollBottom ) => {
		if ( scrollTop === 0 && !showButton ) {
			setShowButton( true );
			setAtBottom( false );
		} else if ( scrollBottom === 0 ) {
			setShowButton( false );
			setAtBottom( true );
		}
	};

	const scrollToBottom = () => {
		virtuosoRef.current.scrollToIndex( { index: transcript.length - 1, behavior: 'smooth' } );
	};

	const handleShowButtonTimeout = () => {
		setShowButton( !atBottom );
	};

	useEffect( () => {
		const showButtonTimeoutId = setTimeout( handleShowButtonTimeout, showButtonTimeout );
		return () => clearTimeout( showButtonTimeoutId );
	}, [showButtonTimeout, atBottom] );

	return (
		<>
			<Virtuoso
				style={ { height: '400px', marginBottom: '10px' } }
				ref={ virtuosoRef }
				initialTopMostItemIndex={ 999 }
				data={ transcript }
				itemContent={ ( index, segment ) => {
					return (
						<OutputLine>
							<LineNumber>{ index + 1 }</LineNumber>
							<LineText>{ segment }</LineText>
						</OutputLine>
					);
				} }
				followOutput={ 'auto' }
			// onScroll={ handleScroll }
			/>
			<div style={ { textAlign: 'right' } }>
				{ showButton && (
					<button onClick={ scrollToBottom } style={ { marginRight: '10px' } }>
						Scroll to Bottom
					</button>
				) }
			</div>
		</>
	);
}
