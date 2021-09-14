import { withAuthenticationRequired } from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

jest.mock('@auth0/auth0-react');

describe('<ProtectedRoute />', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders protected route', () => {
		// Arrange
		const componentTestId = 'protected-route-test-component';
		const testComponent = () => <div data-testid={componentTestId} />;

		withAuthenticationRequired.mockImplementation((component) => component);

		// Act
		render(
			<BrowserRouter>
				<ProtectedRoute path='/' component={testComponent} />
			</BrowserRouter>
		);

		// Assert
		expect(screen.getByTestId(componentTestId)).toBeInTheDocument();
	});

	test('renders loading while redirecting', () => {
		// Arrange
		const componentTestId = 'protected-route-test-component';
		const testComponent = () => <div data-testid={componentTestId} />;

		withAuthenticationRequired.mockImplementation(
			(component, options) => () => options.onRedirecting()
		);

		// Act
		render(
			<BrowserRouter>
				<ProtectedRoute path='/' component={testComponent} />
			</BrowserRouter>
		);

		// Assert
		expect(screen.queryByTestId(componentTestId)).not.toBeInTheDocument();
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});
});
