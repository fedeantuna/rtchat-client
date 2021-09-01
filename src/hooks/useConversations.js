import { useEffect, useState } from 'react';
import getReceiveMessage from '../clientMethods/getReceiveMessage';
import { getConversationByUserEmail } from '../services/conversationService';

const useConversations = (user, connection, getAccessTokenSilently) => {
	const [currentConversation, setCurrentConversation] = useState(null);
	const [conversations, setConversations] = useState([]);

	const receiveMessage = getReceiveMessage(
		user,
		conversations,
		currentConversation,
		setConversations,
		setCurrentConversation
	);

	const sendMessage = async (content) => {
		try {
			const message = {
				receiver: {
					user_id: currentConversation.userId,
				},
				sender: {
					user_id: user.sub,
				},
				content,
			};
			await connection.invoke('SendMessage', message);
		} catch (error) {
			console.log('Error');
		}
	};

	const startConversation = async (filter) => {
		try {
			const accessToken = await getAccessTokenSilently({
				audience: process.env.REACT_APP_AUTH0_AUDIENCE,
			});

			const conversation = await getConversationByUserEmail(
				filter,
				accessToken
			);
			conversation.selectOnLoad = true;

			setConversations((prevState) => [conversation, ...prevState]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (connection) {
			connection.on('ReceiveMessage', receiveMessage);
		}

		return () => {
			if (connection) connection.off('ReceiveMessage');
		};
	}, [connection, receiveMessage]);

	useEffect(() => {
		if (conversations[0] && conversations[0].selectOnLoad) {
			setCurrentConversation({ ...conversations[0] });
		}
	}, [conversations]);

	return {
		conversations,
		currentConversation,
		setCurrentConversation,
		sendMessage,
		startConversation,
	};
};

export default useConversations;
