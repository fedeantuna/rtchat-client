import React, { useEffect, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';
import useSignalR from '../../hooks/useSignalR';
import UserProfileButton from '../../components/UserProfileButton';
import serverMethod from '../../enums/serverMethod';
import userStatus from '../../enums/userStatus';
import getSyncCurrentUserStatus from '../../clientMethods/getSyncCurrentUserStatus';
import clientMethod from '../../enums/clientMethod';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useSignalR');
jest.mock('../../clientMethods/getSyncCurrentUserStatus');

describe('<UserProfileButton />', () => {
	const registerSyncCurrentUserStatusDependencies = [];
	const registerSyncCurrentUserStatusMethod = jest.fn();
	const unregisterSyncCurrentUserStatusMethod = jest.fn();

	const syncCurrentUserStatusMock = jest.fn();
	const setStatusMock = jest.fn();
	const logoutMock = jest.fn();

	const invoke = jest.fn();
	const on = jest.fn();
	const off = jest.fn();

	const connectionMock = {
		invoke,
		on,
		off,
	};

	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
	};

	beforeEach(() => {
		useSignalR.mockReturnValue({ connection: connectionMock });

		useEffect.mockImplementationOnce((method, dependencies) => {
			registerSyncCurrentUserStatusMethod();
			const registerSyncCurrentUserStatusMethodResult = method();
			unregisterSyncCurrentUserStatusMethod.mockImplementation(
				registerSyncCurrentUserStatusMethodResult
			);
			registerSyncCurrentUserStatusDependencies.push(...dependencies);
		});

		useState.mockImplementationOnce((initialState) => [
			initialState,
			setStatusMock,
		]);

		useAuth0.mockReturnValue({ user, logout: logoutMock });

		getSyncCurrentUserStatus.mockReturnValue(syncCurrentUserStatusMock);
	});

	afterEach(() => {
		jest.clearAllMocks();

		registerSyncCurrentUserStatusDependencies.splice(0);
	});

	test('renders user profile button', () => {
		// Act
		render(<UserProfileButton />);

		// Assert
		expect(screen.getByTestId('user-profile-button')).toBeInTheDocument();
	});

	test('renders profile picture', () => {
		// Arrange
		const profilePictureId = `profile-picture-user-profile-button-${user.sub}`;

		// Act
		render(<UserProfileButton />);

		// Assert
		expect(screen.getByTestId(profilePictureId)).toBeInTheDocument();
	});

	test('renders status change buttons', () => {
		// Arrange
		const onlineButtonTestId = 'status-change-button-online';
		const busyButtonTestId = 'status-change-button-busy';
		const awayButtonTestId = 'status-change-button-away';
		const offlineButtonTestId = 'status-change-button-offline';

		// Act
		render(<UserProfileButton />);

		// Assert
		expect(screen.getByTestId(onlineButtonTestId)).toBeInTheDocument();
		expect(screen.getByTestId(busyButtonTestId)).toBeInTheDocument();
		expect(screen.getByTestId(awayButtonTestId)).toBeInTheDocument();
		expect(screen.getByTestId(offlineButtonTestId)).toBeInTheDocument();
	});

	test('registerSyncCurrentUserStatusMethod is called and depends on connection and the sync current user status function', () => {
		// Arrange
		const expectedDependencies = [
			connectionMock,
			syncCurrentUserStatusMock,
		];

		// Act
		render(<UserProfileButton />);

		// Assert
		expect(registerSyncCurrentUserStatusMethod).toHaveBeenCalledTimes(1);
		expect(registerSyncCurrentUserStatusDependencies).toEqual(
			expectedDependencies
		);
	});

	test('registerSyncCurrentUserStatusMethod registers the sync current user status method', () => {
		// Arrange
		const method = clientMethod.syncCurrentUserStatus;

		// Act
		render(<UserProfileButton />);

		// Assert
		expect(connectionMock.on).toHaveBeenNthCalledWith(
			1,
			method,
			syncCurrentUserStatusMock
		);
	});

	test('registerSyncCurrentUserStatusMethod returns unregister function for the sync current user status method', () => {
		// Arrange
		const method = clientMethod.syncCurrentUserStatus;

		// Act
		render(<UserProfileButton />);
		unregisterSyncCurrentUserStatusMethod();

		// Assert
		expect(connectionMock.off).toHaveBeenCalledWith(
			method,
			syncCurrentUserStatusMock
		);
	});

	test('change status when user clicks on the status change button', () => {
		// Arrange
		const onlineButtonTestId = 'status-change-button-online';

		render(<UserProfileButton />);

		// Act
		fireEvent.click(screen.getByTestId(onlineButtonTestId));

		// Assert
		expect(invoke).toHaveBeenCalledTimes(1);
		expect(invoke).toHaveBeenCalledWith(
			serverMethod.updateUserStatus,
			userStatus.online
		);
	});

	test('change status when user presses enter on the status change button', () => {
		// Arrange
		const busyButtonTestId = 'status-change-button-busy';

		render(<UserProfileButton />);

		// Act
		fireEvent.keyDown(screen.getByTestId(busyButtonTestId), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(1);
		expect(invoke).toHaveBeenCalledWith(
			serverMethod.updateUserStatus,
			userStatus.busy
		);
	});

	test('change status when user presses space on the status change button', () => {
		// Arrange
		const awayButtonTestId = 'status-change-button-away';

		render(<UserProfileButton />);

		// Act
		fireEvent.keyDown(screen.getByTestId(awayButtonTestId), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(1);
		expect(invoke).toHaveBeenCalledWith(
			serverMethod.updateUserStatus,
			userStatus.away
		);
	});

	test('does nothing when user presses a different key than space and enter on the status change button', () => {
		// Arrange
		const awayButtonTestId = 'status-change-button-away';

		render(<UserProfileButton />);

		// Act
		fireEvent.keyDown(screen.getByTestId(awayButtonTestId), {
			key: 'A',
			charCode: 65,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(0);
		expect(setStatusMock).toHaveBeenCalledTimes(0);
	});

	test('signs out when user clicks on the sign out button', () => {
		// Arrange
		render(<UserProfileButton />);

		const logoutOptions = {
			returnTo: window.location.origin,
		};

		// Act
		fireEvent.click(screen.getByText(/sign out/i));

		// Assert
		expect(logoutMock).toHaveBeenCalledTimes(1);
		expect(logoutMock).toHaveBeenCalledWith(logoutOptions);
	});

	test('signs out when user presses enter on the sign out button', () => {
		// Arrange
		render(<UserProfileButton />);

		const logoutOptions = {
			returnTo: window.location.origin,
		};

		// Act
		fireEvent.keyDown(screen.getByText(/sign out/i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(logoutMock).toHaveBeenCalledTimes(1);
		expect(logoutMock).toHaveBeenCalledWith(logoutOptions);
	});

	test('signs out when user presses space on the sign out button', () => {
		// Arrange
		render(<UserProfileButton />);

		const logoutOptions = {
			returnTo: window.location.origin,
		};

		// Act
		fireEvent.keyDown(screen.getByText(/sign out/i), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(logoutMock).toHaveBeenCalledTimes(1);
		expect(logoutMock).toHaveBeenCalledWith(logoutOptions);
	});

	test('does nothing when user presses a different key than space or enter on the sign out button', () => {
		// Arrange
		render(<UserProfileButton />);

		// Act
		fireEvent.keyDown(screen.getByText(/sign out/i), {
			key: 'A',
			charCode: 65,
		});

		// Assert
		expect(logoutMock).toHaveBeenCalledTimes(0);
	});
});
