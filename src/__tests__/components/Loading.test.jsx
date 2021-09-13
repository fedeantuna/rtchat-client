import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading';

describe('<Loading />', () => {
	test('renders loading', () => {
		// Act
		render(<Loading />);

		// Assert
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});
});
