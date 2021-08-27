import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ filter, setFilter, onKeyPress }) => (
	<div className='flex ml-1 flex-grow mr-2'>
		<input
			className='bg-white w-full h-8 px-2 rounded-lg text-sm focus:outline-none text-gray-800'
			type='search'
			name='search'
			id='search'
			placeholder='Search'
			onChange={(e) => setFilter(e.target.value)}
			value={filter}
			onKeyPress={onKeyPress}
		/>

		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='absolute right-0 top-0 mt-5 mr-4 h-5 w-5 placeholder text-gray-800'
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			role='presentation'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
			/>
		</svg>
	</div>
);

SearchBox.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
};

export default SearchBox;
