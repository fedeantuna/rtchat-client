import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { fireEvent, render, screen } from '@testing-library/react';
import NavigationPanel from '../../components/NavigationPanel';
import useSignalR from '../../hooks/useSignalR';
import useSearch from '../../hooks/useSearch';
import serverMethod from '../../enums/serverMethod';
import isValidEmail from '../../utils/isValidEmail';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useSignalR');
jest.mock('../../hooks/useSearch');
jest.mock('../../utils/isValidEmail');

describe('<NavigationPanel />', () => {
	const setFilterMock = jest.fn();
	const setStatusMock = jest.fn();
	const invoke = jest.fn();
	const toastError = jest.fn();

	const connectionMock = {
		invoke,
	};

	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
	};
	const obiWanKenobi = {
		id: uuidv4(),
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
	};
	const countDooku = {
		id: uuidv4(),
		email: 'countdooku@sith.sep',
		picture: 'some-beardy-picture',
	};

	beforeEach(() => {
		useSignalR.mockReturnValue({ connection: connectionMock });

		useSearch.mockImplementationOnce((userProfiles) => ({
			filter: '',
			filteredProfiles: userProfiles,
			setFilter: setFilterMock,
		}));

		toast.error = toastError;

		useState.mockImplementationOnce((initialState) => [
			initialState,
			setStatusMock,
		]);

		useAuth0.mockReturnValue({ user });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders conversation history', () => {
		// Arrange
		const obiWanKenobiUserProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const countDookuUserProfile = {
			userId: countDooku.id,
			email: countDooku.email,
			picture: countDooku.picture,
			lastMessage: null,
		};
		const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];
		const onContactSelect = jest.fn();

		// Act
		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Assert
		expect(screen.getByTestId('navigation-panel')).toBeInTheDocument();
	});

	test('renders user bar', () => {
		// Arrange
		const obiWanKenobiUserProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const countDookuUserProfile = {
			userId: countDooku.id,
			email: countDooku.email,
			picture: countDooku.picture,
			lastMessage: null,
		};
		const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];
		const onContactSelect = jest.fn();

		// Act
		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Assert
		expect(screen.getByTestId('user-bar')).toBeInTheDocument();
	});

	test('renders contact list', () => {
		// Arrange
		const obiWanKenobiUserProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const countDookuUserProfile = {
			userId: countDooku.id,
			email: countDooku.email,
			picture: countDooku.picture,
			lastMessage: null,
		};
		const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];
		const onContactSelect = jest.fn();

		// Act
		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Assert
		expect(screen.getByTestId('contact-list')).toBeInTheDocument();
	});

	test('contact select resets filter and calls on contact select with corresponding id', () => {
		// Arrange
		const obiWanKenobiUserProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const countDookuUserProfile = {
			userId: countDooku.id,
			email: countDooku.email,
			picture: countDooku.picture,
			lastMessage: null,
		};
		const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];
		const onContactSelect = jest.fn();

		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Act
		fireEvent.click(
			screen.getByTestId(`contact-${countDookuUserProfile.userId}`)
		);

		// Assert
		expect(onContactSelect).toHaveBeenCalledTimes(1);
		expect(onContactSelect).toHaveBeenCalledWith(
			countDookuUserProfile.userId
		);
		expect(setFilterMock).toHaveBeenCalledTimes(1);
		expect(setFilterMock).toHaveBeenCalledWith('');
	});

	test('pressing enter while searching a user selects the first filtered profile when found', () => {
		// Arrange
		const obiWanKenobiUserProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const countDookuUserProfile = {
			userId: countDooku.id,
			email: countDooku.email,
			picture: countDooku.picture,
			lastMessage: null,
		};
		const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];
		const onContactSelect = jest.fn();

		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onContactSelect).toHaveBeenCalledTimes(1);
		expect(onContactSelect).toHaveBeenCalledWith(
			obiWanKenobiUserProfile.userId
		);
		expect(setFilterMock).toHaveBeenCalledTimes(1);
		expect(setFilterMock).toHaveBeenCalledWith('');
	});

	test('pressing enter while searching a user calls start conversation on the server when user profile is not found and email is valid', () => {
		// Arrange
		const userProfiles = [];
		const onContactSelect = jest.fn();

		useSearch.mockReset();
		useSearch.mockImplementationOnce(() => ({
			filter: obiWanKenobi.email,
			filteredProfiles: userProfiles,
			setFilter: setFilterMock,
		}));

		isValidEmail.mockReturnValue(true);

		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(1);
		expect(invoke).toHaveBeenCalledWith(
			serverMethod.startConversation,
			obiWanKenobi.email
		);
		expect(setFilterMock).toHaveBeenCalledTimes(1);
		expect(setFilterMock).toHaveBeenCalledWith('');
	});

	test('pressing enter while searching a user displays error message when user profile is not found and email is not valid', () => {
		// Arrange
		const userProfiles = [];
		const onContactSelect = jest.fn();

		const invalidEmail = 'some-invalid@email';

		useSearch.mockReset();
		useSearch.mockImplementationOnce(() => ({
			filter: invalidEmail,
			filteredProfiles: userProfiles,
			setFilter: setFilterMock,
		}));

		isValidEmail.mockReturnValue(false);

		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(0);
		expect(toastError).toHaveBeenCalledTimes(1);
		expect(toastError).toHaveBeenCalledWith(
			`${invalidEmail} is not a valid email.`
		);
		expect(setFilterMock).toHaveBeenCalledTimes(1);
		expect(setFilterMock).toHaveBeenCalledWith('');
	});

	test('not pressing enter while searching a user does nothing', () => {
		// Arrange
		const userProfiles = [];
		const onContactSelect = jest.fn();

		const invalidEmail = 'some-invalid@email';

		useSearch.mockReset();
		useSearch.mockImplementationOnce(() => ({
			filter: invalidEmail,
			filteredProfiles: userProfiles,
			setFilter: setFilterMock,
		}));

		isValidEmail.mockReturnValue(false);

		render(
			<NavigationPanel
				userProfiles={userProfiles}
				onContactSelect={onContactSelect}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/search/i), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(invoke).toHaveBeenCalledTimes(0);
		expect(setFilterMock).toHaveBeenCalledTimes(0);
	});
});
