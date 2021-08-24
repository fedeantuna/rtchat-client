import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';

const ContactList = ({ filteredProfiles, handleContactSelect }) =>
	filteredProfiles.map((up) => (
		<Contact
			key={up.profile.id}
			userId={up.id}
			profile={up.profile}
			lastMessage={up.lastMessage}
			onSelect={handleContactSelect}
		/>
	));

ContactList.propTypes = {
	filteredProfiles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			profile: PropTypes.shape({
				id: PropTypes.string.isRequired,
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
	handleContactSelect: PropTypes.func.isRequired,
};

export default ContactList;
