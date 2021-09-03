import React from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import ProfilePicture from './ProfilePicture';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const Contact = ({ userProfile, onSelect }) => {
	const { user } = useAuth0();

	return (
		<div
			className='flex items-center h-16 mt-2 bg-gray-800 cursor-pointer hover:bg-gray-600'
			onClick={() => onSelect(userProfile.userId)}
			onKeyPress={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onSelect(userProfile.userId);
				}
			}}
			role='button'
			tabIndex={0}
		>
			<ProfilePicture
				picture={userProfile.picture}
				status={userProfile.status}
			/>
			<div className='w-full h-full min-w-0 pt-1 ml-2 text-white'>
				<h3 className='truncate'>{userProfile.email}</h3>
				<div className='flex items-center flex-grow-0 flex-shrink-0'>
					<div className='flex-grow truncate'>
						<p className='truncate'>
							{userProfile.lastMessage &&
								userProfile.lastMessage.sender === user.sub &&
								'You: '}
							{userProfile.lastMessage &&
								userProfile.lastMessage.content &&
								userProfile.lastMessage.content}
						</p>
					</div>
					{userProfile.lastMessage &&
						!userProfile.lastMessage.red && (
							<div className='justify-end w-2 h-2 ml-2 mr-2 bg-gray-400 rounded-full' />
						)}
				</div>
			</div>
		</div>
	);
};

Contact.propTypes = {
	userProfile: userProfilePropType.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default Contact;
