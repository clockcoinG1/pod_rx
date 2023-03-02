import { useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';

const toggleBg = (index) => {
	if (index % 2 === 0) {
		return 'green';
	} else {
		return 'yellow';
	}
};

export default function OutputBox({ transcribe }) {
	const [transcript, setTranscript] = useState(transcribe);
	const appendInterval = useRef(null);
	const virtuosoRef = useRef(null);
	const [atBottom, setAtBottom] = useState(false);
	const showButtonTimeoutRef = useRef(null);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		return () => {
			clearInterval(appendInterval.current);
			clearTimeout(showButtonTimeoutRef.current);
		};
	}, []);

	useEffect(() => {
		clearTimeout(showButtonTimeoutRef.current);
		if (!atBottom) {
			showButtonTimeoutRef.current = setTimeout(() => setShowButton(true), 500);
		} else {
			setShowButton(false);
		}
	}, [atBottom, setShowButton]);

	return (
		<>
			<Virtuoso
				style={{ height: 400 }}
				ref={virtuosoRef}
				initialTopMostItemIndex={999}
				data={transcript}
				itemContent={(index, segment) => {
					console.log(`IDX : ${index}; SEGMENT: ${segment}`);
					return (
						<div style={{ backgroundColor: toggleBg(index), padding: '1rem 0.5rem' }}>
							<h4>{index}</h4>
							<div style={{ marginTop: '1rem' }}>{segment}</div>
						</div>
					);
				}}
				followOutput={'auto'}
			/>
			{showButton && (
				<buttons
					onClick={() =>
						virtuosoRef.current.scrollToIndex({ index: transcript.length - 1, behavior: 'smooth' })
					}
					style={{ float: 'right', transform: 'translate(-1rem, -2rem)' }}>
					Bottom
				</button>
			)}
		</>
	);
}
