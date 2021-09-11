import React from 'react';
import { SignalRContext } from '../../components/SignalRProvider';
import useSignalR from '../../hooks/useSignalR';

jest.mock('react');

describe('useSignalR', () => {
	const useContextMock = jest.fn();

	beforeEach(() => {
		React.useContext = useContextMock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('calls React.useContext with SignalRContext', () => {
		// Arrange

		// Act
		useSignalR();

		// Assert
		expect(useContextMock).toHaveBeenCalledTimes(1);
		expect(useContextMock).toHaveBeenCalledWith(SignalRContext);
	});
});
