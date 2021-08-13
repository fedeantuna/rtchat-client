import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onEnter, filter, setFilter }) => {
	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			onEnter();
		}
	};

	return (
		<div className='pt-2 relative flex items-center text-gray-600'>
			<img
				className='rounded-full h-10 w-10 flex ml-2'
				src='./logo512.png'
				alt='Profile'
			/>
			<input
				className='bg-white w-9/12 h-8 px-2 rounded-lg text-sm focus:outline-none flex ml-1 flex-grow mr-2'
				type='search'
				name='search'
				id='search'
				placeholder='Search'
				onChange={(e) => setFilter(e.target.value)}
				value={filter}
				onKeyPress={handleKeyPress}
			/>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='absolute right-0 top-0 mt-5 mr-4 h-5 w-5 placeholder'
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
};

SearchBar.propTypes = {
	onEnter: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};

export default SearchBar;
