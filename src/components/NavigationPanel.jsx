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

	const handleContactSelect = (id) => {
		setFilter('');
		onContactSelect(id);
	};

	const handleContactSelectWithKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (filteredProfiles[0]) {
				handleContactSelect(filteredProfiles[0].userId);
			} else if (isValidEmail(filter)) {
				connection.invoke(serverMethod.startConversation, filter);
				setFilter('');
			} else {
				toast.error(`${filter} is not a valid email.`);
			}
		}
	};

	return (
		<div className='flex flex-col w-1/3 h-screen'>
			<UserBar
				filter={filter}
				setFilter={setFilter}
				onKeyPress={handleContactSelectWithKeyPress}
			/>
			<ContactList
				filteredProfiles={filteredProfiles}
				handleContactSelect={handleContactSelect}
			/>
		</div>
	);
};

NavigationPanel.propTypes = {
	userProfiles: PropTypes.arrayOf(userProfilePropType).isRequired,
	onContactSelect: PropTypes.func.isRequired,
};

export default NavigationPanel;
