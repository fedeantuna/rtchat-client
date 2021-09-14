import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBox from '../../components/SearchBox';

describe('<SearchBox />', () => {
	test('renders search box', () => {
		// Arrange
		const filter = '';
		const setFilterMock = jest.fn();
		const onKeyDownMock = jest.fn();

		// Act
		render(
			<SearchBox
				filter={filter}
				setFilter={setFilterMock}
				onKeyDown={onKeyDownMock}
			/>
		);

		// Assert
		expect(screen.getByTestId('search-box')).toBeInTheDocument();
	});

	test('changes on the input call set filter with the input current value', () => {
		// Arrange
		const filter = '';
		const setFilterMock = jest.fn();
		const onKeyDownMock = jest.fn();

		render(
			<SearchBox
				filter={filter}
				setFilter={setFilterMock}
				onKeyDown={onKeyDownMock}
			/>
		);

		const inputText = 'obiwankenobi';

		// Act
		fireEvent.change(screen.getByPlaceholderText(/search/i), {
			target: { value: inputText },
		});

		// Assert
		expect(setFilterMock).toHaveBeenCalledWith(inputText);
	});
});
