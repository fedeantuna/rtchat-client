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

export default getRandomInt;
