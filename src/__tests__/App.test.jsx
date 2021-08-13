import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
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

	it('renders Sign Up button', () => {
		// Arrange
		// Act
		render(<App />);
		const signUp = screen.getByText(/Sign Up/);

		// Assert
		expect(signUp).toBeInTheDocument();
	});
});
