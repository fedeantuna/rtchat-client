import getObjectWithRenamedProperties from '../../utils/getObjectWithRenamedProperties';

describe('getObjectWithRenamedProperties', () => {
	it('returns object with modified property', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const property = {
			name: 'someProperty',
			newName: 'someOtherProperty',
		};

		// Act
		const result = getObjectWithRenamedProperties(obj, [property]);

		// Assert
		expect(result).toHaveProperty(property.newName);
		expect(result[property.name]).toBeUndefined();
	});

	it('returns object with modified properties', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = [
			{
				name: 'someProperty',
				newName: 'someOtherProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const result = getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(result).toHaveProperty(properties[0].newName);
		expect(result).toHaveProperty(properties[1].newName);
		expect(result[properties[0].name]).toBeUndefined();
		expect(result[properties[1].name]).toBeUndefined();
	});

	it('returns a new object without modifying the original', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = [
			{
				name: 'someProperty',
				newName: 'someOtherProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const result = getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(result).toBeDefined();
		expect(obj).toHaveProperty(properties[0].name);
		expect(obj).toHaveProperty(properties[1].name);
		expect(obj[properties[0].newName]).toBeUndefined();
		expect(obj[properties[1].newName]).toBeUndefined();
	});

	it('throws an error when object is undefined', () => {
		// Arrange
		const obj = undefined;
		const properties = [
			{
				name: 'someProperty',
				newName: 'someOtherProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('The object is mandatory.');
	});

	it('throws an error when object is null', () => {
		// Arrange
		const obj = null;
		const properties = [
			{
				name: 'someProperty',
				newName: 'someOtherProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('The object is mandatory.');
	});

	it('throws an error when properties are undefined', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = undefined;

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('The properties are mandatory.');
	});

	it('throws an error when properties are null', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = null;

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('The properties are mandatory.');
	});

	it('throws an error when properties at least one property has same name and new name', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = [
			{
				name: 'someProperty',
				newName: 'someProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('Names and new names must be different.');
	});

	it('throws an error when properties at least one property name does not exist in the object properties', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = [
			{
				name: 'someOtherProperty',
				newName: 'someOtherValue',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError('Names must exist in the object.');
	});

	it('throws an error when properties at least one property new name does exist in the object properties', () => {
		// Arrange
		const obj = {
			someProperty: 'someValue',
			otherProperty: 'otherValue',
		};
		const properties = [
			{
				name: 'someProperty',
				newName: 'otherProperty',
			},
			{
				name: 'otherProperty',
				newName: 'someDifferentProperty',
			},
		];

		// Act
		const execute = () => getObjectWithRenamedProperties(obj, properties);

		// Assert
		expect(execute).toThrowError(
			'New names must not exist in the current object.'
		);
	});
});
