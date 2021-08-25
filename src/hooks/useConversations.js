import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getLastMessage } from '../utils/profileUtils';
import useMockData from './useMockData';

const useConversations = () => {
	const [conversations, setConversations] = useState([]);
	const [currentConversation, setCurrentConversation] = useState(null);
	const [userProfiles, setUserProfiles] = useState([]);

	// TODO: MOCKS, replace with actual data later
	useMockData(setConversations);

	useEffect(() => {
		setUserProfiles(
			conversations.map((c) => ({
				id: c.id,
				email: c.email,
				picture: c.picture,
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

	const handleMessageSend = (content) => {
		const messages = [
			...currentConversation.messages,
			{
				id: uuidv4(),
				sender: 'self',
				content,
			},
		];

		setCurrentConversation({
			...currentConversation,
			messages,
		});

		const otherConversations = conversations.filter(
			(c) => c.id !== currentConversation.id
		);
		const updatedConversation = conversations.filter(
			(c) => c.id === currentConversation.id
		)[0];
		updatedConversation.messages = messages;

		setConversations([updatedConversation, ...otherConversations]);
	};

	return {
		userProfiles,
		currentConversation,
		handleContactSelect,
		handleMessageSend,
	};
};

export default useConversations;
