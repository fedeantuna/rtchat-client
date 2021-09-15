import React from 'react';
import userStatus from '../enums/userStatus';

const StatusDiv = ({ status }) => {
	const getStatusDiv = () => {
		switch (status) {
			case userStatus.online:
				return (
					<div
						data-testid='status-div-online'
						className='w-3 h-3 mr-2 bg-green-600 rounded-full'
					/>
				);
			case userStatus.away:
				return (
					<div
						data-testid='status-div-away'
						className='w-3 h-3 mr-2 bg-yellow-300 rounded-full'
					/>
				);
			case userStatus.busy:
				return (
					<div
						data-testid='status-div-busy'
						className='w-3 h-3 mr-2 bg-red-500 rounded-full'
					/>
				);
			case userStatus.offline:
				return (
					<div
						data-testid='status-div-offline'
						className='w-3 h-3 mr-2 bg-gray-500 rounded-full'
					/>
				);
			default:
				return <div data-testid='status-div-hidden' />;
		}
	};

	return getStatusDiv();
};

export default StatusDiv;
