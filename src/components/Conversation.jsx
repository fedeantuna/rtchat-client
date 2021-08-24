import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';
import MessageBox from './MessageBox';

const Conversation = React.forwardRef(
	({ profile, messages, onSend }, textInputRef) => (
		<div className='bg-gray-900 flex flex-col flex-1 text-white'>
			{profile && (
				<>
					<div className='flex overflow-hidden items-center h-16 px-4 bg-gray-800 border-l border-gray-900'>
						<ProfilePicture image={profile.image} />
						<h3 className='ml-2 w-64 whitespace-nowrap overflow-hidden overflow-ellipsis'>
							{profile.name}
						</h3>
					</div>
					<div className='flex flex-col flex-1 justify-end'>
						{messages &&
							messages.map((m) => (
								<div key={m.id}>
									{(m.sender === 'self' && (
										<div className='flex flex-col items-end'>
											<div className='mr-2 mb-2 p-2 max-w-xs bg-blue-600 rounded-t-lg rounded-bl-lg'>
												<p className='break-words'>
													{m.content}
												</p>
											</div>
										</div>
									)) || (
										<div className='flex flex-col items-start'>
											<div className='ml-2 mb-2 p-2 max-w-xs bg-blue-900 rounded-t-lg rounded-br-lg'>
												<p className='break-words'>
													{m.content}
												</p>
											</div>
										</div>
									)}
								</div>
							))}
					</div>
					<MessageBox
						key={Date.now()}
						onSend={onSend}
						ref={textInputRef}
					/>
				</>
			)}
		</div>
	)
);

Conversation.propTypes = {
	profile: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
	}),
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			sender: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		}).isRequired
	),
	onSend: PropTypes.func.isRequired,
};

Conversation.defaultProps = {
	profile: null,
	messages: null,
};

export default Conversation;
