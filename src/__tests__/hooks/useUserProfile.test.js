import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';
import userStatus from '../../enums/userStatus';
import useUserProfiles from '../../hooks/useUserProfiles';
import getLastMessage from '../../utils/getLastMessage';

jest.mock('react');

describe('useUserProfile', () => {
	const readMessagesDependencies = [];
	const updateUserProfilesDependencies = [];
	const readMessages = jest.fn();
	const updateUserProfiles = jest.fn();

	const setUserProfilesMock = jest.fn();

	const obiWanKenobi = {
		userId: 'obi-wan-kenobi-user-id',
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
		status: userStatus.online,
		messages: [
			{
				id: uuidv4(),
				sender: 'obi-wan-kenobi-user-id',
				content: 'Hello there!',
				red: false,
			},
		],
	};
	const countDooku = {
		userId: 'count-dooku-user-id',
		email: 'countdooku@sith.sep',
		picture: 'some-beardy-picture',
		status: userStatus.busy,
		messages: [],
	};

	beforeEach(() => {
		useState.mockImplementation((initialState) => [
			initialState,
			setUserProfilesMock,
		]);

		useEffect
			.mockImplementationOnce((func, deps) => {
				readMessages();
				func();
				readMessagesDependencies.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				updateUserProfiles();
				func();
				updateUserProfilesDependencies.push(...deps);
			});
	});

	afterEach(() => {
		jest.clearAllMocks();

		readMessagesDependencies.splice(0);
		updateUserProfilesDependencies.splice(0);
	});

	it('returns an object with user profiles and a function (select contact)', () => {
		// Arrange
		const conversations = [];
		const currentConversation = null;
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const userProfilesInitialState = [];

		// Act
		const result = useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(result.userProfiles).toEqual(userProfilesInitialState);
		expect(result.selectContact).toEqual(expect.any(Function));
	});

	it('readMessages is called with current conversation dependency', () => {
		// Arrange
		const conversations = [];
		const currentConversation = null;
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const expectedDependencies = [currentConversation];

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(readMessages).toHaveBeenCalledTimes(1);
		expect(readMessagesDependencies).toEqual(expectedDependencies);
	});

	it('select contact function finds a conversation based on user id and sets the current conversation to it', () => {
		// Arrange
		const conversations = [cloneDeep(obiWanKenobi), cloneDeep(countDooku)];
		const currentConversation = null;
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		).selectContact(obiWanKenobi.userId);

		// Assert
		expect(setCurrentConversationMock).toHaveBeenCalledTimes(1);
		expect(setCurrentConversationMock).toHaveBeenCalledWith(obiWanKenobi);
	});

	it('readMessages calls the set user profiles function with the updated user profiles', () => {
		// Arrange
		const conversations = [cloneDeep(obiWanKenobi), cloneDeep(countDooku)];
		const currentConversation = cloneDeep(obiWanKenobi);
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const userProfiles = [
			{
				userId: obiWanKenobi.userId,
				email: obiWanKenobi.email,
				picture: obiWanKenobi.picture,
				lastMessage: {
					id: obiWanKenobi.messages[0].id,
					sender: obiWanKenobi.userId,
					content: obiWanKenobi.messages[0].content,
					red: obiWanKenobi.messages[0].red,
				},
			},
			{
				userId: countDooku.userId,
				email: countDooku.email,
				picture: countDooku.picture,
				lastMessage: null,
			},
		];
		useState.mockReset();
		useState.mockImplementation(() => [userProfiles, setUserProfilesMock]);

		const updatedUserProfiles = cloneDeep(userProfiles);
		updatedUserProfiles[0].lastMessage.red = true;

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(setUserProfilesMock).toHaveBeenCalledWith(updatedUserProfiles);
	});

	it('readMessages calls the set conversations function with the updated conversations', () => {
		// Arrange
		const conversations = [cloneDeep(obiWanKenobi), cloneDeep(countDooku)];
		const currentConversation = cloneDeep(obiWanKenobi);
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const userProfiles = [
			{
				userId: obiWanKenobi.userId,
				email: obiWanKenobi.email,
				picture: obiWanKenobi.picture,
				lastMessage: {
					id: obiWanKenobi.messages[0].id,
					sender: obiWanKenobi.userId,
					content: obiWanKenobi.messages[0].content,
					red: obiWanKenobi.messages[0].red,
				},
			},
			{
				userId: countDooku.userId,
				email: countDooku.email,
				picture: countDooku.picture,
				lastMessage: null,
			},
		];
		useState.mockReset();
		useState.mockImplementation(() => [userProfiles, setUserProfilesMock]);

		const messages = cloneDeep(currentConversation.messages).map((m) => ({
			...m,
			red: true,
		}));
		const updatedConversations = cloneDeep(conversations);
		const updatedConversation = updatedConversations.find(
			(uc) => uc.userId === currentConversation.userId
		);
		updatedConversation.messages = messages;

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(setConversationsMock).toHaveBeenCalledTimes(1);
		expect(setConversationsMock).toHaveBeenCalledWith(updatedConversations);
	});

	it('updateUserProfiles is called with current conversation dependency', () => {
		// Arrange
		const conversations = [];
		const currentConversation = null;
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const expectedDependencies = [conversations];

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(updateUserProfiles).toHaveBeenCalledTimes(1);
		expect(updateUserProfilesDependencies).toEqual(expectedDependencies);
	});

	it('updateUserProfiles calls set user profiles function with updated user profiles', () => {
		// Arrange
		const conversations = [cloneDeep(obiWanKenobi), cloneDeep(countDooku)];
		const currentConversation = null;
		const setConversationsMock = jest.fn();
		const setCurrentConversationMock = jest.fn();

		const updatedUserProfiles = cloneDeep(conversations).map((c) => ({
			userId: c.userId,
			email: c.email,
			picture: c.picture,
			status: c.status,
			lastMessage: getLastMessage(c.messages),
		}));

		// Act
		useUserProfiles(
			conversations,
			currentConversation,
			setConversationsMock,
			setCurrentConversationMock
		);

		// Assert
		expect(setUserProfilesMock).toHaveBeenCalledTimes(1);
		expect(setUserProfilesMock).toHaveBeenCalledWith(updatedUserProfiles);
	});
});
