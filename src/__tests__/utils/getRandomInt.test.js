import getRandomInt from '../../utils/getRandomInt';

describe('getRandomInt', () => {
	it('returns integer numbers', () => {
		// Arrange
		const min = 5;
		const max = 1500;

		// Act
		const result = getRandomInt(min, max);

		// Assert
		expect(Number.isInteger(result)).toBeTruthy();
	});

	it('generates a random number greater than or equal to min', () => {
		// Arrange
		const min = 5;
		const max = 1500;

		// Act
		for (let i = 0; i < 10000; i++) {
			const result = getRandomInt(min, max);

			// Assert
			expect(result).toBeGreaterThanOrEqual(min);
		}
	});

	it('generates a random number lower than or equal to max', () => {
		// Arrange
		const min = 5;
		const max = 1500;

		// Act
		for (let i = 0; i < 10000; i++) {
			const result = getRandomInt(min, max);

			// Assert
			expect(result).toBeLessThanOrEqual(max);
		}
	});

	it('throws an error when min value is undefined', () => {
		// Arrange
		const min = undefined;
		const max = 1500;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The minimum value for the range needs to be an integer'
		);
	});

	it('throws an error when min value is null', () => {
		// Arrange
		const min = null;
		const max = 1500;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The minimum value for the range needs to be an integer'
		);
	});

	it('throws an error when min is a decimal', () => {
		// Arrange
		const min = 7.6;
		const max = 1500;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The minimum value for the range needs to be an integer'
		);
	});

	it('throws an error when max value is undefined', () => {
		// Arrange
		const min = 7;
		const max = undefined;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The maximum value for the range needs to be an integer'
		);
	});

	it('throws an error when max value is null', () => {
		// Arrange
		const min = 7;
		const max = null;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The maximum value for the range needs to be an integer'
		);
	});

	it('throws an error when max is a decimal', () => {
		// Arrange
		const min = 7;
		const max = 9.3;

		// Act
		const execute = () => getRandomInt(min, max);

		// Assert
		expect(execute).toThrowError(
			'The maximum value for the range needs to be an integer'
		);
	});
});
