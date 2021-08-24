import React from 'react';
import { render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import App from '../App';

jest.mock('@auth0/auth0-react');

describe('App', () => {
	beforeEach(() => {
		useAuth0.mockReturnValue({
			isAuthenticated: false,
			isLoading: false,
			loginWithRedirect: () => {},
		});
	});

	it('renders RTChat title', () => {
		// Arrange
		// Act
		render(<App />);
		const rtChat = screen.getByText(/RTChat/);

		// Assert
		expect(rtChat).toBeInTheDocument();
	});

	it('renders Real Time Chat', () => {
		// Arrange
		// Act
		render(<App />);
		const realTimeChat = screen.getByText(/Real Time Chat/);

		// Assert
		expect(realTimeChat).toBeInTheDocument();
	});

	it('renders Sign In button', () => {
		// Arrange
		// Act
		render(<App />);
		const signIn = screen.getByText(/Sign In/);

		// Assert
		expect(signIn).toBeInTheDocument();
	});
});
