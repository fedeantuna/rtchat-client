import { toast } from 'react-toastify';
import serverMethod from '../../enums/serverMethod';
import userStatus from '../../enums/userStatus';
import { topRightNotification } from '../../models/toastNotificationConfiguration';
import getSendMessage from '../../serverMethods/getSendMessage';

describe('getSendMessage', () => {
	const toastError = jest.fn();

	const connection = {
		invoke: jest.fn(),
		on: jest.fn(),
		off: jest.fn(),
	};

	beforeEach(() => {
		toast.error = toastError;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const countDooku = {
		user_id: 'count-dooku-user-id',
		email: 'countdooku@sith.sep',
		picture: 'some-beardy-picture',
		status: userStatus.away,
	};

	const countDookuChat = {
		userId: countDooku.user_id,
		email: countDooku.email,
		picture: countDooku.picture,
		status: countDooku.status,
		messages: [],
	};

	describe('sendMessage', () => {
		it('calls sendMessage method on the server using invoke', () => {
			// Arrange
			const content = 'Count Dooku...';
			const currentConversation = countDookuChat;

			const message = {
				receiverId: currentConversation.userId,
				content,
			};

			const sendMessage = getSendMessage(connection, currentConversation);

			// Act
			sendMessage(content);

			// Assert
			expect(connection.invoke).toHaveBeenCalledTimes(1);
			expect(connection.invoke).toHaveBeenCalledWith(
				serverMethod.sendMessage,
				message
			);
			expect(toastError).toHaveBeenCalledTimes(0);
		});

		it('notifies the user that there has been en error when the invoke method fails', () => {
			// Arrange
			const content = 'Count Dooku...';
			const currentConversation = countDookuChat;

			const sendMessage = getSendMessage(connection, currentConversation);

			connection.invoke.mockImplementation(() => {
				throw new Error();
			});

			// Act
			sendMessage(content);

			// Assert
			expect(toastError).toHaveBeenCalledTimes(1);
			expect(toastError).toHaveBeenCalledWith(
				'Failed to send message due to connection error. Refresh the page.',
				topRightNotification
			);
		});
	});
});
