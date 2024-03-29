import cloneDeep from 'lodash.clonedeep';
import getUpdateUserStatus from '../../clientMethods/getUpdateUserStatus';
import userStatus from '../../enums/userStatus';

describe('getUpdateUserStatus', () => {
	const setConversations = jest.fn();

	afterEach(() => {
		jest.clearAllMocks();
	});

	const obiWanKenobi = {
		user_id: 'obi-wan-kenobi-user-id',
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
		status: userStatus.offline,
	};
	const countDooku = {
		user_id: 'count-dooku-user-id',
		email: 'countdooku@sith.sep',
		picture: 'some-beardy-picture',
		status: userStatus.away,
	};

	const obiWanKenobiChat = {
		userId: obiWanKenobi.user_id,
		email: obiWanKenobi.email,
		picture: obiWanKenobi.picture,
		status: obiWanKenobi.status,
		messages: [],
	};
	const countDookuChat = {
		userId: countDooku.user_id,
		email: countDooku.email,
		picture: countDooku.picture,
		status: countDooku.status,
		messages: [],
	};

	describe('updateUserStatus', () => {
		test('calls setConversations with the updated conversations', () => {
			// Arrange
			const user = cloneDeep(obiWanKenobi);

			const obiWanKenobiUpdatedChat = cloneDeep(obiWanKenobiChat);
			obiWanKenobiUpdatedChat.status = userStatus.online;
			const conversations = [
				obiWanKenobiUpdatedChat,
				cloneDeep(countDookuChat),
			];

			const updatedCnversations = [
				cloneDeep(obiWanKenobiChat),
				cloneDeep(countDookuChat),
			];

			const updateUserStatus = getUpdateUserStatus(
				conversations,
				setConversations
			);

			// Act
			updateUserStatus(user);

			// Assert
			expect(setConversations).toHaveBeenCalledTimes(1);
			expect(setConversations).toHaveBeenCalledWith(updatedCnversations);
		});

		test('does nothing when user is null', () => {
			// Arrange
			const user = null;

			const conversations = [];

			const updateUserStatus = getUpdateUserStatus(
				conversations,
				setConversations
			);

			// Act
			updateUserStatus(user);

			// Assert
			expect(setConversations).toHaveBeenCalledTimes(0);
		});
	});
});
