import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const Contact = ({ userProfile, onSelect }) => (
	<div
		className='flex items-center mt-2 h-16 bg-gray-800 cursor-pointer hover:bg-gray-600'
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
		<div className='pt-1 ml-2 min-w-0 h-full text-white'>
			<h3 className='truncate'>{userProfile.email}</h3>
			<p className='truncate'>
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
