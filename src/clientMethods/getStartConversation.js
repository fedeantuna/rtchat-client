import { toast } from 'react-toastify';
import { topRightNotification } from '../models/toastNotificationConfiguration';
import getObjectWithRenamedProperties from '../utils/getObjectWithRenamedProperties';

const getStartConversation = (conversations, setConversations) => {
	const startConversation = (user) => {
		if (!user) {
			toast.error('User not found.', topRightNotification);

			return;
		}

		const userIdProperty = {
			name: 'user_id',
			newName: 'userId',
		};
		const userWithRenamedProperties = getObjectWithRenamedProperties(user, [
			userIdProperty,
		]);

		const conversation = { ...userWithRenamedProperties, messages: [] };
		conversation.selectOnLoad = true;

		setConversations([conversation, ...conversations]);
	};

	return startConversation;
};

export default getStartConversation;
