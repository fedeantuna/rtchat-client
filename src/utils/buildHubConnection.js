import { HubConnectionBuilder } from '@microsoft/signalr';

const buildHubConnection = (accessToken) => {
	const connection = new HubConnectionBuilder()
		.withUrl(process.env.REACT_APP_HUB_URL, {
			accessTokenFactory: () => accessToken,
		})
		.withAutomaticReconnect()
		.build();

	return connection;
};

export default buildHubConnection;
