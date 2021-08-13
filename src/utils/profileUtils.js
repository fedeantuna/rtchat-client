import { createCanvas } from 'canvas';
import { getRandomIntHex } from './numberUtils';

const getRandomColor = () => {
	const firstPair = getRandomIntHex('00', 'A0');
	const secondPair = getRandomIntHex('00', 'A0');
	const thirdPair = getRandomIntHex('00', 'A0');

	const red = firstPair.length === 2 ? firstPair : `0${firstPair}`;
	const green = secondPair.length === 2 ? secondPair : `0${secondPair}`;
	const blue = thirdPair.length === 2 ? thirdPair : `0${thirdPair}`;

	return `#${red}${green}${blue}`;
};

const getInitials = (fullName) => {
	if (typeof fullName !== 'string' || !fullName)
		throw new Error('The name must be a non empty string.');

	const splittedName = fullName.split(' ');

	const firstName = splittedName.slice(0, 1)[0];
	let initials = firstName[0];

	if (splittedName.length > 1) {
		const lastName = splittedName.slice(-1)[0];
		initials += lastName[0];
	}

	return initials.toUpperCase();
};

const getGenericProfilePicture = (initials, imageColor, font = 'Arial') => {
	if (typeof initials !== 'string' || !initials || initials.length > 2)
		throw new Error(
			'The initials must be a non empty string no longer than 2 characters.'
		);
	if (typeof initials !== 'string' || !initials)
		throw new Error(
			'The image color must be a non empty string representing a hexadecimal color.'
		);

	const imageSize = parseInt(
		process.env.REACT_APP_DEFAULT_PROFILE_PICTURE_SIZE,
		10
	);
	const white = '#FFFFFF';

	const canvas = createCanvas(imageSize, imageSize);
	const context = canvas.getContext('2d');
	canvas.width = imageSize;
	canvas.height = imageSize;

	context.fillStyle = imageColor;
	context.fillRect(0, 0, imageSize, imageSize);

	context.fillStyle = white;
	context.textBaseline = 'middle';
	context.textAlign = 'center';
	context.font = `${imageSize / 2}px ${font}`;
	context.fillText(initials, imageSize / 2, imageSize / 2);

	return canvas.toDataURL();
};

const getLastMessage = (messages) => {
	if (!messages || messages.length < 1) return null;

	return messages.slice(-1)[0];
};

export {
	getRandomColor,
	getInitials,
	getGenericProfilePicture,
	getLastMessage,
};
