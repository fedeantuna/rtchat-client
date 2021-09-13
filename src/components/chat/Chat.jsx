import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer } from 'react-toastify';
import Conversation from '../Conversation';
import NavigationPanel from '../NavigationPanel';
import Loading from '../Loading';
import useConversations from '../../hooks/useConversations';
import useUserProfiles from '../../hooks/useUserProfiles';
import './chat.css';
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {
	const { isLoading } = useAuth0();
	const {
		conversations,
		currentConversation,
		setConversations,
		setCurrentConversation,
		sendMessage,
	} = useConversations();
	const { userProfiles, selectContact } = useUserProfiles(
		conversations,
		currentConversation,
		setConversations,
		setCurrentConversation
	);

	if (isLoading) return <Loading />;

	return (
		<div
			data-testid='chat'
			className='bg-gradient-to-tr from-red-400 to-purple-500'
		>
			<div className='flex max-w-5xl ml-auto mr-auto bg-gray-800'>
				<NavigationPanel
					userProfiles={userProfiles}
					onContactSelect={selectContact}
				/>
				<Conversation
					current={currentConversation}
					onSend={sendMessage}
				/>
			</div>
			<ToastContainer />
		</div>
	);
};

export default Chat;
