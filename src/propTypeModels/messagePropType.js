import PropTypes from 'prop-types';

const messagePropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	sender: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	red: PropTypes.bool.isRequired,
});

export default messagePropType;
