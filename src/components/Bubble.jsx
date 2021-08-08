import React from 'react';
import PropTypes from 'prop-types';

const Bubble = ({ style }) => (
	<div
		className='absolute -bottom-28 w-10 h-10 bg-gray-100 rounded-full opacity-50 animate-rise'
		style={style}
	/>
);

Bubble.propTypes = {
	style: PropTypes.shape.isRequired,
};

export default Bubble;
