import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';

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

		return cloneDeep(targetUser);
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

		return cloneDeep(targetConversation);
	};

	const getTargetConversationWithUpdatedMessages = (targetUser, message) => {
		const targetConversation = getTargetConversation(targetUser);
		targetConversation.messages = [
			...targetConversation.messages,
			{
				id: uuidv4(),
				sender: message.sender.user_id,
				content: message.content,
				red: false,
			},
		];

		return targetConversation;
	};

	const getOtherConversations = (targetUserId) => {
		const otherConversations = conversations.filter(
			(c) => c.userId !== targetUserId
		);

		return cloneDeep(otherConversations);
	};

	const updateConversations = (
		targetConversation,
		otherConversations,
		isCurrentChatReceivingMessages
	) => {
		setConversations([targetConversation, ...otherConversations]);
		if (isCurrentChatReceivingMessages) {
			setCurrentConversation(targetConversation);
		}
	};

	const playNotificationSound = async (isCurrentChatReceivingMessages) => {
		if (!hasFocus.current || !isCurrentChatReceivingMessages) {
			const notificationAudio = new Audio(
				'/notification_high-intensity.wav'
			);
			try {
				await notificationAudio.play();
			} catch (error) {
				// log
			}
		}
	};

	const receiveMessage = (message) => {
		const targetUser = getTargetUser(message);
		const targetConversation = getTargetConversationWithUpdatedMessages(
			targetUser,
			message
		);
		const otherConversations = getOtherConversations(targetUser.user_id);

		const isCurrentChatReceivingMessages =
			currentConversation &&
			currentConversation.userId === targetConversation.userId;

		updateConversations(
			targetConversation,
			otherConversations,
			isCurrentChatReceivingMessages
		);

		playNotificationSound(isCurrentChatReceivingMessages);
	};

	return receiveMessage;
};

export default getReceiveMessage;
