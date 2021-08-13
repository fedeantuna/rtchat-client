import React from 'react';
import PropTypes from 'prop-types';

const Bubble = ({ style }) => (
	<div
		className='absolute -bottom-28 bg-gray-100 rounded-full opacity-50 animate-rise'
		style={style}
	/>
);

Bubble.propTypes = {
	style: PropTypes.shape({
		width: PropTypes.string,
		height: PropTypes.string,
		left: PropTypes.string,
		animationDuration: PropTypes.string,
		animationDelay: PropTypes.string,
	}).isRequired,
};

export default Bubble;
