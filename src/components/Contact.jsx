import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';

const Contact = ({ userId, profile, lastMessage, onSelect }) => (
	<div
		className='flex items-center h-16 mt-2 bg-gray-800 hover:bg-gray-600 cursor-pointer'
		onClick={() => onSelect(userId)}
		onKeyPress={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				onSelect(userId);
			}
		}}
		role='button'
		tabIndex={0}
	>
		<ProfilePicture image={profile.image} />
		<div className='h-full pt-1 ml-2 text-white min-w-0'>
			<h3>{profile.name}</h3>
			<p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
				{lastMessage && lastMessage.sender === 'self' && 'You: '}
				{lastMessage && lastMessage.content && lastMessage.content}
			</p>
		</div>
	</div>
);

Contact.propTypes = {
	userId: PropTypes.string.isRequired,
	profile: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}).isRequired,
	lastMessage: PropTypes.shape({
		id: PropTypes.string.isRequired,
		sender: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}),
	onSelect: PropTypes.func.isRequired,
};

Contact.defaultProps = {
	lastMessage: null,
};

export default Contact;
