import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import SearchBar from './SearchBar';
import useSearch from '../hooks/useSearch';

const ContactList = ({ userProfiles, onContactSelect, profileImage }) => {
	const [filter, filteredProfiles, setFilter, handlers] = useSearch(
		userProfiles,
		onContactSelect
	);

	return (
		<div className='w-72'>
			<SearchBar
				onEnter={handlers.handleContactSelectUsingEnter}
				filter={filter}
				setFilter={setFilter}
				profileImage={profileImage}
			/>
			{filteredProfiles.map((up) => (
				<Contact
					key={up.profile.id}
					userId={up.id}
					profile={up.profile}
					lastMessage={up.lastMessage}
					onSelect={handlers.handleContactSelect}
				/>
			))}
		</div>
	);
};

ContactList.propTypes = {
	userProfiles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			profile: PropTypes.shape({
				name: PropTypes.string.isRequired,
				image: PropTypes.string.isRequired,
			}).isRequired,
			lastMessage: PropTypes.shape({
				id: PropTypes.string.isRequired,
				sender: PropTypes.string.isRequired,
				content: PropTypes.string.isRequired,
			}),
		})
	).isRequired,
	onContactSelect: PropTypes.func.isRequired,
	profileImage: PropTypes.string.isRequired,
};

export default ContactList;
