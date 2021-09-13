import React from 'react';
import { render, screen } from '@testing-library/react';
import Bubbles from '../../components/Bubbles';
import useBubbles from '../../hooks/useBubbles';

jest.mock('../../hooks/useBubbles');

describe('<Bubbles />', () => {
	beforeEach(() => {
		const firstStyle = {
			width: '15px',
			height: '15px',
			left: '25%',
			animationDuration: '6s',
			animationDelay: '3s',
		};
		const secondStyle = {
			width: '25px',
			height: '25px',
			left: '15%',
			animationDuration: '3s',
			animationDelay: '2s',
		};
		useBubbles.mockReturnValue([firstStyle, secondStyle]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders bubbles', () => {
		// Act
		render(<Bubbles />);

		// Assert
		expect(screen.getByTestId('bubbles')).toBeInTheDocument();
		expect(
			screen.getAllByTestId(
				/bubble-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
			).length
		).toBe(2);
	});

	test('calls useBubbles', () => {
		// Act
		render(<Bubbles />);

		// Assert
		expect(useBubbles).toHaveBeenCalledTimes(1);
	});
});
