import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash.clonedeep';
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
	const generalGrievousChat = {
		userId: generalGrievous.user_id,
		email: generalGrievous.email,
		picture: generalGrievous.picture,
		status: generalGrievous.status,
		messages: [],
	};

	describe('receiveMessage', () => {
		test('plays notification sound when user focus is not on the app', () => {
			// Arrange
			const conversations = [];
			const currentConversation = null;
			const hasFocus = {
				current: false,
			};

			const message = {
				sender: cloneDeep(obiWanKenobi),
				receiver: cloneDeep(generalGrievous),
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

		test('plays notification sound when user focus is not on the current chat', () => {
			// Arrange
			const conversations = [];
			const currentConversation = null;
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(obiWanKenobi),
				receiver: cloneDeep(generalGrievous),
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

		test('does not plays notification sound when user focus is on the current chat', () => {
			// Arrange
			const conversations = [cloneDeep(obiWanKenobiChat)];
			const currentConversation = cloneDeep(obiWanKenobiChat);
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(obiWanKenobi),
				receiver: cloneDeep(generalGrievous),
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

		test('does not plays notification sound when user focus chats itself', () => {
			// Arrange
			const conversations = [
				cloneDeep(obiWanKenobiChat),
				cloneDeep(generalGrievousChat),
			];
			const currentConversation = cloneDeep(generalGrievousChat);
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(generalGrievous),
				receiver: cloneDeep(generalGrievous),
				content: 'Ahrg...',
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

		test('calls setConversations with the updated target conversation on top and the others bellow', () => {
			// Arrange
			const conversations = [
				cloneDeep(countDookuChat),
				cloneDeep(obiWanKenobiChat),
			];
			const currentConversation = cloneDeep(countDookuChat);
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(obiWanKenobi),
				receiver: cloneDeep(generalGrievous),
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

			const expectedObiWanKenobiChat = cloneDeep(obiWanKenobiChat);
			expectedObiWanKenobiChat.messages = [
				{
					content: message.content,
					id: uuidv4(),
					red: false,
					sender: obiWanKenobi.user_id,
				},
			];
			const expectedCountDookuChat = cloneDeep(countDookuChat);
			const expectedConversations = [
				expectedObiWanKenobiChat,
				expectedCountDookuChat,
			];

			// Act
			receiveMessage(message);

			// Assert
			expect(setConversations).toHaveBeenCalledTimes(1);
			expect(setConversations).toHaveBeenCalledWith(
				expectedConversations
			);
			expect(setCurrentConversation).toHaveBeenCalledTimes(0);
		});

		test('does not call setCurrentConversation when the user does not have focus on the conversation receiving messages', () => {
			// Arrange
			const conversations = [
				cloneDeep(countDookuChat),
				cloneDeep(obiWanKenobiChat),
			];
			const currentConversation = cloneDeep(countDookuChat);
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(obiWanKenobiChat),
				receiver: cloneDeep(generalGrievous),
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

		test('calls setCurrentConversation when user has focus on the conversation receiving messages', () => {
			// Arrange
			const conversations = [
				cloneDeep(countDookuChat),
				cloneDeep(obiWanKenobiChat),
			];
			const currentConversation = cloneDeep(obiWanKenobiChat);
			const hasFocus = {
				current: true,
			};

			const message = {
				sender: cloneDeep(obiWanKenobi),
				receiver: cloneDeep(generalGrievous),
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
