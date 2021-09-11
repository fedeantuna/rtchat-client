import { toast } from 'react-toastify';
import cloneDeep from 'lodash.clonedeep';
import getStartConversation from '../../clientMethods/getStartConversation';
import userStatus from '../../enums/userStatus';
import { topRightNotification } from '../../models/toastNotificationConfiguration';

describe('getStartConversation', () => {
	const setConversations = jest.fn();
	const toastError = jest.fn();

	beforeEach(() => {
		toast.error = toastError;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const obiWanKenobi = {
		user_id: 'obi-wan-kenobi-user-id',
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
		status: userStatus.online,
	};
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

	describe('startConversation', () => {
		it('calls setConversations with the new conversation on top', () => {
			// Arrange
			const user = cloneDeep(obiWanKenobi);
			const conversations = [cloneDeep(countDookuChat)];
			const userWithRenamedProperties = {
				userId: obiWanKenobi.user_id,
				email: obiWanKenobi.email,
				picture: obiWanKenobi.picture,
				status: obiWanKenobi.status,
			};
			const conversation = {
				...userWithRenamedProperties,
				messages: [],
				selectOnLoad: true,
			};

			const startConversation = getStartConversation(
				conversations,
				setConversations
			);

			// Act
			startConversation(user);

			// Assert
			expect(setConversations).toHaveBeenCalledTimes(1);
			expect(setConversations).toHaveBeenCalledWith([
				conversation,
				...conversations,
			]);
			expect(toastError).toHaveBeenCalledTimes(0);
		});

		it('shows an error using toastify and does not call setConversations', () => {
			// Arrange
			const user = null;
			const conversations = [cloneDeep(countDookuChat)];

			const startConversation = getStartConversation(
				conversations,
				setConversations
			);

			// Act
			startConversation(user);

			// Assert
			expect(toastError).toHaveBeenCalledTimes(1);
			expect(toastError).toHaveBeenCalledWith(
				'User not found.',
				topRightNotification
			);
			expect(setConversations).toHaveBeenCalledTimes(0);
		});
	});
});
