import { useEffect, useState } from 'react';
import cloneDeep from 'lodash.clonedeep';
import getLastMessage from '../utils/getLastMessage';

const useUserProfiles = (
	conversations,
	currentConversation,
	setConversations,
	setCurrentConversation
) => {
	const [userProfiles, setUserProfiles] = useState([]);

	const selectContact = (id) => {
		const current = conversations.find((c) => c.userId === id);
		setCurrentConversation({ ...current });
	};

	useEffect(() => {
		const readMessages = () => {
			if (
				currentConversation &&
				currentConversation.messages.some((m) => !m.red)
			) {
				const messages = cloneDeep(currentConversation.messages).map(
					(m) => ({
						...m,
						red: true,
					})
				);
				const updatedConversations = cloneDeep(conversations);
				const updatedConversation = updatedConversations.find(
					(uc) => uc.userId === currentConversation.userId
				);
				updatedConversation.messages = messages;

				const updatedUserProfiles = cloneDeep(userProfiles);
				const updatedUserProfile = updatedUserProfiles.find(
					(up) => up.userId === currentConversation.userId
				);
				updatedUserProfile.lastMessage.red = true;

				setConversations(updatedConversations);
				setUserProfiles(updatedUserProfiles);
			}
		};

		readMessages();
	}, [currentConversation]);

	useEffect(() => {
		const updateUserProfiles = () => {
			const updatedUserProfiles = cloneDeep(conversations).map((c) => ({
				userId: c.userId,
				email: c.email,
				picture: c.picture,
				status: c.status,
				lastMessage: getLastMessage(c.messages),
			}));

			setUserProfiles(updatedUserProfiles);
		};

		updateUserProfiles();
	}, [conversations]);

	return { userProfiles, selectContact };
};

export default useUserProfiles;
