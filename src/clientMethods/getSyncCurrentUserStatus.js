import userStatus from '../enums/userStatus';

const getSyncCurrentUserStatus = (setStatus) => {
	const syncCurrentUserStatus = (status) => {
		if (userStatus[status]) {
			setStatus(status);
		}
	};

	return syncCurrentUserStatus;
};

export default getSyncCurrentUserStatus;
