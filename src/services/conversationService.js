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

	const userIdProperty = {
		name: 'user_id',
		newName: 'userId',
	};

	const userWithRenamedProperties = getObjectWithRenamedProperties(user, [
		userIdProperty,
	]);

	return userWithRenamedProperties;
};

const getConversation = (user) => {
	const conversation = { ...user, messages: [] };

	return conversation;
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
