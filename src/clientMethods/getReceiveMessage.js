import { v4 as uuidv4 } from 'uuid';
import notificationSound from '../sounds/notification_high-intensity.wav';

const getReceiveMessage = (
	userId,
	conversations,
	currentConversation,
	setConversations,
	setCurrentConversation,
	hasFocus
) => {
	const getTargetUser = (message) => {
		const targetUser =
			message.sender.user_id === userId
				? message.receiver
				: message.sender;

		return targetUser;
	};

	const getTargetConversation = (targetUser) => {
		const targetConversation = conversations.find(
			(c) => c.userId === targetUser.user_id
		);

		if (!targetConversation) {
			return {
				userId: targetUser.user_id,
				email: targetUser.email,
				picture: targetUser.picture,
				status: targetUser.status,
				messages: [],
			};
		}

		return targetConversation;
	};

	const getTargetConversationWithUpdatedMessages = (targetUser, message) => {
		const targetConversation = getTargetConversation(targetUser);
		const messages = [
			...targetConversation.messages,
			{
				id: uuidv4(),
				sender: message.sender.user_id,
				content: message.content,
				red: false,
			},
		];

		const targetConversationWithUpdatedMessages = {
			...targetConversation,
			messages,
		};

		return targetConversationWithUpdatedMessages;
	};

	const getOtherConversations = (targetUserId) => {
		const otherConversations = conversations.filter(
			(c) => c.userId !== targetUserId
		);

		return otherConversations;
	};

	const updateConversations = (
		targetConversationWithUpdatedMessages,
		otherConversations,
		isCurrentChatReceivingMessages
	) => {
		setConversations([
			targetConversationWithUpdatedMessages,
			...otherConversations,
		]);
		if (isCurrentChatReceivingMessages) {
			setCurrentConversation(targetConversationWithUpdatedMessages);
		}
	};

	const playNotificationSound = async (isCurrentChatReceivingMessages) => {
		if (!hasFocus.current || !isCurrentChatReceivingMessages) {
			const notificationAudio = new Audio(notificationSound);
			try {
				await notificationAudio.play();
			} catch (error) {
				// log
			}
		}
	};

	const receiveMessage = (message) => {
		const targetUser = getTargetUser(message); // sender
		const targetConversationWithUpdatedMessages =
			getTargetConversationWithUpdatedMessages(targetUser, message);
		const otherConversations = getOtherConversations(targetUser.user_id);

		const isCurrentChatReceivingMessages =
			currentConversation &&
			currentConversation.userId ===
				targetConversationWithUpdatedMessages.userId;

		updateConversations(
			targetConversationWithUpdatedMessages,
			otherConversations,
			isCurrentChatReceivingMessages
		);

		playNotificationSound(isCurrentChatReceivingMessages);
	};

	return receiveMessage;
};

export default getReceiveMessage;
