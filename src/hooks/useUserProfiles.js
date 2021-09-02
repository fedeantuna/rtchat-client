import { useEffect, useState } from 'react';
import getLastMessage from '../utils/getLastMessage';

const useUserProfiles = (
	conversations,
	currentConversation,
	setCurrentConversation
) => {
	const [userProfiles, setUserProfiles] = useState([]);

	const selectContact = (id) => {
		const current = conversations.find((c) => c.userId === id);
		setCurrentConversation({ ...current });
	};

	useEffect(() => {
		if (
			currentConversation &&
			currentConversation.messages.some((m) => !m.red)
		) {
			const messages = currentConversation.messages.map((m) => ({
				...m,
				red: true,
			}));

			const updatedUserProfiles = userProfiles.slice();
			const updatedUserProfile = updatedUserProfiles.find(
				(up) => up.userId === currentConversation.userId
			);
			updatedUserProfile.lastMessage.red = true;

			setCurrentConversation({ ...currentConversation, messages });
			setUserProfiles(updatedUserProfiles);
		}
	}, [currentConversation]);

	useEffect(() => {
		setUserProfiles(
			conversations.map((c) => ({
				userId: c.userId,
				email: c.email,
				picture: c.picture,
				lastMessage: getLastMessage(c.messages),
			}))
		);
	}, [conversations]);

	return { userProfiles, selectContact };
};

export default useUserProfiles;
