import React from 'react';
import ProfilePicture from './ProfilePicture';

const ConversationHeader = ({ picture, email }) => (
	<div className='flex items-center h-16 px-4 bg-gray-800 border-l border-gray-900'>
		<ProfilePicture picture={picture} />
		<h3 className='ml-2 w-full truncate'>{email}</h3>
	</div>
);

export default ConversationHeader;
