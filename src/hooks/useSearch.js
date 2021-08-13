import { useEffect, useState } from 'react';

const useSearch = (userProfiles, onContactSelect) => {
	const [filter, setFilter] = useState('');
	const [filteredProfiles, setFilteredProfiles] = useState([]);

	useEffect(() => {
		setFilteredProfiles(userProfiles);
	}, [userProfiles]);

	useEffect(() => {
		setFilteredProfiles(
			userProfiles.filter(
				(up) =>
					!filter ||
					up.profile.name.toUpperCase().includes(filter.toUpperCase())
			)
		);
	}, [filter]);

	const handleContactSelect = (id) => {
		setFilter('');
		onContactSelect(id);
	};

	const handleContactSelectUsingEnter = () => {
		if (filteredProfiles[0]) handleContactSelect(filteredProfiles[0].id);
	};

	return [
		filter,
		filteredProfiles,
		setFilter,
		{ handleContactSelect, handleContactSelectUsingEnter },
	];
};

export default useSearch;
