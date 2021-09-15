import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MessageBox from '../../components/MessageBox';
import useMessageBox from '../../hooks/useMessageBox';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useMessageBox');

describe('<MessageBox />', () => {
	const setMessageContentMock = jest.fn();

	const messageBoxRefMock = {
		current: 'mocked',
	};

	beforeEach(() => {
		useMessageBox.mockReturnValue(messageBoxRefMock);

		useState.mockImplementationOnce((initialState) => [
			initialState,
			setMessageContentMock,
		]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders conversation history', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(screen.getByTestId('message-box')).toBeInTheDocument();
	});

	test('send button is disabled when message content length is 0', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is disabled when enabled is false', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = false;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			'Kenobi...',
			setMessageContentMock,
		]);

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is disabled when message content length is 0 and enabled is false', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = false;

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is enabled when message content length is not 0 and enabled is true', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		useState.mockReset();
		useState.mockImplementationOnce(() => [
			'Kenobi...',
			setMessageContentMock,
		]);

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeEnabled();
	});

	test('input is enabled when enabled is true', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(
			screen.getByPlaceholderText(/write a message.../i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/write a message.../i)
		).toBeEnabled();
	});

	test('input on change updates message content', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		render(<MessageBox onSend={onSend} enabled={enabled} />);

		const inputText = 'Kenobi...';

		// Act
		fireEvent.change(screen.getByPlaceholderText(/write a message.../i), {
			target: { value: inputText },
		});

		// Assert
		expect(setMessageContentMock).toHaveBeenCalledTimes(1);
		expect(setMessageContentMock).toHaveBeenCalledWith(inputText);
	});

	test('input on key down when key is enter sends message', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		const inputText = 'Kenobi...';
		useState.mockReset();
		useState.mockImplementationOnce(() => [
			inputText,
			setMessageContentMock,
		]);

		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/write a message.../i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onSend).toHaveBeenCalledTimes(1);
		expect(onSend).toHaveBeenCalledWith(inputText);
		expect(setMessageContentMock).toHaveBeenCalledTimes(1);
		expect(setMessageContentMock).toHaveBeenCalledWith('');
	});

	test('input on key down when key is not enter does nothing', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/write a message.../i), {
			key: ' ',
			charCode: 32,
		});

		// Assert
		expect(onSend).toHaveBeenCalledTimes(0);
	});
});
