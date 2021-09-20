import PropTypes from 'prop-types';

const conversationPropType = PropTypes.shape({
	userId: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	picture: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			sender: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		})
	),
});

export default conversationPropType;
