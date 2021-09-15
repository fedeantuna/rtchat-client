import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import getReceiveMessage from '../../clientMethods/getReceiveMessage';
import getStartConversation from '../../clientMethods/getStartConversation';
import getUpdateUserStatus from '../../clientMethods/getUpdateUserStatus';
import clientMethod from '../../enums/clientMethod';
import userStatus from '../../enums/userStatus';
import useConversations from '../../hooks/useConversations';
import useFocus from '../../hooks/useFocus';
import useSignalR from '../../hooks/useSignalR';
import getSendMessage from '../../serverMethods/getSendMessage';

jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useSignalR');
jest.mock('react');
jest.mock('../../hooks/useFocus');
jest.mock('../../clientMethods/getReceiveMessage');
jest.mock('../../clientMethods/getUpdateUserStatus');
jest.mock('../../clientMethods/getStartConversation');
jest.mock('../../serverMethods/getSendMessage');

describe('useConversations', () => {
	const registerReceiveMessageDependencies = [];
	const registerUpdateUserStatusMethodDependencies = [];
	const registerStartConversationMethodDependencies = [];
	const updateCurrentConversationDependencies = [];
	const selectConversationOnLoadDependencies = [];
	const registerReceiveMessageMethod = jest.fn();
	const registerUpdateUserStatusMethod = jest.fn();
	const registerStartConversationMethod = jest.fn();
	const unregisterReceiveMessageMethod = jest.fn();
	const unregisterUpdateUserStatusMethod = jest.fn();
	const unregisterStartConversationMethod = jest.fn();
	const updateCurrentConversation = jest.fn();
	const selectConversationOnLoad = jest.fn();

	const setCurrentConversationMock = jest.fn();
	const setConversationsMock = jest.fn();

	const receiveMessageMock = jest.fn();
	const updateUserStatusMock = jest.fn();
	const startConversationMock = jest.fn();

	const sendMessageMock = jest.fn();

	const user = {
		sub: uuidv4(),
	};
	const connection = {
		invoke: jest.fn(),
		on: jest.fn(),
		off: jest.fn(),
	};
	const focus = {
		current: true,
	};

	beforeEach(() => {
		useAuth0.mockReturnValue({
			user,
		});

		useSignalR.mockReturnValue({
			connection,
		});

		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setCurrentConversationMock,
			])
			.mockImplementationOnce((initialState) => [
				initialState,
				setConversationsMock,
			]);

		useFocus.mockReturnValue(focus);

		useEffect
			.mockImplementationOnce((method, dependencies) => {
				registerReceiveMessageMethod();
				const registerReceiveMessageMethodResult = method();
				unregisterReceiveMessageMethod.mockImplementation(
					registerReceiveMessageMethodResult
				);
				registerReceiveMessageDependencies.push(...dependencies);
			})
			.mockImplementationOnce((method, dependencies) => {
				registerUpdateUserStatusMethod();
				const registerUpdateUserStatusMethodResult = method();
				unregisterUpdateUserStatusMethod.mockImplementation(
					registerUpdateUserStatusMethodResult
				);
				registerUpdateUserStatusMethodDependencies.push(
					...dependencies
				);
			})
			.mockImplementationOnce((method, dependencies) => {
				registerStartConversationMethod();
				const registerStartConversationMethodResult = method();
				unregisterStartConversationMethod.mockImplementation(
					registerStartConversationMethodResult
				);
				registerStartConversationMethodDependencies.push(
					...dependencies
				);
			})
			.mockImplementationOnce((method, dependencies) => {
				updateCurrentConversation();
				method();
				updateCurrentConversationDependencies.push(...dependencies);
			})
			.mockImplementationOnce((method, dependencies) => {
				selectConversationOnLoad();
				method();
				selectConversationOnLoadDependencies.push(...dependencies);
			});

		getReceiveMessage.mockReturnValue(receiveMessageMock);
		getUpdateUserStatus.mockReturnValue(updateUserStatusMock);
		getStartConversation.mockReturnValue(startConversationMock);

		getSendMessage.mockReturnValue(sendMessageMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
		registerReceiveMessageDependencies.splice(0);
		registerUpdateUserStatusMethodDependencies.splice(0);
		registerStartConversationMethodDependencies.splice(0);
		selectConversationOnLoadDependencies.splice(0);
		updateCurrentConversationDependencies.splice(0);
	});

	test('returns object with conversations, current conversation, set conversations function, set current conversation function and send message function', () => {
		// Arrange
		const currentConversationInitialState = null;
		const conversationsInitialState = [];

		const expectedResult = {
			conversations: conversationsInitialState,
			currentConversation: currentConversationInitialState,
			setConversations: setConversationsMock,
			setCurrentConversation: setCurrentConversationMock,
			sendMessage: sendMessageMock,
		};

		// Act
		const result = useConversations();

		// Assert
		expect(result).toEqual(expectedResult);
	});

	test('registerReceiveMessageMethod is called and depends on connection and the receive message function', () => {
		// Arrange
		const expectedDependencies = [connection, receiveMessageMock];

		// Act
		useConversations();

		// Assert
		expect(registerReceiveMessageMethod).toHaveBeenCalledTimes(1);
		expect(registerReceiveMessageDependencies).toEqual(
			expectedDependencies
		);
	});

	test('registerReceiveMessageMethod registers the receive message method', () => {
		// Arrange
		const method = clientMethod.receiveMessage;

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenNthCalledWith(
			1,
			method,
			receiveMessageMock
		);
	});

	test('registerReceiveMessageMethod returns unregister function for the receive message method', () => {
		// Arrange
		const method = clientMethod.receiveMessage;

		// Act
		useConversations();
		unregisterReceiveMessageMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(method, receiveMessageMock);
	});

	test('registerReceiveMessageMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	test('unregisterReceiveMessageMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();
		unregisterReceiveMessageMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledTimes(0);
	});

	test('registerUpdateUserStatusMethod is called and depends on connection and the update user status function', () => {
		// Arrange
		const expectedDependencies = [connection, updateUserStatusMock];

		// Act
		useConversations();

		// Assert
		expect(registerUpdateUserStatusMethod).toHaveBeenCalledTimes(1);
		expect(registerUpdateUserStatusMethodDependencies).toEqual(
			expectedDependencies
		);
	});

	test('registerUpdateUserStatusMethod registers the update user status method', () => {
		// Arrange
		const method = clientMethod.updateUserStatus;

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenNthCalledWith(
			2,
			method,
			updateUserStatusMock
		);
	});

	test('registerUpdateUserStatusMethod returns unregister function for the update user status method', () => {
		// Arrange
		const method = clientMethod.updateUserStatus;

		// Act
		useConversations();
		unregisterUpdateUserStatusMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(
			method,
			updateUserStatusMock
		);
	});

	test('registerUpdateUserStatusMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	test('unregisterUpdateUserStatusMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();
		unregisterUpdateUserStatusMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledTimes(0);
	});

	test('registerStartConversationMethod is called and depends on connection and the start conversation function', () => {
		// Arrange
		const expectedDependencies = [connection, startConversationMock];

		// Act
		useConversations();

		// Assert
		expect(registerStartConversationMethod).toHaveBeenCalledTimes(1);
		expect(registerStartConversationMethodDependencies).toEqual(
			expectedDependencies
		);
	});

	test('registerStartConversationMethod registers the start conversation method', () => {
		// Arrange
		const method = clientMethod.startConversation;

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenNthCalledWith(
			3,
			method,
			startConversationMock
		);
	});

	test('registerStartConversationMethod returns unregister function for the start conversation method', () => {
		// Arrange
		const method = clientMethod.startConversation;

		// Act
		useConversations();
		unregisterStartConversationMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(
			method,
			startConversationMock
		);
	});

	test('registerStartConversationMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	test('unregisterStartConversationMethod does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();
		unregisterStartConversationMethod();

		// Assert
		expect(connection.off).toHaveBeenCalledTimes(0);
	});

	test('updateCurrentConversation is called and depends on conversations', () => {
		// Arrange
		const conversationsInitialState = [];
		const expectedDependencies = [conversationsInitialState];

		// Act
		useConversations();

		// Assert
		expect(updateCurrentConversation).toHaveBeenCalledTimes(1);
		expect(updateCurrentConversationDependencies).toEqual(
			expectedDependencies
		);
	});

	test('updateCurrentConversation calls the set current conversation function when the current conversation is defined and selectOnLoad is false', () => {
		// Arrange
		const conversations = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				status: userStatus.away,
				messages: [],
				selectOnLoad: false,
			},
		];
		const currentConversation = {
			userId: 'obi-wan-kenobi-user-id',
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			status: userStatus.online,
			messages: [],
		};

		useState.mockReset();
		useState
			.mockImplementationOnce(() => [
				currentConversation,
				setCurrentConversationMock,
			])
			.mockImplementationOnce(() => [
				conversations,
				setConversationsMock,
			]);

		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(1);
		expect(setCurrentConversationMock).toHaveBeenCalledWith(
			conversations[0]
		);
	});

	test('updateCurrentConversation does not call the set current conversation function when selectOnLoad is true', () => {
		// Arrange
		const conversations = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				status: userStatus.away,
				messages: [],
				selectOnLoad: true,
			},
		];
		const currentConversation = {
			userId: 'obi-wan-kenobi-user-id',
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			status: userStatus.online,
			messages: [],
		};

		useState.mockReset();
		useState
			.mockImplementationOnce(() => [
				currentConversation,
				setCurrentConversationMock,
			])
			.mockImplementationOnce(() => [
				conversations,
				setConversationsMock,
			]);

		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(1); // the one call comes from selectConversationOnLoad
	});

	test('updateCurrentConversation does not call the set current conversation when the current conversation is null', () => {
		// Arrange
		const conversations = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				status: userStatus.away,
				messages: [],
				selectOnLoad: false,
			},
		];
		const currentConversation = null;

		useState.mockReset();
		useState
			.mockImplementationOnce(() => [
				currentConversation,
				setCurrentConversationMock,
			])
			.mockImplementationOnce(() => [
				conversations,
				setConversationsMock,
			]);

		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(0);
	});

	test('selectConversationOnLoad is called and depends on conversations', () => {
		// Arrange
		const conversationsInitialState = [];
		const expectedDependencies = [conversationsInitialState];

		// Act
		useConversations();

		// Assert
		expect(selectConversationOnLoad).toHaveBeenCalledTimes(1);
		expect(selectConversationOnLoadDependencies).toEqual(
			expectedDependencies
		);
	});

	test('selectConversationOnLoad calls the set current conversation function', () => {
		// Arrange
		const conversations = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				status: userStatus.online,
				messages: [],
				selectOnLoad: true,
			},
		];
		const updatedCurrentConversation = {
			userId: 'obi-wan-kenobi-user-id',
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			status: userStatus.online,
			messages: [],
		};

		useState.mockReset();
		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setCurrentConversationMock,
			])
			.mockImplementationOnce(() => [
				conversations,
				setConversationsMock,
			]);

		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(1);
		expect(setCurrentConversationMock).toHaveBeenCalledWith(
			updatedCurrentConversation
		);
	});

	test('selectConversationOnLoad does not call the set current conversation function when selectOnLoad is false', () => {
		// Arrange
		const conversations = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				status: userStatus.online,
				messages: [],
				selectOnLoad: false,
			},
		];

		useState.mockReset();
		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setCurrentConversationMock,
			])
			.mockImplementationOnce(() => [
				conversations,
				setConversationsMock,
			]);

		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(0);
	});

	test('selectConversationOnLoad does not call the set current conversation function when conversations is empty', () => {
		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(0);
	});
});
