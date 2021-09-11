import cloneDeep from 'lodash.clonedeep';
import userStatus from '../enums/userStatus';

const getUpdateUserStatus = (conversations, setConversations) => {
	const updateUserStatus = (user) => {
		if (!user) {
			return;
		}

		const updatedConversations = cloneDeep(conversations);

		const updatedConversation = updatedConversations.find(
			(uc) => uc.userId === user.user_id
		);
		updatedConversation.status = userStatus[user.status];

		setConversations([...updatedConversations]);
	};

	return updateUserStatus;
};

export default getUpdateUserStatus;
