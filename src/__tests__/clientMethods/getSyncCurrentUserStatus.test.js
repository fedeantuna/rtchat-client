import getSyncCurrentUserStatus from '../../clientMethods/getSyncCurrentUserStatus';
import userStatus from '../../enums/userStatus';

describe('getSyncCurrentUserStatus', () => {
	const setStatusMock = jest.fn();

	describe('syncCurrentUserStatus', () => {
		test('calls set status with status when user status is valid', () => {
			// Arrange
			const syncCurrentUserStatus =
				getSyncCurrentUserStatus(setStatusMock);

			const status = userStatus.online;

			// Act
			syncCurrentUserStatus(status);

			// Assert
			expect(setStatusMock).toHaveBeenCalledTimes(1);
			expect(setStatusMock).toHaveBeenCalledWith(status);
		});

		test('does nothing when user status is not valid', () => {
			// Arrange
			const syncCurrentUserStatus =
				getSyncCurrentUserStatus(setStatusMock);

			const status = 'some-invalid-status';

			// Act
			syncCurrentUserStatus(status);

			// Assert
			expect(setStatusMock).toHaveBeenCalledTimes(0);
		});
	});
});
