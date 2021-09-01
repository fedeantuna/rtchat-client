import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Conversation from '../Conversation';
import './chat.css';
import NavigationPanel from '../NavigationPanel';
import Loading from '../Loading';
import useMessageBox from '../../hooks/useMessageBox';
import useConversations from '../../hooks/useConversations';

const Chat = () => {
	const { isLoading } = useAuth0();

	const [textInputRef, setFocusOnMessageBox] = useMessageBox();
	const {
		userProfiles,
		currentConversation,
		handleContactSelect,
		handleMessageSend,
	} = useConversations();

	if (isLoading) return <Loading />;

	return (
		<div className='bg-gradient-to-tr from-red-400 to-purple-500'>
			<div className='flex mr-auto ml-auto max-w-5xl bg-gray-800'>
				<NavigationPanel
					userProfiles={userProfiles}
					onContactSelect={(id) =>
						handleContactSelect(id, setFocusOnMessageBox)
					}
				/>
				<Conversation
					current={currentConversation}
					onSend={handleMessageSend}
					ref={textInputRef}
				/>
			</div>
		</div>
	);
};

export default Chat;
