import { useEffect, useState } from 'react';
import getRandomInt from '../utils/getRandomInt';

const useBubbles = () => {
	const [bubbles, setBubbles] = useState([]);

	useEffect(() => {
		const generateBubbles = () => {
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

			setBubbles(styles);
		};

		generateBubbles();
	}, []);

	return bubbles;
};

export default useBubbles;
