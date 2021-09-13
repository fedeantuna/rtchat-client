import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuidv4 } from 'uuid';
import Contact from '../../components/Contact';

jest.mock('@auth0/auth0-react');

describe('<Contact />', () => {
	const user = {
		sub: uuidv4(),
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
	};

	beforeEach(() => {
		useAuth0.mockReturnValue({ user });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders contact', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		// Act
		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Assert
		expect(screen.getByTestId(`contact-${id}`)).toBeInTheDocument();
	});

	test('calls useAuth0', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		// Act
		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Assert
		expect(useAuth0).toHaveBeenCalledTimes(1);
	});

	test('renders profile picture', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		// Act
		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Assert
		expect(
			screen.getByTestId(`profile-picture-contact-${id}`)
		).toBeInTheDocument();
	});

	test('renders last message when present', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: {
				id: uuidv4(),
				sender: uuidv4(),
				content: 'Hello there!',
			},
		};
		const onSelect = jest.fn();

		// Act
		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Assert
		expect(screen.getByText(/hello there!/i)).toBeInTheDocument();
	});

	test('renders last message with "You: " before it when present and current user is sender', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: {
				id: uuidv4(),
				sender: user.sub,
				content: 'General Kenobi...',
			},
		};
		const onSelect = jest.fn();

		// Act
		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Assert
		expect(screen.getByText(/you: general kenobi.../i)).toBeInTheDocument();
	});

	test('on contact click calls onSelect', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Act
		fireEvent.click(screen.getByTestId(`contact-${id}`));

		// Assert
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(user.sub);
	});

	test('on key press call onSelect if key was Enter', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${id}`), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(user.sub);
	});

	test('on key press call onSelect if key was Space', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${id}`), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(onSelect).toHaveBeenCalledTimes(1);
		expect(onSelect).toHaveBeenCalledWith(user.sub);
	});

	test('on key press does nothing if key was not Enter nor Space', () => {
		// Arrange
		const id = user.sub;
		const userProfile = {
			userId: id,
			email: user.email,
			picture: user.picture,
			lastMessage: null,
		};
		const onSelect = jest.fn();

		render(
			<Contact id={id} userProfile={userProfile} onSelect={onSelect} />
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${id}`), {
			key: 'A',
			charCode: 65,
		});

		// Assert
		expect(onSelect).toHaveBeenCalledTimes(0);
	});
});
