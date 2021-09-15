import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import ConversationHeader from '../../components/ConversationHeader';
import userStatus from '../../enums/userStatus';

describe('<ConversationHeader />', () => {
	test('renders conversation header', () => {
		// Arrange
		const userId = uuidv4();
		const picture = 'some-picture';
		const email = 'obiwankenobi@jediorder.rep';
		const status = userStatus.online;

		// Act
		render(
			<ConversationHeader
				userId={userId}
				picture={picture}
				email={email}
				status={status}
			/>
		);

		// Assert
		expect(screen.getByTestId('conversation-header')).toBeInTheDocument();
	});

	test('renders profile picture', () => {
		// Arrange
		const userId = uuidv4();
		const picture = 'some-picture';
		const email = 'obiwankenobi@jediorder.rep';
		const status = userStatus.online;

		// Act
		render(
			<ConversationHeader
				userId={userId}
				picture={picture}
				email={email}
				status={status}
			/>
		);

		// Assert
		expect(
			screen.getByTestId(`profile-picture-conversation-header-${userId}`)
		).toBeInTheDocument();
	});

	test('displays user email', () => {
		// Arrange
		const userId = uuidv4();
		const picture = 'some-picture';
		const email = 'obiwankenobi@jediorder.rep';
		const status = userStatus.online;

		// Act
		render(
			<ConversationHeader
				userId={userId}
				picture={picture}
				email={email}
				status={status}
			/>
		);

		// Assert
		expect(screen.getByText(email)).toBeInTheDocument();
	});

	test('displays profile picture with user picture', () => {
		// Arrange
		const userId = uuidv4();
		const picture = 'some-picture';
		const email = 'obiwankenobi@jediorder.rep';
		const status = userStatus.online;

		// Act
		render(
			<ConversationHeader
				userId={userId}
				picture={picture}
				email={email}
				status={status}
			/>
		);

		// Assert
		expect(screen.getByAltText(/profile/i).getAttribute('src')).toBe(
			picture
		);
	});
});
