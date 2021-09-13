import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Bubble from './Bubble';
import useBubbles from '../hooks/useBubbles';

const Bubbles = () => {
	const bubbles = useBubbles();

	return (
		<div
			data-testid='bubbles'
			className='absolute top-0 left-0 z-0 w-full h-full overflow-hidden'
		>
			{bubbles.map((bs) => {
				const id = uuidv4();
				return <Bubble key={id} id={id} style={bs} />;
			})}
		</div>
	);
};

export default Bubbles;
