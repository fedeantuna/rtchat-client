import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const ContactList = ({ filteredProfiles, handleContactSelect }) =>
	filteredProfiles.map((up) => (
		<Contact key={up.id} userProfile={up} onSelect={handleContactSelect} />
	));

ContactList.propTypes = {
	filteredProfiles: userProfilePropType.isRequired,
	handleContactSelect: PropTypes.func.isRequired,
};

export default ContactList;
