import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 } from 'uuid';
import App from '../App';

jest.mock('@auth0/auth0-react');

const renderWithRouter = (ui, { route = '/' } = {}, title = 'Test page') => {
	window.history.pushState({}, title, route);

	return render(ui, { wrapper: BrowserRouter });
};

describe('App', () => {
	beforeEach(() => {});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('when path is /', () => {
		test('renders correctly when user is not authenticated', () => {
			// Arrange
			useAuth0.mockReturnValue({
				user: {
					sub: v4(),
				},
				getAccessTokenSilently: jest.fn(),
				isAuthenticated: false,
				isLoading: false,
				loginWithRedirect: jest.fn(),
			});

			// Act
			renderWithRouter(<App />);

			// Assert
			expect(screen.getByTestId('landing-page')).toBeInTheDocument();
		});
	});
});
