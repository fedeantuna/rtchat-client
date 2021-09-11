import { useEffect, useState } from 'react';
import useBubbles from '../../hooks/useBubbles';
import getRandomInt from '../../utils/getRandomInt';

jest.mock('react');
jest.mock('../../utils/getRandomInt');

describe('useBubbles', () => {
	const generateBubblesDependencies = [];
	const generateBubbles = jest.fn();

	const setBubblesMock = jest.fn();

	const bubbleCount = 3;

	const firstBubbleSpecs = {
		diameter: 15,
		left: 10,
		animationDuration: 5,
		animationDelay: 0,
	};
	const secondBubbleSpecs = {
		diameter: 52,
		left: 45,
		animationDuration: 8,
		animationDelay: 2,
	};
	const thirdBubbleSpecs = {
		diameter: 90,
		left: 80,
		animationDuration: 12,
		animationDelay: 4,
	};

	const firstBubble = {
		width: `${firstBubbleSpecs.diameter}px`,
		height: `${firstBubbleSpecs.diameter}px`,
		left: `${firstBubbleSpecs.left}%`,
		animationDuration: `${firstBubbleSpecs.animationDuration}s`,
		animationDelay: `${firstBubbleSpecs.animationDelay}s`,
	};
	const secondBubble = {
		width: `${secondBubbleSpecs.diameter}px`,
		height: `${secondBubbleSpecs.diameter}px`,
		left: `${secondBubbleSpecs.left}%`,
		animationDuration: `${secondBubbleSpecs.animationDuration}s`,
		animationDelay: `${secondBubbleSpecs.animationDelay}s`,
	};
	const thirdBubble = {
		width: `${thirdBubbleSpecs.diameter}px`,
		height: `${thirdBubbleSpecs.diameter}px`,
		left: `${thirdBubbleSpecs.left}%`,
		animationDuration: `${thirdBubbleSpecs.animationDuration}s`,
		animationDelay: `${thirdBubbleSpecs.animationDelay}s`,
	};

	beforeEach(() => {
		process.env.REACT_APP_BUBBLE_COUNT = bubbleCount;

		useState.mockImplementation((initialState) => [
			initialState,
			setBubblesMock,
		]);

		useEffect.mockImplementation((method, dependencies) => {
			generateBubbles();
			method();
			generateBubblesDependencies.push(...dependencies);
		});

		getRandomInt
			.mockReturnValueOnce(firstBubbleSpecs.diameter)
			.mockReturnValueOnce(firstBubbleSpecs.left)
			.mockReturnValueOnce(firstBubbleSpecs.animationDuration)
			.mockReturnValueOnce(firstBubbleSpecs.animationDelay)

			.mockReturnValueOnce(secondBubbleSpecs.diameter)
			.mockReturnValueOnce(secondBubbleSpecs.left)
			.mockReturnValueOnce(secondBubbleSpecs.animationDuration)
			.mockReturnValueOnce(secondBubbleSpecs.animationDelay)

			.mockReturnValueOnce(thirdBubbleSpecs.diameter)
			.mockReturnValueOnce(thirdBubbleSpecs.left)
			.mockReturnValueOnce(thirdBubbleSpecs.animationDuration)
			.mockReturnValueOnce(thirdBubbleSpecs.animationDelay);
	});

	afterEach(() => {
		jest.clearAllMocks();

		generateBubblesDependencies.splice(0);
	});

	it('returns array of bubbles', () => {
		// Arrange
		useState.mockReset();
		useState.mockImplementation(() => [
			[firstBubble, secondBubble, thirdBubble],
			setBubblesMock,
		]);

		const bubbles = [firstBubble, secondBubble, thirdBubble];

		// Act
		const result = useBubbles();

		// Assert
		expect(result).toEqual(bubbles);
	});

	it('calls useState with an empty array as initial state', () => {
		// Assert
		const initialState = [];

		// Act
		useBubbles();

		// Assert
		expect(useState).toHaveBeenCalledTimes(1);
		expect(useState).toHaveBeenCalledWith(initialState);
	});

	it('calls useEffect with an empty dependency array', () => {
		// Assert
		const emptyDependencyArray = [];

		// Act
		useBubbles();

		// Assert
		expect(generateBubbles).toHaveBeenCalledTimes(1);
		expect(generateBubblesDependencies).toEqual(emptyDependencyArray);
	});

	it('useEffect adds styles to bubbles', () => {
		// Assert
		const styles = [firstBubble, secondBubble, thirdBubble];

		// Act
		useBubbles();

		// Assert
		expect(getRandomInt).toHaveBeenCalledTimes(12);
		expect(setBubblesMock).toHaveBeenCalledTimes(1);
		expect(setBubblesMock).toHaveBeenCalledWith(styles);
	});
});
