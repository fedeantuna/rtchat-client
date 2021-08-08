import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Bubble from './Bubble';

const Bubbles = () => {
	const [bubbleStyles, setBubbleStyles] = useState([]);

	const getRandomInt = (min, max) => {
		const minValue = Math.ceil(min);
		const maxValue = Math.floor(max) + 1;
		return Math.floor(Math.random() * (maxValue - minValue) + minValue);
	};

	useEffect(() => {
		const styles = [];

		const bubbleCount = process.env.REACT_APP_BUBBLE_COUNT;
		for (let i = 0; i < bubbleCount; i++) {
			const diameter = getRandomInt(15, 90);
			const left = getRandomInt(10, 80);
			const animationDuration = getRandomInt(5, 12);
			const animationDelay = getRandomInt(0, 4);

			const bubbleStyle = {
				width: `${diameter}px`,
				height: `${diameter}px`,
				left: `${left}%`,
				animationDuration: `${animationDuration}s`,
				animationDelay: `${animationDelay}s`,
			};

			styles.push(bubbleStyle);
		}

		setBubbleStyles(styles);
	}, []);

	return (
		<div className='absolute w-full h-full z-0 overflow-hidden top-0 left-0'>
			{bubbleStyles.map((bs) => (
				<Bubble key={uuidv4()} style={bs} />
			))}
		</div>
	);
};

export default Bubbles;
