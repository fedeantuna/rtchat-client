import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import getReceiveMessage from '../clientMethods/getReceiveMessage';
import getStartConversation from '../clientMethods/getStartConversation';
import getUpdateUserStatus from '../clientMethods/getUpdateUserStatus';
import clientMethod from '../enums/clientMethod';
import getSendMessage from '../serverMethods/getSendMessage';
import useFocus from './useFocus';
import useSignalR from './useSignalR';

const useConversations = () => {
	const { user } = useAuth0();
	const { connection } = useSignalR();
	const [currentConversation, setCurrentConversation] = useState(null);
	const [conversations, setConversations] = useState([]);
	const hasFocus = useFocus();

	const receiveMessage = getReceiveMessage(
		user.sub,
		conversations,
		currentConversation,
		setConversations,
		setCurrentConversation,
		hasFocus
	);

	const updateUserStatus = getUpdateUserStatus(
		conversations,
		setConversations
	);

	const startConversation = getStartConversation(
		conversations,
		setConversations
	);

	const sendMessage = getSendMessage(connection, currentConversation);

	useEffect(() => {
		const registerReceiveMessageMethod = () => {
			if (connection) {
				connection.on(clientMethod.receiveMessage, receiveMessage);
			}
		};

		const unregisterReceiveMessageMethod = () => {
			if (connection) {
				connection.off(clientMethod.receiveMessage, receiveMessage);
			}
		};

		registerReceiveMessageMethod();

		return unregisterReceiveMessageMethod;
	}, [connection, receiveMessage]);

	useEffect(() => {
		const registerUpdateUserStatusMethod = () => {
			if (connection) {
				connection.on(clientMethod.updateUserStatus, updateUserStatus);
			}
		};

		const unregisterUpdateUserStatusMethod = () => {
			if (connection) {
				connection.off(clientMethod.updateUserStatus, updateUserStatus);
			}
		};

		registerUpdateUserStatusMethod();

		return unregisterUpdateUserStatusMethod;
	}, [connection, updateUserStatus]);

	useEffect(() => {
		const registerStartConversationMethod = () => {
			if (connection) {
				connection.on(
					clientMethod.startConversation,
					startConversation
				);
			}
		};

		const unregisterStartConversationMethod = () => {
			if (connection) {
				connection.off(
					clientMethod.startConversation,
					startConversation
				);
			}
		};

		registerStartConversationMethod();

		return unregisterStartConversationMethod;
	}, [connection, startConversation]);

	useEffect(() => {
		const updateCurrentConversation = () => {
			if (currentConversation && !conversations[0].selectOnLoad) {
				const updatedCurrentConversation = conversations.find(
					(c) => c.userId === currentConversation.userId
				);

				setCurrentConversation({ ...updatedCurrentConversation });
			}
		};

		updateCurrentConversation();
	}, [conversations]);

	useEffect(() => {
		const selectConversationOnLoad = () => {
			if (conversations[0] && conversations[0].selectOnLoad) {
				delete conversations[0].selectOnLoad;
				setCurrentConversation({ ...conversations[0] });
			}
		};

		selectConversationOnLoad();
	}, [conversations]);
	return {
		conversations,
		currentConversation,
		setCurrentConversation,
		sendMessage,
	};
};

export default useConversations;
