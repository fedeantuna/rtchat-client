import cloneDeep from 'lodash.clonedeep';

const getLastMessage = (messages) => {
	if (!messages || messages.length === 0) return null;

	return cloneDeep(messages.slice(-1)[0]);
};

export default getLastMessage;
