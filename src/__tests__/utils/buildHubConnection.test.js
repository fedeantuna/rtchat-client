import { HubConnectionBuilder } from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';
import buildHubConnection from '../../utils/buildHubConnection';

jest.mock('@microsoft/signalr');

describe('buildHubConnection', () => {
	const hubUrl = 'http://localhost/hub/chat';
	const accessTokenFactory = {};

	const withUrlMock = jest.fn();
	const withAutomaticReconnectMock = jest.fn();
	const buildMock = jest.fn();

	const connection = {
		name: 'test-connection',
	};

	beforeEach(() => {
		process.env.REACT_APP_HUB_URL = hubUrl;

		withUrlMock.mockImplementation((url, options) => {
			accessTokenFactory.result = options.accessTokenFactory();
			return {
				withAutomaticReconnect: withAutomaticReconnectMock,
			};
		});

		withAutomaticReconnectMock.mockReturnValue({
			build: buildMock,
		});

		buildMock.mockReturnValue(connection);

		HubConnectionBuilder.prototype.withUrl = withUrlMock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('returns connection', () => {
		// Arrange
		const accessToken = uuidv4();

		// Act
		const result = buildHubConnection(accessToken);

		// Assert
		expect(result).toBe(connection);
	});

	test('calls with url function and access token factory returns token', () => {
		// Arrange
		const accessToken = uuidv4();

		// Act
		buildHubConnection(accessToken);

		// Assert
		expect(withUrlMock).toHaveBeenCalledTimes(1);
		expect(accessTokenFactory.result).toBe(accessToken);
	});

	test('calls with automatic reconnect function', () => {
		// Arrange
		const accessToken = uuidv4();

		// Act
		buildHubConnection(accessToken);

		// Assert
		expect(withAutomaticReconnectMock).toHaveBeenCalledTimes(1);
	});

	test('calls build function', () => {
		// Arrange
		const accessToken = uuidv4();

		// Act
		buildHubConnection(accessToken);

		// Assert
		expect(buildMock).toHaveBeenCalledTimes(1);
	});
});
