import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { useEffect, useState } from 'react';

const useSignalR = (getAccessToken) => {
	const [connection, setConnection] = useState(null);

	useEffect(() => {
		const buildConnection = async () => {
			try {
				const accessToken = await getAccessToken({
					audience: process.env.REACT_APP_AUTH0_AUDIENCE,
				});
				const newConnection = new HubConnectionBuilder()
					.withUrl(process.env.REACT_APP_HUB_URL, {
						accessTokenFactory: () => accessToken,
					})
					.withAutomaticReconnect()
					.build();

				setConnection(newConnection);
			} catch (error) {
				console.log(error);
			}
		};

		buildConnection();
	}, []);

	useEffect(() => {
		const startConnection = () => {
			if (
				connection &&
				connection.state === HubConnectionState.Disconnected
			) {
				connection.start();
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
