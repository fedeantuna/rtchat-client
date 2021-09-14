import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { HubConnectionState } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { render, screen } from '@testing-library/react';
import SignalRProvider from '../../components/SignalRProvider';
import buildHubConnection from '../../utils/buildHubConnection';
import { topRightNotification } from '../../models/toastNotificationConfiguration';

jest.mock('react', () => {
	const actualReact = jest.requireActual('react');

	return {
		...actualReact,
		useState: jest.fn(),
		useEffect: jest.fn(),
	};
});
jest.mock('@auth0/auth0-react');
jest.mock('../../utils/buildHubConnection');

describe('<SignalRProvider />', () => {
	const buildConnectionDependencies = [];
	const startConnectionDependencies = [];
	const buildConnection = jest.fn();
	const startConnection = jest.fn();
	const stopConnection = jest.fn();

	const getAccessTokenSilentlyMock = jest.fn();
	const setConnectionMock = jest.fn();

	const start = jest.fn();
	const stop = jest.fn();

	const accessToken = uuidv4();
	const chatAudience = 'chat-audience';
	const hubUrl = 'http://localhost/hub/chat';
	const connectionMock = {
		state: HubConnectionState.Disconnected,
		start,
		stop,
	};

	const toastError = jest.fn();

	beforeEach(() => {
		process.env.REACT_APP_CHAT_AUDIENCE = chatAudience;
		process.env.REACT_APP_HUB_URL = hubUrl;

		getAccessTokenSilentlyMock.mockReturnValue(accessToken);

		useAuth0.mockReturnValue({
			getAccessTokenSilently: getAccessTokenSilentlyMock,
		});

		useState.mockImplementationOnce((initialState) => [
			initialState,
			setConnectionMock,
		]);

		useEffect
			.mockImplementationOnce((method, dependencies) => {
				buildConnection();
				method();
				buildConnectionDependencies.push(...dependencies);
			})
			.mockImplementationOnce((method, dependencies) => {
				startConnection();
				const startConnectionResult = method();
				stopConnection.mockImplementation(startConnectionResult);
				startConnectionDependencies.push(...dependencies);
			});

		buildHubConnection.mockReturnValue(connectionMock);

		toast.error = toastError;
	});

	afterEach(() => {
		jest.clearAllMocks();

		buildConnectionDependencies.splice(0);
		startConnectionDependencies.splice(0);
	});

	test('renders provider with children', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(screen.getByTestId(divTestId)).toBeInTheDocument();
	});

	test('calls build connection with the get access token silently function dependency', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		const expectedDependencies = [getAccessTokenSilentlyMock];
		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(buildConnection).toHaveBeenCalledTimes(1);
		expect(buildConnectionDependencies).toEqual(expectedDependencies);
	});

	test('build connection calls get access token silently with audience when connection is null', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		const getAccessTokenSilentlyOptions = {
			audience: chatAudience,
		};

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(getAccessTokenSilentlyMock).toHaveBeenCalledTimes(1);
		expect(getAccessTokenSilentlyMock).toHaveBeenCalledWith(
			getAccessTokenSilentlyOptions
		);
	});

	test('build connection builds the new connection when connection is null', async () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		// Act
		await render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(buildHubConnection).toHaveBeenCalledTimes(1);
		expect(buildHubConnection).toHaveBeenCalledWith(accessToken);
	});

	test('build connection builds the new connection when connection is null', async () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		// Act
		await render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(setConnectionMock).toHaveBeenCalledTimes(1);
		expect(setConnectionMock).toHaveBeenCalledWith(connectionMock);
	});

	test('build does nothing when connection is not null', async () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			connectionMock,
			setConnectionMock,
		]);

		// Act
		await render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(getAccessTokenSilentlyMock).toHaveBeenCalledTimes(0);
		expect(buildHubConnection).toHaveBeenCalledTimes(0);
		expect(setConnectionMock).toHaveBeenCalledTimes(0);
	});

	test('displays error when connection is not null and get access token silently fails', async () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		getAccessTokenSilentlyMock.mockReset();
		getAccessTokenSilentlyMock.mockImplementation(() => {
			throw new Error();
		});

		// Act
		await render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(getAccessTokenSilentlyMock).toHaveBeenCalledTimes(1);
		expect(buildHubConnection).toHaveBeenCalledTimes(0);
		expect(setConnectionMock).toHaveBeenCalledTimes(0);
		expect(toastError).toHaveBeenCalledTimes(1);
		expect(toastError).toHaveBeenCalledWith(
			'Failed to create connection with server. Refresh the page.',
			topRightNotification
		);
	});

	test('displays error when connection is not null and build hub connection fails', async () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		buildHubConnection.mockReset();
		buildHubConnection.mockImplementation(() => {
			throw new Error();
		});

		// Act
		await render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(getAccessTokenSilentlyMock).toHaveBeenCalledTimes(1);
		expect(buildHubConnection).toHaveBeenCalledTimes(1);
		expect(setConnectionMock).toHaveBeenCalledTimes(0);
		expect(toastError).toHaveBeenCalledTimes(1);
		expect(toastError).toHaveBeenCalledWith(
			'Failed to create connection with server. Refresh the page.',
			topRightNotification
		);
	});

	test('start connection calls start on connection when connection is not null and connection state is disconnected', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			connectionMock,
			setConnectionMock,
		]);

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(start).toHaveBeenCalledTimes(1);
	});

	test('start connection does nothing if connection state is not disconnected', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			{ ...connectionMock, state: HubConnectionState.Connected },
			setConnectionMock,
		]);

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(start).toHaveBeenCalledTimes(0);
	});

	test('start connection does nothing if connection state is null', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(start).toHaveBeenCalledTimes(0);
	});

	test('start connection displays error if start fails', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		start.mockImplementation(() => {
			throw new Error();
		});
		useState.mockImplementationOnce(() => [
			connectionMock,
			setConnectionMock,
		]);

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);

		// Assert
		expect(start).toHaveBeenCalledTimes(1);
		expect(toastError).toHaveBeenCalledTimes(1);
		expect(toastError).toHaveBeenCalledWith(
			'Failed to start connection with server. Refresh the page.',
			topRightNotification
		);
	});

	test('start connection returns stop connection', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			{ ...connectionMock, state: HubConnectionState.Connected },
			setConnectionMock,
		]);

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);
		stopConnection();

		// Assert
		expect(stop).toHaveBeenCalledTimes(1);
	});

	test('stop connection does nothing if connection state is disconnected', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			{ ...connectionMock, state: HubConnectionState.Disconnected },
			setConnectionMock,
		]);

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);
		stopConnection();

		// Assert
		expect(stop).toHaveBeenCalledTimes(0);
	});

	test('stop connection does nothing if connection state is null', () => {
		// Arrange
		const divTestId = 'signal-r-provider-test-div';
		const div = <div data-testid={divTestId} />;

		// Act
		render(<SignalRProvider>{div}</SignalRProvider>);
		stopConnection();

		// Assert
		expect(stop).toHaveBeenCalledTimes(0);
	});
});
