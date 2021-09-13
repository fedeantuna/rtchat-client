import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import Conversation from '../../components/Conversation';

describe('<Conversation />', () => {
	test('renders conversation', () => {
		// Arrange
		const current = {
			userId: uuidv4(),
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			messages: [],
		};
		const onSendMock = jest.fn();

		// Act
		render(<Conversation current={current} onSend={onSendMock} />);

		// Assert
		expect(screen.getByTestId('conversation')).toBeInTheDocument();
	});

	test('renders conversation header when a conversation is selected', () => {
		// Arrange
		const current = {
			userId: uuidv4(),
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			messages: [],
		};
		const onSendMock = jest.fn();

		// Act
		render(<Conversation current={current} onSend={onSendMock} />);

		// Assert
		expect(screen.getByTestId('conversation-header')).toBeInTheDocument();
	});

	test('renders conversation history when a conversation is selected', () => {
		// Arrange
		const current = {
			userId: uuidv4(),
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			messages: [],
		};
		const onSendMock = jest.fn();

		// Act
		render(<Conversation current={current} onSend={onSendMock} />);

		// Assert
		expect(screen.getByTestId('conversation-history')).toBeInTheDocument();
	});

	test('renders message box when a conversation is selected', () => {
		// Arrange
		const current = {
			userId: uuidv4(),
			email: 'obiwankenobi@jediorder.rep',
			picture: 'some-picture',
			messages: [],
		};
		const onSendMock = jest.fn();

		// Act
		render(<Conversation current={current} onSend={onSendMock} />);

		// Assert
		expect(screen.getByTestId('message-box')).toBeInTheDocument();
	});

	test('does not render ConversationHeader, ConversationHistory and MessageBox when a conversation is not selected', () => {
		// Arrange
		const current = null;
		const onSendMock = jest.fn();

		// Act
		render(<Conversation current={current} onSend={onSendMock} />);

		// Assert
		expect(
			screen.queryByTestId('conversation-header')
		).not.toBeInTheDocument();
		expect(
			screen.queryByTestId('conversation-history')
		).not.toBeInTheDocument();
		expect(screen.queryByTestId('message-box')).not.toBeInTheDocument();
	});
});
