import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';
import userStatus from '../enums/userStatus';

const ConversationHeader = ({ picture, email, status }) => (
	<div className='flex items-center h-16 px-4 bg-gray-800 border-l border-gray-900'>
		<ProfilePicture picture={picture} status={status} />
		<h3 className='w-full ml-2 truncate'>{email}</h3>
	</div>
);

ConversationHeader.propTypes = {
	picture: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	status: PropTypes.string,
};

ConversationHeader.defaultProps = {
	status: userStatus.hidden,
};

export default ConversationHeader;
