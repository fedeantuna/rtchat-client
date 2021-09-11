import cloneDeep from 'lodash.clonedeep';

const getObjectWithRenamedProperties = (obj, properties) => {
	if (!obj) throw new Error('The object is mandatory.');
	if (!properties) throw new Error('The properties are mandatory.');
	if (properties.find((p) => p.name === p.newName))
		throw new Error('Names and new names must be different.');
	if (properties.some((p) => !Object.keys(obj).includes(p.name)))
		throw new Error('Names must exist in the object.');
	if (properties.some((p) => Object.keys(obj).includes(p.newName)))
		throw new Error('New names must not exist in the current object.');

	const newObj = cloneDeep(obj);

	properties.forEach((property) => {
		Object.defineProperty(
			newObj,
			property.newName,
			Object.getOwnPropertyDescriptor(newObj, property.name)
		);
		delete newObj[property.name];
	});

	return newObj;
};

export default getObjectWithRenamedProperties;
