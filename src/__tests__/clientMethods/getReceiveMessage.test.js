import { v4 as uuidv4 } from 'uuid';
import getReceiveMessage from '../../clientMethods/getReceiveMessage';
import userStatus from '../../enums/userStatus';

jest.mock('uuid');

describe('getReceiveMessage', () => {
	const setConversations = jest.fn();
	const setCurrentConversation = jest.fn();
	const play = jest.fn();

	beforeEach(() => {
		window.HTMLMediaElement.prototype.play = () => {
			play();
		};

		uuidv4.mockReturnValue('some-uuid');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const userId = 'general-grievous-user-id';
	const generalGrievous = {
		user_id: userId,
		email: 'generalgrievous@droidarmy.sep',
		picture: 'some-ugly-picture',
		status: userStatus.busy,
	};

	const obiWanKenobi = {
		user_id: 'obi-wan-kenobi-user-id',
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
		status: userStatus.online,
	};
	const countDooku = {
		user_id: 'count-dooku-user-id',
		email: 'countdooku@sith.sep',
		picture: 'some-angry-picture',
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

	describe('receiveMessage', () => {
		it('plays notification sound when user focus is not on the app', () => {
			// Arrange
			const conversations = [];
			const currentConversation = null;
			const hasFocus = {
				current: false,
			};

			const message = {
				sender: obiWanKenobi,
				receiver: generalGrievous,
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(play).toHaveBeenCalledTimes(1);
		});

		it('plays notification sound when user focus is not on the current chat', () => {
			// Arrange
			const conversations = [];
			const currentConversation = null;
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: obiWanKenobi,
				receiver: generalGrievous,
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(play).toHaveBeenCalledTimes(1);
		});

		it('does not plays notification sound when user focus is on the current chat', () => {
			// Arrange
			const conversations = [obiWanKenobiChat];
			const currentConversation = obiWanKenobiChat;
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: obiWanKenobi,
				receiver: generalGrievous,
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(play).toHaveBeenCalledTimes(0);
		});

		it('calls setConversations with the updated target conversation on top and the others bellow', () => {
			// Arrange
			const conversations = [
				{ ...countDookuChat },
				{ ...obiWanKenobiChat },
			];
			const currentConversation = { ...countDookuChat };
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: { ...obiWanKenobi },
				receiver: { ...generalGrievous },
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(setConversations).toHaveBeenCalledTimes(1);
			expect(setConversations).toHaveBeenCalledWith([
				{
					...obiWanKenobiChat,
					messages: [
						{
							content: message.content,
							id: uuidv4(),
							red: false,
							sender: obiWanKenobi.user_id,
						},
					],
				},
				{
					...countDookuChat,
				},
			]);
			expect(setCurrentConversation).toHaveBeenCalledTimes(0);
		});

		it('does not call setCurrentConversation when the user does not have focus on the conversation receiving messages', () => {
			// Arrange
			const conversations = [
				{ ...countDookuChat },
				{ ...obiWanKenobiChat },
			];
			const currentConversation = { ...countDookuChat };
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: { ...obiWanKenobi },
				receiver: { ...generalGrievous },
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(setCurrentConversation).toHaveBeenCalledTimes(0);
		});

		it('calls setCurrentConversation when user has focus on the conversation receiving messages', () => {
			// Arrange
			const conversations = [
				{ ...countDookuChat },
				{ ...obiWanKenobiChat },
			];
			const currentConversation = { ...obiWanKenobiChat };
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: { ...obiWanKenobi },
				receiver: { ...generalGrievous },
				content: 'Hello there!',
			};

			const receiveMessage = getReceiveMessage(
				userId,
				conversations,
				currentConversation,
				setConversations,
				setCurrentConversation,
				hasFocus
			);

			// Act
			receiveMessage(message);

			// Assert
			expect(setCurrentConversation).toHaveBeenCalledTimes(1);
		});
	});
});
