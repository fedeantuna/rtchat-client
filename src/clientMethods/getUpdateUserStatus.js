import userStatus from '../enums/userStatus';

const getUpdateUserStatus = (conversations, setConversations) => {
	const updateUserStatus = (user) => {
		const updatedConversations = conversations.map((c) => ({ ...c }));

		const updatedConversation = updatedConversations.find(
			(uc) => uc.userId === user.id
		);

		updatedConversation.status = userStatus[user.status];

		setConversations([...updatedConversations]);
	};

	return updateUserStatus;
};

export default getUpdateUserStatus;
