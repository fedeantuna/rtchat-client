import { toast } from 'react-toastify';
import serverMethod from '../enums/serverMethod';
import { topRightNotification } from '../models/toastNotificationConfiguration';

const getSendMessage = (connection, currentConversation) => {
	const sendMessage = async (content) => {
		try {
			const message = {
				receiverId: currentConversation.userId,
				content,
			};
			await connection.invoke(serverMethod.sendMessage, message);
		} catch (error) {
			toast.error(
				'Failed to send message due to connection error. Refresh the page.',
				topRightNotification
			);
		}
	};

	return sendMessage;
};

export default getSendMessage;
