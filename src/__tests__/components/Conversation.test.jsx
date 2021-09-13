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

	test('renders conversation header', () => {
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

	test('renders conversation history', () => {
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

	test('renders message box', () => {
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
});
