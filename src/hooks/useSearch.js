import { useEffect, useState } from 'react';

const useSearch = (userProfiles) => {
	const [filteredProfiles, setFilteredProfiles] = useState([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		setFilteredProfiles(userProfiles.slice());
	}, [userProfiles]);

	useEffect(() => {
		setFilteredProfiles(
			userProfiles.filter(
				(up) =>
					!filter ||
					up.email.toUpperCase().includes(filter.toUpperCase())
			)
		);
	}, [filter]);

	return { filter, filteredProfiles, setFilter };
};

export default useSearch;
