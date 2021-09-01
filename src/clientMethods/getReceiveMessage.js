import { v4 as uuidv4 } from 'uuid';

const getReceiveMessage = (
	user,
	conversations,
	currentConversation,
	setConversations,
	setCurrentConversation
) => {
	const getTargetUser = (message) => {
		const targetUser =
			message.sender.user_id === user.sub
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

	const getOtherConversations = (userId) => {
		const otherConversations = conversations.filter(
			(c) => c.userId !== userId
		);

		return otherConversations;
	};

	const updateConversations = (
		targetConversationWithUpdatedMessages,
		otherConversations
	) => {
		setConversations([
			targetConversationWithUpdatedMessages,
			...otherConversations,
		]);
		if (
			currentConversation.userId ===
			targetConversationWithUpdatedMessages.userId
		) {
			setCurrentConversation(targetConversationWithUpdatedMessages);
		}
	};

	const receiveMessage = (message) => {
		const targetUser = getTargetUser(message);
		const targetConversationWithUpdatedMessages =
			getTargetConversationWithUpdatedMessages(targetUser, message);
		const otherConversations = getOtherConversations(targetUser.user_id);

		updateConversations(
			targetConversationWithUpdatedMessages,
			otherConversations
		);
	};

	return receiveMessage;
};

export default getReceiveMessage;
