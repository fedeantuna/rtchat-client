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

	const obiWanKenobi = {
		id: uuidv4(),
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
	};

	beforeEach(() => {
		useAuth0.mockReturnValue({ user });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders contact', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(
			screen.getByTestId(`contact-${obiWanKenobi.id}`)
		).toBeInTheDocument();
	});

	test('calls useAuth0', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(useAuth0).toHaveBeenCalledTimes(1);
	});

	test('renders profile picture', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(
			screen.getByTestId(`profile-picture-contact-${obiWanKenobi.id}`)
		).toBeInTheDocument();
	});

	test('displays user email', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.getByText(userProfile.email)).toBeInTheDocument();
	});

	test('displays last message when present', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: {
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.getByText(/hello there!/i)).toBeInTheDocument();
	});

	test('displays last message with "You: " before it when present and current user is sender', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: {
				id: uuidv4(),
				sender: user.sub,
				content: 'General Kenobi...',
				red: true,
			},
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.getByText(/you: general kenobi.../i)).toBeInTheDocument();
	});

	test('displays indicator for not red messages when last message has not been red', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: {
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: false,
			},
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.getByTestId('red-indicator')).toBeInTheDocument();
	});

	test('does not display indicator for not red messages when last message has been red', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: {
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.queryByTestId('red-indicator')).not.toBeInTheDocument();
	});

	test('displays profile picture with user picture', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: {
				id: uuidv4(),
				sender: obiWanKenobi.id,
				content: 'Hello there!',
				red: true,
			},
		};
		const onSelectMock = jest.fn();

		// Act
		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Assert
		expect(screen.getByAltText(/profile/i).getAttribute('src')).toBe(
			userProfile.picture
		);
	});

	test('on contact click calls onSelect', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Act
		fireEvent.click(screen.getByTestId(`contact-${obiWanKenobi.id}`));

		// Assert
		expect(onSelectMock).toHaveBeenCalledTimes(1);
		expect(onSelectMock).toHaveBeenCalledWith(obiWanKenobi.id);
	});

	test('on key press call onSelect if key was Enter', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${obiWanKenobi.id}`), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onSelectMock).toHaveBeenCalledTimes(1);
		expect(onSelectMock).toHaveBeenCalledWith(obiWanKenobi.id);
	});

	test('on key press call onSelect if key was Space', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${obiWanKenobi.id}`), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(onSelectMock).toHaveBeenCalledTimes(1);
		expect(onSelectMock).toHaveBeenCalledWith(obiWanKenobi.id);
	});

	test('on key press does nothing if key was not Enter nor Space', () => {
		// Arrange
		const userProfile = {
			userId: obiWanKenobi.id,
			email: obiWanKenobi.email,
			picture: obiWanKenobi.picture,
			lastMessage: null,
		};
		const onSelectMock = jest.fn();

		render(
			<Contact
				id={obiWanKenobi.id}
				userProfile={userProfile}
				onSelect={onSelectMock}
			/>
		);

		// Act
		fireEvent.keyDown(screen.getByTestId(`contact-${obiWanKenobi.id}`), {
			key: 'A',
			charCode: 65,
		});

		// Assert
		expect(onSelectMock).toHaveBeenCalledTimes(0);
	});
});
