import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Bubble from './Bubble';
import useBubbles from '../hooks/useBubbles';

const Bubbles = () => {
	const bubbles = useBubbles();

	return (
		<div className='overflow-hidden absolute top-0 left-0 z-0 w-full h-full'>
			{bubbles.map((bs) => (
				<Bubble key={uuidv4()} style={bs} />
			))}
		</div>
	);
};

export default Bubbles;
