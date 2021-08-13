import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Bubble from './Bubble';
import useBubbles from '../hooks/useBubbles';

const Bubbles = () => {
	const bubbles = useBubbles();

	return (
		<div className='absolute w-full h-full z-0 overflow-hidden top-0 left-0'>
			{bubbles.map((bs) => (
				<Bubble key={uuidv4()} style={bs} />
			))}
		</div>
	);
};

export default Bubbles;
