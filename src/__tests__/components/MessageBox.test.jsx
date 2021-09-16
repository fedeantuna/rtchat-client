import React, { useEffect, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MessageBox from '../../components/MessageBox';
import useMessageBox from '../../hooks/useMessageBox';

jest.mock('react');
jest.mock('@auth0/auth0-react');
jest.mock('../../hooks/useMessageBox');

describe('<MessageBox />', () => {
	const setButtonEnabilityDependencies = [];
	const setButtonEnability = jest.fn();

	const setMessageContentMock = jest.fn();
	const setSendButtonIsDisabledMock = jest.fn();

	const messageBoxRefMock = {
		current: 'mocked',
	};

	beforeEach(() => {
		useMessageBox.mockReturnValue(messageBoxRefMock);

		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setMessageContentMock,
			])
			.mockImplementationOnce((initialState) => [
				initialState,
				setSendButtonIsDisabledMock,
			]);

		useEffect.mockImplementationOnce((method, dependencies) => {
			setButtonEnability();
			method();
			setButtonEnabilityDependencies.push(...dependencies);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();

		setButtonEnabilityDependencies.splice(0);
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

	test('calls set button enability and depends on message content and enabled', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		const messageContentInitialState = '';

		const expectedDependencies = [messageContentInitialState, enabled];

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(setButtonEnability).toHaveBeenCalledTimes(1);
		expect(setButtonEnabilityDependencies).toEqual(expectedDependencies);
	});

	test('send button is disabled when message content length is 0', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledTimes(1);
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledWith(true);
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is disabled when enabled is false', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = false;

		useState.mockReset();
		useState
			.mockImplementationOnce(() => ['Kenobi...', setMessageContentMock])
			.mockImplementationOnce(() => [true, setSendButtonIsDisabledMock]);

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledTimes(1);
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledWith(true);
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is disabled when message content contains only empty spaces', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		useState.mockReset();
		useState
			.mockImplementationOnce(() => ['     ', setMessageContentMock])
			.mockImplementationOnce(() => [true, setSendButtonIsDisabledMock]);

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledTimes(1);
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledWith(true);
		expect(screen.getByTitle(/send message/i)).toBeInTheDocument();
		expect(screen.getByTitle(/send message/i)).toBeDisabled();
	});

	test('send button is enabled when message content length is not 0 nor white spaces and enabled is true', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		useState.mockReset();
		useState
			.mockImplementationOnce(() => ['Kenobi...', setMessageContentMock])
			.mockImplementationOnce(() => [false, setSendButtonIsDisabledMock]);

		// Act
		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Assert
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledTimes(1);
		expect(setSendButtonIsDisabledMock).toHaveBeenCalledWith(false);
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

	test('input on key down sends trimmed message when key is enter and send button is not disabled', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		const inputText = ' Kenobi... ';
		useState.mockReset();
		useState
			.mockImplementationOnce(() => [inputText, setMessageContentMock])
			.mockImplementationOnce(() => [false, setSendButtonIsDisabledMock]);

		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/write a message.../i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onSend).toHaveBeenCalledTimes(1);
		expect(onSend).toHaveBeenCalledWith(inputText.trim());
		expect(setMessageContentMock).toHaveBeenCalledTimes(1);
		expect(setMessageContentMock).toHaveBeenCalledWith('');
	});

	test('input on key down does nothing when key is enter and send button is disabled', () => {
		// Arrange
		const onSend = jest.fn();
		const enabled = true;

		const inputText = 'Kenobi...';
		useState.mockReset();
		useState
			.mockImplementationOnce(() => [inputText, setMessageContentMock])
			.mockImplementationOnce(() => [true, setSendButtonIsDisabledMock]);

		render(<MessageBox onSend={onSend} enabled={enabled} />);

		// Act
		fireEvent.keyDown(screen.getByPlaceholderText(/write a message.../i), {
			key: 'Enter',
			charCode: 13,
		});

		// Assert
		expect(onSend).toHaveBeenCalledTimes(0);
		expect(setMessageContentMock).toHaveBeenCalledTimes(0);
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
