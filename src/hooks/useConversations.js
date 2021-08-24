import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getLastMessage } from '../utils/profileUtils';
import useMockData from './useMockData';

const useConversations = () => {
	const [conversations, setConversations] = useState([]);
	const [currentConversation, setCurrentConversation] = useState({});
	const [userProfiles, setUserProfiles] = useState([]);

	// TODO: MOCKS, replace with actual data later
	useMockData(setConversations);

	useEffect(() => {
		setUserProfiles(
			conversations.map((c) => ({
				id: c.id,
				profile: c.profile,
				lastMessage: getLastMessage(c.messages),
			}))
		);
	}, [conversations]);

	const handleContactSelect = (id, setFocusOnMessageBox) => {
		setCurrentConversation(conversations.filter((c) => c.id === id)[0]);
		if (setFocusOnMessageBox) {
			setFocusOnMessageBox();
		}
	};

	const handleMessageSend = (messageContent) => {
		const messages = [
			...currentConversation.messages,
			{
				id: uuidv4(),
				sender: 'self',
				content: messageContent,
			},
		];

		setCurrentConversation({
			...currentConversation,
			messages,
		});

		const unaffectedChats = conversations.filter(
			(c) => c.id !== currentConversation.id
		);
		const updatedChat = conversations.filter(
			(c) => c.id === currentConversation.id
		)[0];
		updatedChat.messages = messages;

		setConversations([updatedChat, ...unaffectedChats]);
	};

	return {
		userProfiles,
		currentConversation,
		handleContactSelect,
		handleMessageSend,
	};
};

export default useConversations;
