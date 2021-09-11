import { useEffect, useState } from 'react';
import useBubbles from '../../hooks/useBubbles';
import getRandomInt from '../../utils/getRandomInt';

jest.mock('react');
jest.mock('../../utils/getRandomInt');

describe('useBubbles', () => {
	const useEffectDeps = [];
	const setBubbles = jest.fn();

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

	beforeEach(() => {
		process.env.REACT_APP_BUBBLE_COUNT = bubbleCount;

		useState.mockImplementation((initialState) => [
			initialState,
			setBubbles,
		]);
		useEffect.mockImplementation((func, deps) => {
			func();
			useEffectDeps.push(...deps);
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

		useEffectDeps.splice(0);
	});

	it('returns state', () => {
		// Arrange
		const initialState = [];

		// Act
		const result = useBubbles();

		// Assert
		expect(result).toEqual(initialState);
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
		const dependencies = [];

		// Act
		useBubbles();

		// Assert
		expect(useEffect).toHaveBeenCalledTimes(1);
		expect(useEffectDeps).toEqual(dependencies);
	});

	it('useEffect adds styles to bubbles', () => {
		// Assert
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

		const styles = [firstBubble, secondBubble, thirdBubble];

		// Act
		useBubbles();

		// Assert
		expect(getRandomInt).toHaveBeenCalledTimes(12);
		expect(setBubbles).toHaveBeenCalledTimes(1);
		expect(setBubbles).toHaveBeenCalledWith(styles);
	});
});
