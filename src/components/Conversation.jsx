import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox';
import conversationPropType from '../propTypeModels/conversationPropType';
import ConversationHeader from './ConversationHeader';
import ConversationHistory from './ConversationHistory';
import userStatus from '../enums/userStatus';

const Conversation = ({ current, onSend }) => (
	<div
		data-testid='conversation'
		className='w-2/3 h-screen max-h-screen text-white bg-gray-900'
	>
		{current && (
			<div className='flex flex-col h-full'>
				<ConversationHeader
					userId={current.userId}
					picture={current.picture}
					email={current.email}
					status={current.status}
				/>
				<ConversationHistory messages={current.messages} />
				<MessageBox
					onSend={onSend}
					enabled={current.status !== userStatus.offline}
				/>
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
