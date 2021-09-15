import React from 'react';
import PropTypes from 'prop-types';
import StatusDiv from './StatusDiv';

const StatusChangeButton = ({
	displayText,
	userStatus,
	onKeyDown,
	onClick,
}) => (
	<div
		data-testid={`status-change-button-${userStatus}`}
		className='flex items-center p-2 hover:bg-gray-700'
		role='button'
		tabIndex={0}
		onKeyDown={(e) => onKeyDown(e, userStatus)}
		onClick={() => onClick(userStatus)}
	>
		<StatusDiv status={userStatus} />
		{displayText}
	</div>
);

StatusChangeButton.propTypes = {
	displayText: PropTypes.string.isRequired,
	userStatus: PropTypes.string.isRequired,
	onKeyDown: PropTypes.func.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default StatusChangeButton;
