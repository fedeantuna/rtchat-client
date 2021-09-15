import getLastMessage from '../../utils/getLastMessage';

describe('getLastMessage', () => {
	test('returns the last element of an array', () => {
		// Arrange
		const last = 5;
		const array = [0, 1, 2, 3, 4, last];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBe(last);
	});

	test('returns the only element of an array', () => {
		// Arrange
		const onlyElement = 5;
		const array = [onlyElement];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBe(onlyElement);
	});

	test('returns null when empty array', () => {
		// Arrange
		const array = [];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});

	test('returns null when null array', () => {
		// Arrange
		const array = null;

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});

	test('returns null when undefined array', () => {
		// Arrange
		const array = undefined;

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});
});
