import React from 'react';
import PropTypes from 'prop-types';
import MessageBox from './MessageBox';
import conversationPropType from '../propTypeModels/conversationPropType';
import ConversationHeader from './ConversationHeader';
import ConversationHistory from './ConversationHistory';

const Conversation = React.forwardRef(({ current, onSend }, textInputRef) => (
	<div className='w-2/3 bg-gray-900 text-white h-screen max-h-screen'>
		{current && (
			<div className='flex flex-col h-full'>
				<ConversationHeader
					picture={current.picture}
					email={current.email}
				/>
				<ConversationHistory messages={current.messages} />
				<MessageBox
					key={Date.now()}
					onSend={onSend}
					ref={textInputRef}
				/>
			</div>
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
