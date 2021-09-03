import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';

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
		<div className='w-12 h-12 mr-2 dropdown'>
			<button
				type='button'
				aria-haspopup='true'
				aria-expanded='false'
				aria-controls='profile-menu'
			>
				<ProfilePicture picture={user.picture} />
			</button>
			<div className='invisible transition-all duration-300 origin-top-right transform scale-95 -translate-y-2 opacity-0 dropdown-menu'>
				<div
					className='absolute w-56 origin-top-right bg-gray-800 border border-gray-900 divide-y divide-gray-100 rounded-sm shadow-lg left-4 outline-'
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
