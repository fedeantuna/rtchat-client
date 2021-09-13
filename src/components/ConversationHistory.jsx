import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';
import messagePropType from '../propTypeModels/messagePropType';
import getLastMessage from '../utils/getLastMessage';

const ConversationHistory = ({ messages }) => {
	const { user } = useAuth0();

	useEffect(() => {
		const scrollToLastMessage = () => {
			if (messages) {
				const last = getLastMessage(messages);
				if (last && document.getElementById(last.id))
					document
						.getElementById(last.id)
						.scrollIntoView({ behavior: 'auto' });
			}
		};

		scrollToLastMessage();
	}, [messages]);

	return (
		<div
			data-testid='conversation-history'
			className='flex-1 overflow-y-scroll'
		>
			<div className='flex flex-col mt-2 overscroll-auto'>
				{messages &&
					messages.map((m) => (
						<div key={m.id} id={m.id}>
							{(m.sender === user.sub && (
								<div className='flex flex-col items-end'>
									<div className='max-w-xs p-2 mb-2 mr-2 bg-blue-600 rounded-t-lg rounded-bl-lg'>
										<p className='break-words'>
											{m.content}
										</p>
									</div>
								</div>
							)) || (
								<div className='flex flex-col items-start'>
									<div className='max-w-xs p-2 mb-2 ml-2 bg-blue-900 rounded-t-lg rounded-br-lg'>
										<p className='break-words'>
											{m.content}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
			</div>
		</div>
	);
};

ConversationHistory.propTypes = {
	messages: PropTypes.arrayOf(messagePropType),
};

ConversationHistory.defaultProps = {
	messages: null,
};

export default ConversationHistory;
