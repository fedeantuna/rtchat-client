import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { topRightNotification } from '../models/toastNotificationConfiguration';

const useSignalR = (getAccessToken) => {
	const [connection, setConnection] = useState(null);

	useEffect(() => {
		const buildConnection = async () => {
			try {
				const accessToken = await getAccessToken({
					audience: process.env.REACT_APP_CHAT_AUDIENCE,
				});
				const newConnection = new HubConnectionBuilder()
					.withUrl(process.env.REACT_APP_HUB_URL, {
						accessTokenFactory: () => accessToken,
					})
					.withAutomaticReconnect()
					.build();

				setConnection(newConnection);
			} catch (error) {
				toast.error(
					'Failed to create connection with server. Refresh the page.',
					topRightNotification
				);
			}
		};

		buildConnection();
	}, []);

	useEffect(() => {
		const startConnection = async () => {
			if (
				connection &&
				connection.state === HubConnectionState.Disconnected
			) {
				try {
					await connection.start();
				} catch (error) {
					toast.error(
						'Failed to start connection with server. Refresh the page.',
						topRightNotification
					);
				}
			}
		};
		const stopConnection = () => {
			if (
				connection &&
				connection.state !== HubConnectionState.Disconnected
			) {
				connection.stop();
			}
		};

		startConnection();

		return stopConnection;
	}, [connection]);

	return { connection };
};

export default useSignalR;
