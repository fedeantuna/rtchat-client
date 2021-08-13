import React, { useState } from 'react';
import PropTypes from 'prop-types';

const MessageBox = React.forwardRef(({ onSend }, textInputRef) => {
	const [messageContent, setMessageContent] = useState('');

	const handleSendMessage = () => {
		onSend(messageContent);

		setMessageContent('');
	};

	return (
		<div className='relative flex items-center text-white my-2 mx-2'>
			<input
				className='bg-gray-800 w-9/12 h-10 px-2 rounded-lg text-sm focus:outline-none flex flex-grow mr-2'
				type='text'
				name='message-box'
				id='message-box'
				placeholder='Write a message...'
				value={messageContent}
				onChange={(e) => setMessageContent(e.currentTarget.value)}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						handleSendMessage();
					}
				}}
				ref={textInputRef}
			/>

			{(messageContent.length > 0 && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-blue-500 cursor-pointer transform rotate-90'
					viewBox='0 0 20 20'
					fill='currentColor'
					id='send-icon'
					onClick={handleSendMessage}
				>
					<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
				</svg>
			)) || (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6 text-gray-600 transform rotate-90'
					viewBox='0 0 20 20'
					fill='currentColor'
					id='send-icon'
				>
					<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
				</svg>
			)}
		</div>
	);
});

MessageBox.propTypes = {
	onSend: PropTypes.func.isRequired,
};

export default MessageBox;
