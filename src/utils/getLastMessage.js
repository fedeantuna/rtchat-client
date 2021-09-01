const getLastMessage = (messages) => {
	if (!messages || messages.length === 0) return null;

	return messages.slice(-1)[0];
};

export default getLastMessage;
