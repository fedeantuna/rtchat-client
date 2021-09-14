import React from 'react';
import PropTypes from 'prop-types';
import UserProfileButton from './UserProfileButton';
import SearchBox from './SearchBox';

const UserBar = ({ filter, setFilter, onKeyDown }) => (
	<div
		data-testid='user-bar'
		className='relative flex items-center pt-2 mb-2 text-white'
	>
		<UserProfileButton />
		<SearchBox
			filter={filter}
			setFilter={setFilter}
			onKeyDown={onKeyDown}
		/>
	</div>
);

UserBar.propTypes = {
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
};

export default UserBar;
