import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import Bubble from '../../components/Bubble';

describe('<Bubble />', () => {
	test('renders bubble with {style}', () => {
		// Arrange
		const bubbleId = uuidv4();
		const style = {
			width: '15px',
			height: '15px',
			left: '25%',
			animationDuration: '6s',
			animationDelay: '3s',
		};

		// Act
		render(<Bubble id={bubbleId} style={style} />);

		// Assert
		expect(screen.getByTestId(`bubble-${bubbleId}`)).toBeInTheDocument();
		expect(screen.getByTestId(`bubble-${bubbleId}`)).toHaveStyle(style);
	});
});
