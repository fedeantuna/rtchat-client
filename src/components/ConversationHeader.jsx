import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';

const ConversationHeader = ({ picture, email }) => (
	<div className='flex items-center px-4 h-16 bg-gray-800 border-l border-gray-900'>
		<ProfilePicture picture={picture} />
		<h3 className='ml-2 w-full truncate'>{email}</h3>
	</div>
);

ConversationHeader.propTypes = {
	picture: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
};

export default ConversationHeader;
