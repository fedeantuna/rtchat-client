import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';

const SearchBar = ({ onEnter, filter, setFilter, profileImage }) => {
	const { user, logout } = useAuth0();

	const handleInputKeyPress = (e) => {
		if (e.key === 'Enter') {
			onEnter();
		}
	};

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	const handleLogoutKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleLogout();
		}
	};

	return (
		<div className='pt-2 relative flex items-center text-white'>
			<div className='dropdown h-12 w-12 mr-2'>
				<button
					type='button'
					aria-haspopup='true'
					aria-expanded='false'
					aria-controls='profile-menu'
				>
					<ProfilePicture image={profileImage} />
				</button>
				<div className='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95'>
					<div
						className='absolute left-4 w-56 origin-top-right bg-gray-800 border border-gray-900 divide-y divide-gray-100 rounded-sm shadow-lg outline-'
						id='profile-menu'
						role='menu'
					>
						<div className='px-4 py-3'>
							<p className='text-sm leading-5'>Signed in as</p>
							<p className='text-sm font-medium leading-5 truncate'>
								{user.name}
							</p>
						</div>
						<div
							className='p-2 hover:bg-gray-700'
							role='button'
							tabIndex={0}
							onKeyPress={handleLogoutKeyPress}
							onClick={handleLogout}
						>
							Sign out
						</div>
					</div>
				</div>
			</div>

			<input
				className='bg-white w-9/12 h-8 px-2 rounded-lg text-sm focus:outline-none flex ml-1 flex-grow mr-2'
				type='search'
				name='search'
				id='search'
				placeholder='Search'
				onChange={(e) => setFilter(e.target.value)}
				value={filter}
				onKeyPress={handleInputKeyPress}
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
	profileImage: PropTypes.string.isRequired,
};

export default SearchBar;
