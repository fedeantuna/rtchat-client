import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useMockData from './useMockData';

const useChat = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	const [chats, setChats] = useState([]);
	const [currentChat, setCurrentChat] = useState({});

	const textInputRef = React.createRef();

	// TODO: MOCKS, replace with actual data later
	useMockData(setChats);

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

	const handleMessageSend = (messageContent) => {
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

	return [
		{ user, isAuthenticated, isLoading },
		chats,
		currentChat,
		{ handleContactSelect, handleMessageSend },
		textInputRef,
	];
};

export default useChat;
