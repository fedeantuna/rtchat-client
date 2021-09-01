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
		<div className='mr-2 w-12 h-12 dropdown'>
			<button
				type='button'
				aria-haspopup='true'
				aria-expanded='false'
				aria-controls='profile-menu'
			>
				<ProfilePicture
					picture={
						user.picture ||
						getGenericProfilePicture(
							getInitials(user.name),
							getRandomColor()
						)
					}
				/>
			</button>
			<div className='invisible opacity-0 transition-all duration-300 transform origin-top-right scale-95 -translate-y-2 dropdown-menu'>
				<div
					className='absolute left-4 w-56 bg-gray-800 rounded-sm border border-gray-900 divide-y divide-gray-100 shadow-lg origin-top-right outline-'
					id='profile-menu'
					role='menu'
				>
					<div className='py-3 px-4'>
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
