import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from '../../components/home/LandingPage';

jest.mock('@auth0/auth0-react');

describe('<LandingPage />', () => {
	const loginWithRedirectMock = jest.fn();

	beforeEach(() => {
		useAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
			loginWithRedirect: loginWithRedirectMock,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders landing page', () => {
		// Act
		render(<LandingPage />);

		// Assert
		expect(screen.getByTestId('landing-page')).toBeInTheDocument();
	});

	test('renders loading when is loading', () => {
		// Arrange
		useAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: true,
			loginWithRedirect: loginWithRedirectMock,
		});

		// Act
		render(<LandingPage />);

		// Assert
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	test('redirects to chat when is authenticated', () => {
		// Arrange
		useAuth0.mockReturnValue({
			isAuthenticated: true,
			isLoading: false,
			loginWithRedirect: loginWithRedirectMock,
		});

		// Act
		render(
			<BrowserRouter>
				<LandingPage />
			</BrowserRouter>
		);

		// Assert
		expect(window.location.pathname).toBe('/chat');
	});

	test('calls log in with redirect when user clicks on sign in button', () => {
		// Arrange
		render(<LandingPage />);

		// Act
		fireEvent.click(screen.getByText(/sign in/i));

		// Assert
		expect(loginWithRedirectMock).toHaveBeenCalledTimes(1);
	});
});
