import { useEffect, useRef } from 'react';
import useFocus from '../../hooks/useFocus';

jest.mock('react');

describe('useFocus', () => {
	const registerEventDependencies = [];
	const registerEvent = jest.fn();

	const addEventListenerMock = jest.fn();

	beforeEach(() => {
		window.addEventListener = addEventListenerMock;

		useRef.mockImplementation((initialValue) => ({
			current: initialValue,
		}));

		useEffect.mockImplementation((method, dependencies) => {
			registerEvent();
			method();
			registerEventDependencies.push(...dependencies);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();

		registerEventDependencies.splice(0);
	});

	it('returns an object with a current property of boolean type', () => {
		// Arrange
		const initialRefState = true;
		const expectedRef = {
			current: true,
		};

		// Act
		const result = useFocus();

		// Assert
		expect(useRef).toHaveBeenCalledTimes(1);
		expect(useRef).toHaveBeenCalledWith(initialRefState);
		expect(result).toEqual(expectedRef);
	});

	it('registerEvent is called with an empty dependency array', () => {
		// Arrange
		const dependencies = [];

		// Act
		useFocus();

		// Assert
		expect(registerEvent).toHaveBeenCalledTimes(1);
		expect(registerEventDependencies).toEqual(dependencies);
	});

	it('registerEvent calls addEventListener on window with focus event and a handler', () => {
		// Act
		useFocus();

		// Assert
		expect(addEventListenerMock).toHaveBeenNthCalledWith(
			1,
			'focus',
			expect.any(Function)
		);
	});

	it('registerEvent calls addEventListener on window with focus event and a handler', () => {
		// Act
		useFocus();

		// Assert
		expect(addEventListenerMock).toHaveBeenNthCalledWith(
			2,
			'blur',
			expect.any(Function)
		);
	});

	it('event handler for focus event changes hasFocus.current to true', () => {
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

	it('event handler for blur event changes hasFocus.current to false', () => {
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
