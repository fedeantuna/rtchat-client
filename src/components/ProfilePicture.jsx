import React from 'react';
import PropTypes from 'prop-types';
import userStatus from '../enums/userStatus';

const ProfilePicture = ({ id, picture, status }) => {
	const getStatusDiv = () => {
		switch (status) {
			case userStatus.online:
				return <div className='w-3 h-3 bg-green-600 rounded-full' />;
			case userStatus.away:
				return <div className='w-3 h-3 bg-yellow-300 rounded-full' />;
			case userStatus.busy:
				return <div className='w-3 h-3 bg-red-500 rounded-full' />;
			case userStatus.offline:
				return <div className='w-3 h-3 bg-gray-500 rounded-full' />;
			default:
				return <div />;
		}
	};

	return (
		<div data-testid={`profile-picture-${id}`} className='flex'>
			<img
				className='w-12 h-12 ml-2 -mr-3 rounded-full'
				src={picture}
				alt='Profile'
			/>
			<div className='flex items-end'>{getStatusDiv()}</div>
		</div>
	);
};

ProfilePicture.propTypes = {
	id: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	status: PropTypes.string,
};

ProfilePicture.defaultProps = {
	status: userStatus.hidden,
};

export default ProfilePicture;
