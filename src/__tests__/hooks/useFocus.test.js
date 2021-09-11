import { useEffect, useRef } from 'react';
import useFocus from '../../hooks/useFocus';

jest.mock('react');

describe('useFocus', () => {
	const useEffectDeps = [];
	const addEventListenerMock = jest.fn();

	beforeEach(() => {
		window.addEventListener = addEventListenerMock;

		useRef.mockImplementation((initialValue) => ({
			current: initialValue,
		}));

		useEffect.mockImplementation((func, deps) => {
			func();
			useEffectDeps.push(...deps);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();

		useEffectDeps.splice(0);
	});

	it('returns an object with a current property of boolean type', () => {
		// Arrange
		const expectedRef = {
			current: true,
		};

		// Act
		const result = useFocus();

		// Assert
		expect(result).toEqual(expectedRef);
	});

	it('calls useEffect with an empty dependency array', () => {
		// Arrange
		const dependencies = [];

		// Act
		useFocus();

		// Assert
		expect(useEffect).toHaveBeenCalledTimes(1);
		expect(useEffectDeps).toEqual(dependencies);
	});

	it('useEffect calls addEventListener on window with focus event and a handler', () => {
		// Act
		useFocus();

		// Assert
		expect(addEventListenerMock).toHaveBeenNthCalledWith(
			1,
			'focus',
			expect.any(Function)
		);
	});

	it('useEffect calls addEventListener on window with focus event and a handler', () => {
		// Act
		useFocus();

		// Assert
		expect(addEventListenerMock).toHaveBeenNthCalledWith(
			2,
			'blur',
			expect.any(Function)
		);
	});

	it('useEffect event handler for focus event changes hasFocus.current to true', () => {
		// Arrange
		const expectedRef = {
			current: true,
		};
		addEventListenerMock.mockImplementation((eventName, eventHandler) => {
			if (eventName === 'focus') {
				eventHandler();
			}
		});

		// Act
		const result = useFocus();

		// Arrange
		expect(result).toEqual(expectedRef);
	});

	it('useEffect event handler for blur event changes hasFocus.current to false', () => {
		// Arrange
		const expectedRef = {
			current: false,
		};
		addEventListenerMock.mockImplementation((eventName, eventHandler) => {
			if (eventName === 'blur') {
				eventHandler();
			}
		});

		// Act
		const result = useFocus();

		// Arrange
		expect(result).toEqual(expectedRef);
	});
});
