import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox';
import conversationPropType from '../propTypeModels/conversationPropType';
import ConversationHeader from './ConversationHeader';
import ConversationHistory from './ConversationHistory';

const Conversation = ({ current, onSend }) => (
	<div className='w-2/3 h-screen max-h-screen text-white bg-gray-900'>
		{current && (
			<div className='flex flex-col h-full'>
				<ConversationHeader
					picture={current.picture}
					email={current.email}
				/>
				<ConversationHistory messages={current.messages} />
				<MessageBox key={Date.now()} onSend={onSend} />
			</div>
		)}
	</div>
);

Conversation.propTypes = {
	current: conversationPropType,
	onSend: PropTypes.func.isRequired,
};

Conversation.defaultProps = {
	current: null,
};

export default Conversation;
