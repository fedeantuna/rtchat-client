import React from 'react';
import PropTypes from 'prop-types';
import StatusDiv from './StatusDiv';

const StatusChangeButton = ({ displayText, status, onKeyDown, onClick }) => (
	<div
		data-testid={`status-change-button-${status}`}
		className='flex items-center p-2 hover:bg-gray-700'
		role='button'
		tabIndex={0}
		onKeyDown={(e) => onKeyDown(e, status)}
		onClick={() => onClick(status)}
	>
		<StatusDiv status={status} />
		{displayText}
	</div>
);

StatusChangeButton.propTypes = {
	displayText: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default StatusChangeButton;
