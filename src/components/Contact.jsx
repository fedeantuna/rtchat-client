import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const Contact = ({ userProfile, onSelect }) => (
	<div
		className='flex items-center h-16 mt-2 bg-gray-800 hover:bg-gray-600 cursor-pointer'
		onClick={() => onSelect(userProfile.id)}
		onKeyPress={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				onSelect(userProfile.id);
			}
		}}
		role='button'
		tabIndex={0}
	>
		<ProfilePicture picture={userProfile.picture} />
		<div className='h-full pt-1 ml-2 text-white min-w-0'>
			<h3>{userProfile.email}</h3>
			<p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
				{userProfile.lastMessage &&
					userProfile.lastMessage.sender === 'self' &&
					'You: '}
				{userProfile.lastMessage &&
					userProfile.lastMessage.content &&
					userProfile.lastMessage.content}
			</p>
		</div>
	</div>
);

Contact.propTypes = {
	userProfile: userProfilePropType.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default Contact;
