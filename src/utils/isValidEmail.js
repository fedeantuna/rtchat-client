const isValidEmail = (email) => {
	if (!email) throw new Error('The email is mandatory.');
	if (typeof email !== 'string')
		throw new Error('The email must be a string.');

	const pattern =
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
	const normalizedEmail = email.toUpperCase();

	return pattern.test(normalizedEmail);
};

export default isValidEmail;
