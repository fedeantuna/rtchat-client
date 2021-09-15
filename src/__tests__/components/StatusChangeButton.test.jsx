import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusChangeButton from '../../components/StatusChangeButton';
import userStatus from '../../enums/userStatus';

describe('<StatusChangeButton />', () => {
	test('renders status change button', () => {
		// Arrange
		const displayText = 'Appear online';
		const status = userStatus.online;
		const onKeyDown = jest.fn();
		const onClick = jest.fn();

		// Act
		render(
			<StatusChangeButton
				displayText={displayText}
				status={status}
				onKeyDown={onKeyDown}
				onClick={onClick}
			/>
		);

		// Assert
		expect(
			screen.getByTestId('status-change-button-online')
		).toBeInTheDocument();
		expect(screen.getByTestId('status-div-online')).toBeInTheDocument();
		expect(screen.getByText(displayText)).toBeInTheDocument();
	});
});
