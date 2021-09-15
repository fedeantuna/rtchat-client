import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import Chat from '../../components/chat/Chat';
import userStatus from '../../enums/userStatus';
import useConversations from '../../hooks/useConversations';
import useUserProfiles from '../../hooks/useUserProfiles';
import useSignalR from '../../hooks/useSignalR';

jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useConversations');
jest.mock('../../hooks/useUserProfiles');
jest.mock('../../hooks/useSignalR');

describe('<Chat />', () => {
	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
		status: userStatus.online,
	};
	beforeEach(() => {
		useAuth0.mockReturnValue({
			isLoading: false,
			user,
		});

		useConversations.mockReturnValue({
			conversations: [],
			currentConversation: null,
			setConversations: jest.fn(),
			setCurrentConversation: jest.fn(),
			sendMessage: jest.fn(),
		});
		useUserProfiles.mockReturnValue({
			userProfiles: [],
			selectContact: jest.fn(),
		});

		useSignalR.mockReturnValue({
			connection: null,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders chat', () => {
		// Act
		render(<Chat />);

		// Assert
		expect(screen.getByTestId('chat')).toBeInTheDocument();
	});

	test('renders loading when is loading', () => {
		// Arrange
		useAuth0.mockReturnValue({
			isLoading: true,
			user,
		});

		// Act
		render(<Chat />);

		// Assert
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});
});
