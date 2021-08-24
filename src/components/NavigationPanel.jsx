import React from 'react';
import PropTypes from 'prop-types';
import useSearch from '../hooks/useSearch';
import ContactList from './ContactList';
import UserBar from './UserBar';

const NavigationPanel = ({ userProfiles, onContactSelect }) => {
	const { filter, filteredProfiles, setFilter } = useSearch(userProfiles);

	const handleContactSelect = (id) => {
		setFilter('');
		onContactSelect(id);
	};

	const handleContactSelectWithKeyPress = (e) => {
		if (e.key === 'Enter') {
			if (filteredProfiles[0]) {
				handleContactSelect(filteredProfiles[0].id);
			}
		}
	};

	return (
		<div className='w-72'>
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
	userProfiles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			profile: PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
			}).isRequired,
			lastMessage: PropTypes.shape({
				id: PropTypes.string.isRequired,
				sender: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
			}),
		})
	).isRequired,
	onContactSelect: PropTypes.func.isRequired,
};

export default NavigationPanel;
