import React from 'react';
import bubbleStylePropType from '../propTypeModels/bubbleStylePropType';

const Bubble = ({ style }) => (
	<div
		className='absolute -bottom-28 bg-gray-100 rounded-full opacity-50 animate-rise'
		style={style}
	/>
);

Bubble.propTypes = {
	style: bubbleStylePropType.isRequired,
};

export default Bubble;
