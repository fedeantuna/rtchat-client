import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
	getGenericProfilePicture,
	getInitials,
	getRandomColor,
} from '../utils/profileUtils';

const useMockData = (setChats) => {
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
};

export default useMockData;
