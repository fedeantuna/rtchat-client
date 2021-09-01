import React from 'react';
import PropTypes from 'prop-types';
import useSearch from '../hooks/useSearch';
import ContactList from './ContactList';
import UserBar from './UserBar';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const NavigationPanel = ({
	userProfiles,
	onContactSelect,
	initializeConversation,
}) => {
	const { filter, filteredProfiles, setFilter } = useSearch(userProfiles);

	const handleContactSelect = (id) => {
		setFilter('');
		onContactSelect(id);
	};

	const handleContactSelectWithKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (filteredProfiles[0]) {
				handleContactSelect(filteredProfiles[0].userId);
			} else {
				initializeConversation(filter);
				setFilter('');
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
	initializeConversation: PropTypes.func.isRequired,
};

export default NavigationPanel;
