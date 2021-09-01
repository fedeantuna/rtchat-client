import PropTypes from 'prop-types';

const userProfilePropType = PropTypes.shape({
	userId: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	lastMessage: PropTypes.shape({
		id: PropTypes.string.isRequired,
		sender: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	}),
});

export default userProfilePropType;
