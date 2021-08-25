import PropTypes from 'prop-types';

const bubbleStylePropType = PropTypes.shape({
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	left: PropTypes.string.isRequired,
	animationDuration: PropTypes.string.isRequired,
	animationDelay: PropTypes.string.isRequired,
});

export default bubbleStylePropType;
