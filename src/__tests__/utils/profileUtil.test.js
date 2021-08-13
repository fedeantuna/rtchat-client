import {
	getInitials,
	getLastMessage,
	getRandomColor,
} from '../../utils/profileUtils';

beforeEach(() => {
	jest.resetModules();
});

describe('getRandomColor', () => {
	it('returns a string', () => {
		// Arrange
		// Act
		const result = getRandomColor();

		// Assert
		expect(typeof result).toBe('string');
	});

	it('the returned string contains six hexadecimal numbers only after the #', () => {
		// Arrange
		// Act
		const result = getRandomColor();

		// Assert
		expect(/^#[0-9a-fA-F]{6}$/.test(result)).toBeTruthy();
	});

	it('the returned string contains hexadecimal number pairs less than or equal to A0', () => {
		// Arrange
		const max = parseInt(0xa0, 16);
		const result = getRandomColor();

		// Act
		const firstPair = result.substr(1, 2);
		const secondPair = result.substr(3, 2);
		const thirdPair = result.substr(5, 2);

		// Assert
		expect(parseInt(firstPair, 16)).toBeLessThanOrEqual(max);
		expect(parseInt(secondPair, 16)).toBeLessThanOrEqual(max);
		expect(parseInt(thirdPair, 16)).toBeLessThanOrEqual(max);
	});
});

describe('getInitials', () => {
	it('returns uppercase initials (first letter of the first word plus first letter of the last word)', () => {
		// Arrange
		const initials = 'OK';
		const fullName = 'Obi-Wan Kenobi';

		// Act
		const result = getInitials(fullName);

		// Assert
		expect(result).toBe(initials);
	});

	it('returns uppercase initial (first letter of the first word when full name is one word)', () => {
		// Arrange
		const initial = 'O';
		const fullName = 'Obi-Wan';

		// Act
		const result = getInitials(fullName);

		// Assert
		expect(result).toBe(initial);
	});

	it('throws an error when full name is undefined', () => {
		// Arrange
		const fullName = undefined;

		// Act
		const execute = () => {
			getInitials(fullName);
		};

		// Assert
		expect(execute).toThrowError('The name must be a non empty string.');
	});

	it('throws an error when full name is null', () => {
		// Arrange
		const fullName = null;

		// Act
		const execute = () => {
			getInitials(fullName);
		};

		// Assert
		expect(execute).toThrowError('The name must be a non empty string.');
	});

	it('throws an error when full name is an integer', () => {
		// Arrange
		const fullName = 123;

		// Act
		const execute = () => {
			getInitials(fullName);
		};

		// Assert
		expect(execute).toThrowError('The name must be a non empty string.');
	});
});

describe('getGenericProfilePicture', () => {
	it('returns an image as data url containing the specified initials in white and the specified background color', () => {
		// TODO: fillText method from canvas is not working properly
	});
});

describe('getLastMessage', () => {
	it('returns the last element of an array', () => {
		// Arrange
		const last = 5;
		const array = [0, 1, 2, 3, 4, last];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBe(last);
	});

	it('returns the only element of an array', () => {
		// Arrange
		const onlyElement = 5;
		const array = [onlyElement];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBe(onlyElement);
	});

	it('returns null when empty array', () => {
		// Arrange
		const array = [];

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});

	it('returns null when null array', () => {
		// Arrange
		const array = null;

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});

	it('returns null when undefined array', () => {
		// Arrange
		const array = undefined;

		// Act
		const result = getLastMessage(array);

		// Assert
		expect(result).toBeNull();
	});
});
