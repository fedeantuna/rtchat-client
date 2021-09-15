import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import { render, screen } from '@testing-library/react';
import App from '../App';
import useConversations from '../hooks/useConversations';
import useUserProfiles from '../hooks/useUserProfiles';
import userStatus from '../enums/userStatus';

jest.mock('react', () => {
	const actualReact = jest.requireActual('react');

	return {
		...actualReact,
		useState: jest.fn(),
		useEffect: jest.fn(),
	};
});
jest.mock('@auth0/auth0-react');
jest.mock('../hooks/useConversations');
jest.mock('../hooks/useUserProfiles');

const renderWithRouter = (ui, { route = '/' } = {}, title = 'Test page') => {
	window.history.pushState({}, title, route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('App', () => {
	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
		status: userStatus.online,
	};
	beforeEach(() => {
		useAuth0.mockReturnValue({
			isLoading: false,
			getAccessTokenSilently: jest.fn(),
			user,
		});

		withAuthenticationRequired.mockImplementation((component) => component);

		useState.mockImplementation((initialState) => [
			initialState,
			jest.fn(),
		]);

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
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders correctly when user is not authenticated', () => {
		// Act
		renderWithRouter(<App />);

		// Assert
		expect(screen.getByTestId('landing-page')).toBeInTheDocument();
	});

	test('renders correctly when user is authenticated', async () => {
		// Act
		await renderWithRouter(<App />, { route: '/chat' });

		// Assert
		expect(screen.getByTestId('chat')).toBeInTheDocument();
	});
});
