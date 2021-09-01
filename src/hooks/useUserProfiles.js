import { useEffect, useState } from 'react';
import getLastMessage from '../utils/getLastMessage';

const useUserProfiles = (conversations, setCurrentConversation) => {
	const [userProfiles, setUserProfiles] = useState([]);

	const selectContact = (id) => {
		const current = conversations.find((c) => c.userId === id);
		setCurrentConversation({ ...current });
	};

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
