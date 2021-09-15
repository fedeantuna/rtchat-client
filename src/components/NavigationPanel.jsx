import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import useSearch from '../hooks/useSearch';
import ContactList from './ContactList';
import UserBar from './UserBar';
import userProfilePropType from '../propTypeModels/userProfilePropType';
import useSignalR from '../hooks/useSignalR';
import serverMethod from '../enums/serverMethod';
import isValidEmail from '../utils/isValidEmail';

const NavigationPanel = ({ userProfiles, onContactSelect }) => {
	const { connection } = useSignalR();
	const { filter, filteredProfiles, setFilter } = useSearch(userProfiles);

	const selectContact = (id) => {
		onContactSelect(id);
		setFilter('');
	};

	const findContact = () => {
		connection.invoke(serverMethod.startConversation, filter);
		setFilter('');
	};

	const displayErrorMessage = () => {
		toast.error(`${filter} is not a valid email.`);
		setFilter('');
	};

	const selectContactWithKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (filteredProfiles[0]) {
				selectContact(filteredProfiles[0].userId);
			} else if (isValidEmail(filter)) {
				findContact();
			} else {
				displayErrorMessage();
			}
		}
	};

	return (
		<div
			data-testid='navigation-panel'
			className='flex flex-col w-1/3 h-screen'
		>
			<UserBar
				filter={filter}
				setFilter={setFilter}
				onKeyDown={selectContactWithKeyPress}
			/>
			<ContactList
				filteredProfiles={filteredProfiles}
				handleContactSelect={selectContact}
			/>
		</div>
	);
};

NavigationPanel.propTypes = {
	userProfiles: PropTypes.arrayOf(userProfilePropType).isRequired,
	onContactSelect: PropTypes.func.isRequired,
};

export default NavigationPanel;
