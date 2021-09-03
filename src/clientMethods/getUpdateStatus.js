import userStatus from '../enums/userStatus';

const getUpdateStatus = (conversations, setConversations) => {
	const updateStatus = (user) => {
		const updatedConversations = conversations.map((c) => ({ ...c }));

		const updatedConversation = updatedConversations.find(
			(uc) => uc.userId === user.id
		);

		updatedConversation.status = userStatus[user.status];

		setConversations([...updatedConversations]);
	};

	return updateStatus;
};

export default getUpdateStatus;
