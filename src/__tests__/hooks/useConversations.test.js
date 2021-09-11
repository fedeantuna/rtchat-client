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
import { useSignalR } from '../../hooks/useSignalR';
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
	const registerReceiveMessageDeps = [];
	const registerUpdateUserStatusMethodDeps = [];
	const registerStartConversationMethodDeps = [];
	const selectConversationOnLoadDeps = [];
	const updateCurrentConversationDeps = [];

	const registerReceiveMessageMethodMock = jest.fn();
	const registerUpdateUserStatusMethodMock = jest.fn();
	const registerStartConversationMethodMock = jest.fn();
	const unregisterReceiveMessageMethodMock = jest.fn();
	const unregisterUpdateUserStatusMethodMock = jest.fn();
	const unregisterStartConversationMethodMock = jest.fn();
	const selectConversationOnLoadMock = jest.fn();
	const updateCurrentConversationMock = jest.fn();

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
			.mockImplementationOnce((func, deps) => {
				registerReceiveMessageMethodMock();
				const registerReceiveMessageMethodMockResult = func();
				unregisterReceiveMessageMethodMock.mockImplementation(
					registerReceiveMessageMethodMockResult
				);
				registerReceiveMessageDeps.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				registerUpdateUserStatusMethodMock();
				const registerUpdateUserStatusMethodMockResult = func();
				unregisterUpdateUserStatusMethodMock.mockImplementation(
					registerUpdateUserStatusMethodMockResult
				);
				registerUpdateUserStatusMethodDeps.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				registerStartConversationMethodMock();
				const registerStartConversationMethodMockResult = func();
				unregisterStartConversationMethodMock.mockImplementation(
					registerStartConversationMethodMockResult
				);
				registerStartConversationMethodDeps.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				selectConversationOnLoadMock();
				func();
				selectConversationOnLoadDeps.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				updateCurrentConversationMock();
				func();
				updateCurrentConversationDeps.push(...deps);
			});

		getReceiveMessage.mockReturnValue(receiveMessageMock);
		getUpdateUserStatus.mockReturnValue(updateUserStatusMock);
		getStartConversation.mockReturnValue(startConversationMock);

		getSendMessage.mockReturnValue(sendMessageMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
		registerReceiveMessageDeps.splice(0);
		registerUpdateUserStatusMethodDeps.splice(0);
		registerStartConversationMethodDeps.splice(0);
		selectConversationOnLoadDeps.splice(0);
		updateCurrentConversationDeps.splice(0);
	});

	it('returns object with conversations, current conversation, set current conversation function and send message function', () => {
		// Arrange
		const currentConversationInitialState = null;
		const conversationsInitialState = [];

		const expectedResult = {
			conversations: conversationsInitialState,
			currentConversation: currentConversationInitialState,
			setCurrentConversation: setCurrentConversationMock,
			sendMessage: sendMessageMock,
		};

		// Act
		const result = useConversations();

		// Assert
		expect(result).toEqual(expectedResult);
	});

	it('registerReceiveMessageMethod useEffect is called and depends on connection and receiveMessage', () => {
		// Arrange
		const expectedDependencies = [connection, receiveMessageMock];

		// Act
		useConversations();

		// Assert
		expect(registerReceiveMessageMethodMock).toHaveBeenCalledTimes(1);
		expect(registerReceiveMessageDeps).toEqual(expectedDependencies);
	});

	it('registerReceiveMessageMethod useEffect registers method receiveMessage', () => {
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

	it('registerReceiveMessageMethod useEffect returns unregister for receiveMessage method', () => {
		// Arrange
		const method = clientMethod.receiveMessage;

		// Act
		useConversations();
		unregisterReceiveMessageMethodMock();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(method, receiveMessageMock);
	});

	it('registerReceiveMessageMethod useEffect does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	it('registerUpdateUserStatusMethod useEffect is called and depends on connection and updateUserStatus', () => {
		// Arrange
		const expectedDependencies = [connection, updateUserStatusMock];

		// Act
		useConversations();

		// Assert
		expect(registerUpdateUserStatusMethodMock).toHaveBeenCalledTimes(1);
		expect(registerUpdateUserStatusMethodDeps).toEqual(
			expectedDependencies
		);
	});

	it('registerUpdateUserStatusMethod useEffect registers method updateUserStatus', () => {
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

	it('registerUpdateUserStatusMethod useEffect returns unregister for updateUserStatus method', () => {
		// Arrange
		const method = clientMethod.updateUserStatus;

		// Act
		useConversations();
		unregisterUpdateUserStatusMethodMock();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(
			method,
			updateUserStatusMock
		);
	});

	it('registerUpdateUserStatusMethod useEffect does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	it('registerStartConversationMethod useEffect is called and depends on connection and startConversation', () => {
		// Arrange
		const expectedDependencies = [connection, startConversationMock];

		// Act
		useConversations();

		// Assert
		expect(registerStartConversationMethodMock).toHaveBeenCalledTimes(1);
		expect(registerStartConversationMethodDeps).toEqual(
			expectedDependencies
		);
	});

	it('registerStartConversationMethod useEffect registers method startConversation', () => {
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

	it('registerStartConversationMethod useEffect returns unregister for startConversation method', () => {
		// Arrange
		const method = clientMethod.startConversation;

		// Act
		useConversations();
		unregisterStartConversationMethodMock();

		// Assert
		expect(connection.off).toHaveBeenCalledWith(
			method,
			startConversationMock
		);
	});

	it('registerStartConversationMethod useEffect does nothing if connection is null', () => {
		// Arrange
		useSignalR.mockReturnValue({
			connection: null,
		});

		// Act
		useConversations();

		// Assert
		expect(connection.on).toHaveBeenCalledTimes(0);
	});

	it('updateCurrentConversation useEffect is called and depends on conversations', () => {
		// Arrange
		const conversationsInitialState = [];
		const expectedDependencies = [conversationsInitialState];

		// Act
		useConversations();

		// Assert
		expect(updateCurrentConversationMock).toHaveBeenCalledTimes(1);
		expect(updateCurrentConversationDeps).toEqual(expectedDependencies);
	});

	it('updateCurrentConversation useEffect calls setCurrentConversation when currentConversation is defined and selectOnLoad is false', () => {
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

	it('updateCurrentConversation useEffect does not call setCurrentConversation when selectOnLoad is true', () => {
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

	it('updateCurrentConversation useEffect does not call setCurrentConversation when currentConversation is null', () => {
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

	it('selectConversationOnLoad useEffect is called and depends on conversations', () => {
		// Arrange
		const conversationsInitialState = [];
		const expectedDependencies = [conversationsInitialState];

		// Act
		useConversations();

		// Assert
		expect(selectConversationOnLoadMock).toHaveBeenCalledTimes(1);
		expect(selectConversationOnLoadDeps).toEqual(expectedDependencies);
	});

	it('selectConversationOnLoad useEffect calls setCurrentConversation', () => {
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

	it('selectConversationOnLoad useEffect does not call setCurrentConversation when selectOnLoad is false', () => {
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

	it('selectConversationOnLoad useEffect does not call setCurrentConversation when conversations is empty', () => {
		// Act
		useConversations();

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(0);
	});
});
