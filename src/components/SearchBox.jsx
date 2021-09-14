import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ filter, setFilter, onKeyDown }) => (
	<div className='flex flex-grow ml-1 mr-2'>
		<input
			className='w-full h-8 px-2 text-sm text-gray-800 bg-white rounded-lg focus:outline-none'
			type='search'
			name='search'
			id='search'
			placeholder='Search'
			onChange={(e) => setFilter(e.target.value)}
			value={filter}
			onKeyDown={onKeyDown}
		/>

		<svg
			xmlns='http://www.w3.org/2000/svg'
			className='absolute top-0 right-0 w-5 h-5 mt-5 mr-4 text-gray-800 placeholder'
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
	onKeyDown: PropTypes.func.isRequired,
};

export default SearchBox;
