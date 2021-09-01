import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Conversation from '../Conversation';
import './chat.css';
import NavigationPanel from '../NavigationPanel';
import Loading from '../Loading';
import useSignalR from '../../hooks/useSignalR';
import useConversations from '../../hooks/useConversations';
import useUserProfiles from '../../hooks/useUserProfiles';

const Chat = () => {
	const { user, isLoading, getAccessTokenSilently } = useAuth0();
	const { connection } = useSignalR(getAccessTokenSilently);
	const {
		conversations,
		currentConversation,
		setCurrentConversation,
		sendMessage,
		startConversation,
	} = useConversations(user, connection, getAccessTokenSilently);
	const { userProfiles, selectContact } = useUserProfiles(
		conversations,
		setCurrentConversation
	);

	if (isLoading) return <Loading />;

	return (
		<div className='bg-gradient-to-tr from-red-400 to-purple-500'>
			<div className='flex mr-auto ml-auto max-w-5xl bg-gray-800'>
				<NavigationPanel
					userProfiles={userProfiles}
					onContactSelect={selectContact}
					initializeConversation={startConversation}
				/>
				<Conversation
					current={currentConversation}
					onSend={sendMessage}
				/>
			</div>
		</div>
	);
};

export default Chat;
