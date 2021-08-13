const getRandomInt = (min, max) => {
	if (!Number.isInteger(min))
		throw new Error(
			'The minimum value for the range needs to be an integer'
		);
	if (!Number.isInteger(max))
		throw new Error(
			'The maximum value for the range needs to be an integer'
		);

	const minValue = Math.ceil(min);
	const maxValue = Math.floor(max);

	return Math.floor(Math.random() * (maxValue - minValue) + minValue);
};

const getRandomIntHex = (min, max) => {
	if (typeof min !== 'string' || !/^[0-9a-fA-F]+$/.test(min))
		throw new Error(
			'The minimum value needs to be a string representing a hexadecimal number'
		);
	if (typeof max !== 'string' || !/^[0-9a-fA-F]+$/.test(max))
		throw new Error(
			'The maximum value needs to be a string representing a hexadecimal number'
		);

	const minValue = parseInt(min, 16);
	const maxValue = parseInt(max, 16);

	const randomValue = getRandomInt(minValue, maxValue);

	return randomValue.toString(16);
};

export { getRandomInt, getRandomIntHex };
