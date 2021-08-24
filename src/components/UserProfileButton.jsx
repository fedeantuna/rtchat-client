import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';
import {
	getGenericProfilePicture,
	getInitials,
	getRandomColor,
} from '../utils/profileUtils';

const UserProfileButton = () => {
	const { user, logout } = useAuth0();

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	const handleLogoutKeyPress = (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleLogout();
		}
	};

	return (
		<div className='dropdown h-12 w-12 mr-2'>
			<button
				type='button'
				aria-haspopup='true'
				aria-expanded='false'
				aria-controls='profile-menu'
			>
				<ProfilePicture
					image={
						user.picture ||
						getGenericProfilePicture(
							getInitials(user.name),
							getRandomColor()
						)
					}
				/>
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
							{user.email}
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
	);
};

export default UserProfileButton;
