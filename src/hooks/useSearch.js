import { useEffect, useState } from 'react';

const useSearch = (userProfiles) => {
	const [filteredProfiles, setFilteredProfiles] = useState([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		const updateFilteredProfiles = () => {
			setFilteredProfiles(userProfiles);
		};

		updateFilteredProfiles();
	}, [userProfiles]);

	useEffect(() => {
		const updateFilteredProfilesWithFilter = () => {
			setFilteredProfiles(
				userProfiles.filter(
					(up) =>
						!filter ||
						up.email.toUpperCase().includes(filter.toUpperCase())
				)
			);
		};

		updateFilteredProfilesWithFilter();
	}, [filter]);

	return { filter, filteredProfiles, setFilter };
};

export default useSearch;
