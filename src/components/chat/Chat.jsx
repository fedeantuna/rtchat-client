import React from 'react';
import Conversation from '../Conversation';
import { getLastMessage } from '../../utils/profileUtils';
import ContactList from '../ContactList';
import './chat.css';
import useChat from '../../hooks/useChat';

const Chat = () => {
	const [chats, currentChat, handlers, textInputRef] = useChat();

	return (
		<div className='bg-gradient-to-tr from-red-400 to-purple-500'>
			<div className='min-h-screen flex max-w-5xl ml-auto mr-auto bg-gray-800'>
				<ContactList
					userProfiles={chats.map((c) => ({
						id: c.id,
						profile: c.profile,
						lastMessage: getLastMessage(c.messages),
					}))}
					onContactSelect={handlers.handleContactSelect}
				/>
				<div className='flex flex-col flex-1'>
					<Conversation
						profile={currentChat.profile}
						messages={currentChat.messages}
						onSend={handlers.handleMessageSend}
						ref={textInputRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chat;
