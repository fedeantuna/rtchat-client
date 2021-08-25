import React from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from './ProfilePicture';
import MessageBox from './MessageBox';
import conversationPropType from '../propTypeModels/conversationPropType';

const Conversation = React.forwardRef(({ current, onSend }, textInputRef) => (
	<div className='bg-gray-900 flex flex-col flex-1 text-white'>
		{current && (
			<>
				<div className='flex overflow-hidden items-center h-16 px-4 bg-gray-800 border-l border-gray-900'>
					<ProfilePicture picture={current.picture} />
					<h3 className='ml-2 w-64 whitespace-nowrap overflow-hidden overflow-ellipsis'>
						{current.email}
					</h3>
				</div>
				<div className='flex flex-col flex-1 justify-end'>
					{current.messages &&
						current.messages.map((m) => (
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
));

Conversation.propTypes = {
	current: conversationPropType,
	onSend: PropTypes.func.isRequired,
};

Conversation.defaultProps = {
	current: null,
};

export default Conversation;
