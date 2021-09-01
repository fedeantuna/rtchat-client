import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const ContactList = ({ filteredProfiles, handleContactSelect }) => (
	<div className='overflow-y-auto max-h-screen'>
		{filteredProfiles.map((up) => (
			<Contact
				key={up.userId}
				userProfile={up}
				onSelect={handleContactSelect}
			/>
		))}
	</div>
);

ContactList.propTypes = {
	filteredProfiles: PropTypes.arrayOf(userProfilePropType).isRequired,
	handleContactSelect: PropTypes.func.isRequired,
};

export default ContactList;
