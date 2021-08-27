import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	getGenericProfilePicture,
	getInitials,
	getRandomColor,
} from '../utils/profileUtils';

const useMockData = (setConversations) => {
	useEffect(() => {
		const obiWanKenobiId = uuidv4();
		const anakinSkywalkerId = uuidv4();

		const obiWanKenobi = {
			id: obiWanKenobiId,
			email: 'Obi-Wan Kenobi',
			picture: getGenericProfilePicture(
				getInitials('Obi-Wan Kenobi'),
				getRandomColor()
			),
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
			email: 'Anakin Skywalker',
			picture: getGenericProfilePicture(
				getInitials('Anakin Skywalker'),
				getRandomColor()
			),
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
			email: 'Ahsoka Tano',
			picture: getGenericProfilePicture(
				getInitials('Ahsoka Tano'),
				getRandomColor()
			),
			messages: [],
		};

		setConversations([obiWanKenobi, anakinSkywalker, ahsokaTano]);
	}, []);
};

export default useMockData;
