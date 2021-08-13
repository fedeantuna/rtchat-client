import { getRandomInt, getRandomIntHex } from '../../utils/numberUtils';

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
		const execute = () => {
			getRandomInt(min, max);
		};

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
		const execute = () => {
			getRandomInt(min, max);
		};

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
		const execute = () => {
			getRandomInt(min, max);
		};

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
		const execute = () => {
			getRandomInt(min, max);
		};

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
		const execute = () => {
			getRandomInt(min, max);
		};

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
		const execute = () => {
			getRandomInt(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The maximum value for the range needs to be an integer'
		);
	});
});

describe('getRandomIntHex', () => {
	it('returns strings containing hexadecimal numbers', () => {
		// Arrange
		const min = '0';
		const max = 'FFF';

		// Act
		const result = getRandomIntHex(min, max);

		// Assert
		expect(typeof result).toBe('string');
		expect(/^[0-9a-fA-F]+$/.test(result)).toBeTruthy();
	});

	it('generates a random number greater than or equal to min', () => {
		// Arrange
		const min = '5';
		const max = 'FFF';

		// Act
		for (let i = 0; i < 10000; i++) {
			const result = getRandomIntHex(min, max);

			// Assert
			expect(parseInt(result, 16)).toBeGreaterThanOrEqual(
				parseInt(min, 16)
			);
		}
	});

	it('generates a random number lower than or equal to max', () => {
		// Arrange
		const min = '5';
		const max = 'FFF';

		// Act
		for (let i = 0; i < 10000; i++) {
			const result = getRandomIntHex(min, max);

			// Assert
			expect(parseInt(result, 16)).toBeLessThanOrEqual(parseInt(max, 16));
		}
	});

	it('throws an error when min value is undefined', () => {
		// Arrange
		const min = undefined;
		const max = 'FFF';

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The minimum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when min value is null', () => {
		// Arrange
		const min = null;
		const max = 'FFF';

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The minimum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when min value is an integer', () => {
		// Arrange
		const min = 0;
		const max = 'FFF';

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The minimum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when min value is not a valid hexadecimal number', () => {
		// Arrange
		const min = 'Z';
		const max = 'FFF';

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The minimum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when max value is undefined', () => {
		// Arrange
		const min = '5';
		const max = undefined;

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The maximum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when max value is null', () => {
		// Arrange
		const min = '5';
		const max = null;

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The maximum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when max value is an integer', () => {
		// Arrange
		const min = '5';
		const max = 17;

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The maximum value needs to be a string representing a hexadecimal number'
		);
	});

	it('throws an error when max value is not a valid hexadecimal number', () => {
		// Arrange
		const min = '5';
		const max = 'FXF';

		// Act
		const execute = () => {
			getRandomIntHex(min, max);
		};

		// Assert
		expect(execute).toThrowError(
			'The maximum value needs to be a string representing a hexadecimal number'
		);
	});
});
