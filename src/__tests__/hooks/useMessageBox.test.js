import React, { useEffect } from 'react';
import useMessageBox from '../../hooks/useMessageBox';

jest.mock('react');

describe('useMessageBox', () => {
	const useEffectDeps = [];
	const focusMock = jest.fn();

	const messageBoxRefMock = {
		current: {
			focus: focusMock,
		},
	};

	beforeEach(() => {
		React.createRef.mockReturnValue(messageBoxRefMock);

		useEffect.mockImplementation((func, deps) => {
			func();
			useEffectDeps.push(...deps);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();

		useEffectDeps.splice(0);
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

	it('calls useEffect with messageBoxRef dependency', () => {
		// Arrange
		const dependencies = [messageBoxRefMock];

		// Act
		useMessageBox();

		// Assert
		expect(useEffect).toBeCalledTimes(1);
		expect(useEffectDeps).toEqual(dependencies);
	});

	it('useEffect calls sets focus on message box', () => {
		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(1);
	});

	it('useEffect does nothing if messageBoxRef is null', () => {
		// Arrange
		React.createRef.mockReturnValue(null);

		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(0);
	});

	it('useEffect does nothing if messageBoxRef.current is null', () => {
		// Arrange
		React.createRef.mockReturnValue({ current: null });

		// Act
		useMessageBox();

		// Assert
		expect(focusMock).toHaveBeenCalledTimes(0);
	});
});
