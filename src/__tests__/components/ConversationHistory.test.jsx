import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import ConversationHistory from '../../components/ConversationHistory';
import getLastMessage from '../../utils/getLastMessage';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../utils/getLastMessage');

describe('<ConversationHistory />', () => {
	const scrollToLastMessageDependencies = [];
	const scrollToLastMessage = jest.fn();

	const getElementByIdMock = jest.fn();
	const scrollIntoViewMock = jest.fn();
	Document.prototype.getElementById = getElementByIdMock;
	HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

	const user = {
		sub: uuidv4(),
	};

	const obiWanKenobi = {
		id: uuidv4(),
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
	};

	beforeEach(() => {
		useAuth0.mockReturnValue({ user });

		useEffect.mockImplementationOnce((method, dependencies) => {
			scrollToLastMessage();
			method();
			scrollToLastMessageDependencies.push(...dependencies);
		});

		getLastMessage.mockReturnValue({
			id: 'mock-message-id',
			sender: 'mock-sender-id',
			content: 'Mocked message',
			red: true,
		});
		getElementByIdMock.mockReturnValue(document.createElement('div'));
	});

	afterEach(() => {
		jest.clearAllMocks();

		scrollToLastMessageDependencies.splice(0);
	});

	test('renders conversation history', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(screen.getByTestId('conversation-history')).toBeInTheDocument();
	});

	test('renders message from the user which current user is having a conversation', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(screen.getByText(messages[0].content)).toBeInTheDocument();
	});

	test('renders message from the current user', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(screen.getByText(messages[0].content)).toBeInTheDocument();
	});

	test('renders message from the user which current user is having a conversation and from the current user', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'General Kenobi...',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(screen.getByText(messages[0].content)).toBeInTheDocument();
		expect(screen.getByText(messages[1].content)).toBeInTheDocument();
	});

	test('calls scrollToLastMessage with dependency on messages', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		const expectedDependencies = [messages];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(scrollToLastMessage).toHaveBeenCalledTimes(1);
		expect(scrollToLastMessageDependencies).toEqual(expectedDependencies);
	});

	test('scrollToLastMessage calls get last message when messages is truthy', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(getLastMessage).toHaveBeenCalledTimes(1);
		expect(getLastMessage).toHaveBeenCalledWith(messages);
	});

	test('scrollToLastMessage calls get element by id twice when get last message returns a message', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(getElementByIdMock).toHaveBeenCalledTimes(2);
		expect(getElementByIdMock).toHaveBeenCalledWith('mock-message-id');
	});

	test('scrollToLastMessage calls scroll into view when get element by id returns an html element', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		const scrollIntoViewOptions = { behavior: 'auto' };

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
		expect(scrollIntoViewMock).toHaveBeenCalledWith(scrollIntoViewOptions);
	});

	test('scrollToLastMessage does not call scroll into view when get element by id does not return an html element', () => {
		// Arrange
		const messages = [
			{
				id: uuidv4(),
				sender: user.sub,
				content: 'Kenobi...',
				red: true,
			},
		];

		getElementByIdMock.mockReturnValue(null);

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(scrollIntoViewMock).toHaveBeenCalledTimes(0);
	});

	test('scrollToLastMessage does not call get last message when messages is null', () => {
		// Arrange
		const messages = null;

		// Act
		render(<ConversationHistory messages={messages} />);

		// Assert
		expect(getLastMessage).toHaveBeenCalledTimes(0);
	});
});
