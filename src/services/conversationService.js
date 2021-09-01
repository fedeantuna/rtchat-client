import getObjectWithRenamedProperties from '../utils/getObjectWithRenamedProperties';

const getUser = async (endpoint, accessToken) => {
	const response = await fetch(endpoint, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const user = await response.json();

	return user;
};

const getConversation = (user) => {
	const conversation = { ...user, messages: [] };

	const userIdProperty = {
		name: 'user_id',
		newName: 'userId',
	};

	const conversationWithRenamedProperties = getObjectWithRenamedProperties(
		conversation,
		[userIdProperty]
	);

	return conversationWithRenamedProperties;
};

const getConversationByUserEmail = async (email, accessToken) => {
	const user = await getUser(
		`${process.env.REACT_APP_USER_ENDPOINT}?email=${email}`,
		accessToken
	);

	if (!user.userId) return null;

	const conversation = getConversation(user);

	return conversation;
};

export { getConversationByUserEmail };
