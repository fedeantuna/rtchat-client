import { useAuth0 } from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserBar from '../../components/UserBar';
import useSignalR from '../../hooks/useSignalR';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useSignalR');

describe('<UserBar />', () => {
	const setStatusMock = jest.fn();

	const connectionMock = {
		invoke: jest.fn(),
	};

	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
	};

	beforeEach(() => {
		useSignalR.mockReturnValue(connectionMock);

		useState.mockImplementationOnce((initialState) => [
			initialState,
			setStatusMock,
		]);

		useAuth0.mockReturnValue({ user });
	});

	test('renders user bar', () => {
		// Arrange
		const filter = '';
		const setFilter = jest.fn();
		const onKeyDown = jest.fn();

		// Act
		render(
			<UserBar
				filter={filter}
				setFilter={setFilter}
				onKeyDown={onKeyDown}
			/>
		);

		// Assert
		expect(screen.getByTestId('user-bar')).toBeInTheDocument();
	});

	test('renders user profile button', () => {
		// Arrange
		const filter = '';
		const setFilter = jest.fn();
		const onKeyDown = jest.fn();

		// Act
		render(
			<UserBar
				filter={filter}
				setFilter={setFilter}
				onKeyDown={onKeyDown}
			/>
		);

		// Assert
		expect(screen.getByTestId('user-profile-button')).toBeInTheDocument();
	});

	test('renders search box', () => {
		// Arrange
		const filter = '';
		const setFilter = jest.fn();
		const onKeyDown = jest.fn();

		// Act
		render(
			<UserBar
				filter={filter}
				setFilter={setFilter}
				onKeyDown={onKeyDown}
			/>
		);

		// Assert
		expect(screen.getByTestId('search-box')).toBeInTheDocument();
	});
});
