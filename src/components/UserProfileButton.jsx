import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';
import useSignalR from '../hooks/useSignalR';
import userStatus from '../enums/userStatus';
import serverMethod from '../enums/serverMethod';
import StatusChangeButton from './StatusChangeButton';

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

	const handleChangeStatusKeyDown = (e, newStatus) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleChangeStatus(newStatus);
		}
	};

	return (
		<div
			data-testid='user-profile-button'
			className='w-12 h-12 mr-2 dropdown'
		>
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
					{Object.keys(userStatus).map((key) => (
						<StatusChangeButton
							key={`status-change-button-${key}`}
							displayText={`Appear ${userStatus[key]}`}
							status={userStatus[key]}
							onClick={() => handleChangeStatus(userStatus[key])}
							onKeyDown={(e) =>
								handleChangeStatusKeyDown(e, userStatus[key])
							}
						/>
					))}
					<div
						className='p-2 border-t border-white hover:bg-gray-700'
						role='button'
						tabIndex={0}
						onClick={handleLogout}
						onKeyDown={handleLogoutKeyPress}
					>
						Sign out
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfileButton;
