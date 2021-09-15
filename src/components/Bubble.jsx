import React from 'react';
import PropTypes from 'prop-types';
import bubbleStylePropType from '../propTypeModels/bubbleStylePropType';

const Bubble = ({ id, style }) => (
	<div
		data-testid={`bubble-${id}`}
		className='absolute bg-gray-100 rounded-full opacity-50 -bottom-28 animate-rise'
		style={style}
	/>
);

Bubble.propTypes = {
	id: PropTypes.string.isRequired,
	style: bubbleStylePropType.isRequired,
};

export default Bubble;
