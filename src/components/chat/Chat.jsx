import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Conversation from '../Conversation';
import {
	getGenericProfilePicture,
	getInitials,
	getLastMessage,
	getRandomColor,
} from '../../utils/profileUtils';
import ContactList from '../ContactList';
import './chat.css';

const Chat = () => {
	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState({});

	const textInputRef = React.createRef();

	// TODO: MOCKS, replace with actual data later
	useEffect(() => {
		const obiWanKenobiId = uuidv4();
		const anakinSkywalkerId = uuidv4();

		const obiWanKenobi = {
			id: obiWanKenobiId,
			profile: {
				id: uuidv4(),
				name: 'Obi-Wan Kenobi',
				image: getGenericProfilePicture(
					getInitials('Obi-Wan Kenobi'),
					getRandomColor()
				),
			},
			messages: [
				{
					id: uuidv4(),
					sender: obiWanKenobiId,
					content: 'Hello there!',
				},
				{ id: uuidv4(), sender: 'self', content: 'General Kenobi...' },
			],
		};

		const anakinSkywalker = {
			id: anakinSkywalkerId,
			profile: {
				id: uuidv4(),
				name: 'Anakin Skywalker',
				image: getGenericProfilePicture(
					getInitials('Anakin Skywalker'),
					getRandomColor()
				),
			},
			messages: [
				{
					id: uuidv4(),
					sender: anakinSkywalkerId,
					content:
						'I have brought peace, freedom, justice, and security to my new empire.',
				},
			],
		};

		const ahsokaTano = {
			id: uuidv4(),
			profile: {
				id: uuidv4(),
				name: 'Ahsoka Tano',
				image: getGenericProfilePicture(
					getInitials('Ahsoka Tano'),
					getRandomColor()
				),
			},
			messages: [],
		};

		setChats([obiWanKenobi, anakinSkywalker, ahsokaTano]);
	}, []);

	const setFocusOnMessageBox = () => {
		if (textInputRef && textInputRef.current) textInputRef.current.focus();
	};

	useEffect(() => {
		setFocusOnMessageBox();
	}, [textInputRef]);

	const handleContactSelect = (id) => {
		setCurrentChat(chats.filter((c) => c.id === id)[0]);
		setFocusOnMessageBox();
	};

	const handleSend = (messageContent) => {
		const messages = [
			...currentChat.messages,
			{
				id: uuidv4(),
				sender: 'self',
				content: messageContent,
			},
		];

		setCurrentChat({
			...currentChat,
			messages,
		});

		const unaffectedChats = chats.filter((c) => c.id !== currentChat.id);
		const updatedChat = chats.filter((c) => c.id === currentChat.id)[0];
		updatedChat.messages = messages;

		setChats([updatedChat, ...unaffectedChats]);
	};

	return (
		<div className='bg-gradient-to-tr from-red-400 to-purple-500'>
			<div className='min-h-screen flex max-w-5xl ml-auto mr-auto bg-gray-800'>
				<ContactList
					userProfiles={chats.map((c) => ({
						id: c.id,
						profile: c.profile,
						lastMessage: getLastMessage(c.messages),
					}))}
					onContactSelect={handleContactSelect}
				/>
				<div className='flex flex-col flex-1'>
					<Conversation
						profile={currentChat.profile}
						messages={currentChat.messages}
						onSend={handleSend}
						ref={textInputRef}
					/>
				</div>
			</div>
		</div>
	);
};

export default Chat;
