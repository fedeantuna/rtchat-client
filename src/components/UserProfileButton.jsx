import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';
import useSignalR from '../hooks/useSignalR';
import userStatus from '../enums/userStatus';
import serverMethod from '../enums/serverMethod';

const UserProfileButton = () => {
	const { user, logout } = useAuth0();
	const { connection } = useSignalR();
	const [status, setStatus] = useState(userStatus.online);

	const handleLogout = () => {
		logout({ returnTo: window.location.origin });
	};

	const handleLogoutKeyPress = (e) => {
		e.preventDefault();
		if (e.key === 'Enter' || e.key === ' ') {
			handleLogout();
		}
	};

	const handleChangeStatus = (newStatus) => {
		connection.invoke(serverMethod.updateUserStatus, newStatus);

		setStatus(newStatus);
	};

	const handleChangeStatusKeyPress = (e, newStatus) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleChangeStatus(newStatus);
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
				<ProfilePicture
					id={`user-profile-button-${user.sub}`}
					picture={user.picture}
					status={status}
				/>
			</button>
			<div className='invisible transition-all duration-300 origin-top-right transform scale-95 -translate-y-2 opacity-0 dropdown-menu'>
				<div
					className='absolute w-56 origin-top-right bg-gray-800 border border-gray-900 rounded-sm shadow-lg left-4'
					id='profile-menu'
					role='menu'
				>
					<div className='px-4 py-3 border-b border-white'>
						<p className='text-sm leading-5'>Signed in as</p>
						<p className='text-sm font-medium leading-5 truncate'>
							{user.email}
						</p>
					</div>
					<div
						className='flex items-center p-2 hover:bg-gray-700'
						role='button'
						tabIndex={0}
						onKeyPress={(e) =>
							handleChangeStatusKeyPress(e, userStatus.online)
						}
						onClick={() => handleChangeStatus(userStatus.online)}
					>
						<div className='w-3 h-3 mr-2 bg-green-600 rounded-full' />
						Appear online
					</div>
					<div
						className='flex items-center p-2 hover:bg-gray-700'
						role='button'
						tabIndex={0}
						onKeyPress={(e) =>
							handleChangeStatusKeyPress(e, userStatus.away)
						}
						onClick={() => handleChangeStatus(userStatus.away)}
					>
						<div className='w-3 h-3 mr-2 bg-yellow-300 rounded-full' />
						Appear away
					</div>
					<div
						className='flex items-center p-2 hover:bg-gray-700'
						role='button'
						tabIndex={0}
						onKeyPress={(e) =>
							handleChangeStatusKeyPress(e, userStatus.busy)
						}
						onClick={() => handleChangeStatus(userStatus.busy)}
					>
						<div className='w-3 h-3 mr-2 bg-red-500 rounded-full' />
						Appear busy
					</div>
					<div
						className='flex items-center p-2 hover:bg-gray-700'
						role='button'
						tabIndex={0}
						onKeyPress={(e) =>
							handleChangeStatusKeyPress(e, userStatus.offline)
						}
						onClick={() => handleChangeStatus(userStatus.offline)}
					>
						<div className='w-3 h-3 mr-2 bg-gray-500 rounded-full' />
						Appear offline
					</div>
					<div
						className='p-2 border-t border-white hover:bg-gray-700'
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
