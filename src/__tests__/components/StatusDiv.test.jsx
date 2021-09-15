import React from 'react';
import { render, screen } from '@testing-library/react';
import userStatus from '../../enums/userStatus';
import StatusDiv from '../../components/StatusDiv';

describe('<StatusDiv />', () => {
	test('renders status div', () => {});

	test('displays green circle when status is online', () => {
		// Arrange
		const status = userStatus.online;

		// Act
		render(<StatusDiv status={status} />);

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
		const status = userStatus.away;

		// Act
		render(<StatusDiv status={status} />);

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
		const status = userStatus.busy;

		// Act
		render(<StatusDiv status={status} />);

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
		const status = userStatus.offline;

		// Act
		render(<StatusDiv status={status} />);

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
		const status = userStatus.hidden;

		// Act
		render(<StatusDiv status={status} />);

		// Assert
		expect(
			screen.getByTestId('profile-picture-status-hidden')
		).toBeInTheDocument();
		expect(
			screen.getByTestId('profile-picture-status-hidden').classList.length
		).toBe(0);
	});
});
