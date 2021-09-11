import React, { useEffect } from 'react';
import useMessageBox from '../../hooks/useMessageBox';

jest.mock('react');

describe('useMessageBox', () => {
	const setFocusOnMessageBoxDependencies = [];
	const setFocusOnMessageBox = jest.fn();

	const focusMock = jest.fn();

	const messageBoxRefMock = {
		current: {
			focus: focusMock,
		},
	};

	beforeEach(() => {
		React.createRef.mockReturnValue(messageBoxRefMock);

		useEffect.mockImplementation((method, dependencies) => {
			setFocusOnMessageBox();
			method();
			setFocusOnMessageBoxDependencies.push(...dependencies);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();

		setFocusOnMessageBoxDependencies.splice(0);
	});

	it('returns a an object containing the message box ref', () => {
		// Arrange
		const expectedMessageBoxRef = {
			messageBoxRef: messageBoxRefMock,
		};

		// Act
		const messageBoxRef = useMessageBox();

		// Assert
		expect(React.createRef).toHaveBeenCalledTimes(1);
		expect(messageBoxRef).toEqual(expectedMessageBoxRef);
	});

	it('setFocusOnMessageBox with messageBoxRef dependency', () => {
		// Arrange
		const dependencies = [messageBoxRefMock];

		// Act
		useMessageBox();

		// Assert
		expect(setFocusOnMessageBox).toBeCalledTimes(1);
		expect(setFocusOnMessageBoxDependencies).toEqual(dependencies);
	});

	it('setFocusOnMessageBox calls set focus on message box function', () => {
		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(1);
	});

	it('setFocusOnMessageBox does nothing if messageBoxRef is null', () => {
		// Arrange
		React.createRef.mockReturnValue(null);

		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(0);
	});

	it('setFocusOnMessageBox does nothing if messageBoxRef.current is null', () => {
		// Arrange
		React.createRef.mockReturnValue({ current: null });

		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(0);
	});
});
