import isValidEmail from '../../utils/isValidEmail';

describe('isValidEmail', () => {
	test('returns true when email is valid', () => {
		// Arrange
		const email = 'obi_wan.kenobi@jedi-order.rep';

		// Act
		const result = isValidEmail(email);

		// Assert
		expect(result).toBeTruthy();
	});

	test('returns false when email is not valid', () => {
		// Arrange
		const email = 'ahsokatano';

		// Act
		const result = isValidEmail(email);

		// Assert
		expect(result).toBeFalsy();
	});

	test('throws an error when email is undefined', () => {
		// Arrange
		const email = undefined;

		// Act
		const execute = () => isValidEmail(email);

		// Assert
		expect(execute).toThrowError('The email is mandatory.');
	});

	test('throws an error when email is null', () => {
		// Arrange
		const email = null;

		// Act
		const execute = () => isValidEmail(email);

		// Assert
		expect(execute).toThrowError('The email is mandatory.');
	});

	test('throws an error when email is not a string', () => {
		// Arrange
		const email = [];

		// Act
		const execute = () => isValidEmail(email);

		// Assert
		expect(execute).toThrowError('The email must be a string.');
	});
});
