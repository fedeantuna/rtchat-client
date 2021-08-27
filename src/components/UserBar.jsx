import React from 'react';
import PropTypes from 'prop-types';
import UserProfileButton from './UserProfileButton';
import SearchBox from './SearchBox';

const UserBar = ({ filter, setFilter, onKeyPress }) => (
	<div className='pt-2 relative flex items-center mb-2 text-white'>
		<UserProfileButton />
		<SearchBox
			filter={filter}
			setFilter={setFilter}
			onKeyPress={onKeyPress}
		/>
	</div>
);

UserBar.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
	onKeyPress: PropTypes.func.isRequired,
};

export default UserBar;
