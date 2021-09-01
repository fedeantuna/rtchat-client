import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ picture }) => (
	<img className='ml-2 w-12 h-12 rounded-full' src={picture} alt='Profile' />
);

ProfilePicture.propTypes = {
	picture: PropTypes.string.isRequired,
};

export default ProfilePicture;
