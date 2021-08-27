import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ picture }) => (
	<img className='rounded-full h-12 w-12 ml-2' src={picture} alt='Profile' />
);

ProfilePicture.propTypes = {
	picture: PropTypes.string.isRequired,
};

export default ProfilePicture;
