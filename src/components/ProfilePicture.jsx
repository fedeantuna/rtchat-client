import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ image }) => (
	<img className='rounded-full h-12 w-12 ml-2' src={image} alt='Profile' />
);

ProfilePicture.propTypes = {
	image: PropTypes.string.isRequired,
};

export default ProfilePicture;
