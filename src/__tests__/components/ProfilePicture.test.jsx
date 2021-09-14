import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import ProfilePicture from '../../components/ProfilePicture';
import userStatus from '../../enums/userStatus';

describe('<ProfilePicture />', () => {
	test('renders profile picture', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.online;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(screen.getByTestId(`profile-picture-${id}`)).toBeInTheDocument();
	});

	test('displays profile picture', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.online;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(screen.getByAltText(/profile/i)).toBeInTheDocument();
		expect(screen.getByAltText(/profile/i).getAttribute('src')).toBe(
			picture
		);
	});

	test('displays green circle when status is online', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.online;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-online')
		).toBeInTheDocument();
		expect(
			screen
				.getByTestId('profile-picture-status-online')
				.classList.values()
		).toContain('bg-green-600');
	});

	test('displays yellow circle when status is away', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.away;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-away')
		).toBeInTheDocument();
		expect(
			screen.getByTestId('profile-picture-status-away').classList.values()
		).toContain('bg-yellow-300');
	});

	test('displays red circle when status is busy', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.busy;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-busy')
		).toBeInTheDocument();
		expect(
			screen.getByTestId('profile-picture-status-busy').classList.values()
		).toContain('bg-red-500');
	});

	test('displays gray circle when status is offline', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.offline;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-offline')
		).toBeInTheDocument();
		expect(
			screen
				.getByTestId('profile-picture-status-offline')
				.classList.values()
		).toContain('bg-gray-500');
	});

	test('does not displays circle when status is hidden', () => {
		// Arrange
		const id = uuidv4();
		const picture = 'some-picture';
		const status = userStatus.hidden;

		// Act
		render(<ProfilePicture id={id} picture={picture} status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-hidden')
		).toBeInTheDocument();
		expect(
			screen.getByTestId('profile-picture-status-hidden').classList.length
		).toBe(0);
	});
});
