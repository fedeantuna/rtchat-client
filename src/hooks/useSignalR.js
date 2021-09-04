/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { topRightNotification } from '../models/toastNotificationConfiguration';

const SignalRContext = React.createContext(null);

const SignalRProvider = ({ children }) => {
	const { getAccessTokenSilently } = useAuth0();
	const [connection, setConnection] = useState(null);

	useEffect(() => {
		const buildConnection = async () => {
			if (!connection) {
				try {
					const accessToken = await getAccessTokenSilently({
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
			}
		};

		buildConnection();
	}, [getAccessTokenSilently]);

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

	return (
		<SignalRContext.Provider value={{ connection }}>
			{children}
		</SignalRContext.Provider>
	);
};

SignalRProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

const useSignalR = () => React.useContext(SignalRContext);

export { SignalRProvider, useSignalR };
