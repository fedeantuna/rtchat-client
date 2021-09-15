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
});
