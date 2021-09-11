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
		it('calls setConversations with the updated conversations', () => {
			// Arrange
			const user = obiWanKenobi;

			const conversations = [
				{ ...obiWanKenobiChat, status: userStatus.online },
				countDookuChat,
			];

			const updatedCnversations = [obiWanKenobiChat, countDookuChat];

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

		it('does nothing when user is null', () => {
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
