import React from 'react';
import PropTypes from 'prop-types';
import StatusDiv from './StatusDiv';

const ProfilePicture = ({ id, picture, status }) => (
	<div data-testid={`profile-picture-${id}`} className='flex'>
		<img
			className='w-12 h-12 ml-2 -mr-3 rounded-full'
			src={picture}
			alt='Profile'
		/>
		<div className='flex items-end'>
			<StatusDiv status={status} />
		</div>
	</div>
);

ProfilePicture.propTypes = {
	id: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
};

export default ProfilePicture;
