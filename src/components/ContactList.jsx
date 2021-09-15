import React from 'react';
import PropTypes from 'prop-types';
import Contact from './Contact';
import userProfilePropType from '../propTypeModels/userProfilePropType';

const ContactList = ({ filteredProfiles, handleContactSelect }) => (
	<div data-testid='contact-list' className='max-h-screen overflow-y-auto'>
		{filteredProfiles.map((up) => (
			<Contact
				key={up.userId}
				id={up.userId}
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
