import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getReceiveMessage from '../clientMethods/getReceiveMessage';
import getStartConversation from '../clientMethods/getStartConversation';
import getUpdateUserStatus from '../clientMethods/getUpdateUserStatus';
import clientMethod from '../enums/clientMethod';
import serverMethod from '../enums/serverMethod';
import { topRightNotification } from '../models/toastNotificationConfiguration';
import useFocus from './useFocus';
import { useSignalR } from './useSignalR';

const useConversations = () => {
	const { user } = useAuth0();
	const { connection } = useSignalR();
	const [currentConversation, setCurrentConversation] = useState(null);
	const [conversations, setConversations] = useState([]);
	const hasFocus = useFocus();

	const receiveMessage = getReceiveMessage(
		user,
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

	const startConversation = getStartConversation(setConversations);

	const sendMessage = async (content) => {
		try {
			const message = {
				receiverId: currentConversation.userId,
				content,
			};
			await connection.invoke(serverMethod.sendMessage, message);
		} catch (error) {
			toast.error(
				'Failed to send message due to connection error. Refresh the page.',
				topRightNotification
			);
		}
	};

	useEffect(() => {
		if (connection) {
			connection.on(clientMethod.receiveMessage, receiveMessage);
		}

		return () => {
			if (connection) {
				connection.off(clientMethod.receiveMessage, receiveMessage);
			}
		};
	}, [connection, receiveMessage]);

	useEffect(() => {
		if (connection) {
			connection.on(clientMethod.updateUserStatus, updateUserStatus);
		}

		return () => {
			if (connection) {
				connection.off(clientMethod.updateUserStatus, updateUserStatus);
			}
		};
	}, [connection, updateUserStatus]);

	useEffect(() => {
		if (connection) {
			connection.on(clientMethod.startConversation, startConversation);
		}

		return () => {
			if (connection) {
				connection.off(
					clientMethod.startConversation,
					startConversation
				);
			}
		};
	}, [connection, startConversation]);

	useEffect(() => {
		if (conversations[0] && conversations[0].selectOnLoad) {
			delete conversations[0].selectOnLoad;
			setCurrentConversation({ ...conversations[0] });
		}
	}, [conversations]);

	useEffect(() => {
		if (currentConversation) {
			const updatedCurrentConversation = conversations.find(
				(c) => c.userId === currentConversation.userId
			);

			setCurrentConversation({ ...updatedCurrentConversation });
		}
	}, [conversations]);

	return {
		conversations,
		currentConversation,
		setCurrentConversation,
		sendMessage,
	};
};

export default useConversations;
