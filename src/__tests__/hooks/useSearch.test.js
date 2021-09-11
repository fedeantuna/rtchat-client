import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSearch from '../../hooks/useSearch';

jest.mock('react');

describe('useSearch', () => {
	const updateFilteredProfilesDependencies = [];
	const updateFilteredProfilesWithFilterDependencies = [];
	const updateFilteredProfiles = jest.fn();
	const updateFilteredProfilesWithFilter = jest.fn();

	const setFilteredProfilesMock = jest.fn();
	const setFilterMock = jest.fn();

	beforeEach(() => {
		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setFilteredProfilesMock,
			])
			.mockImplementationOnce((initialState) => [
				initialState,
				setFilterMock,
			]);

		useEffect
			.mockImplementationOnce((method, dependencies) => {
				updateFilteredProfiles();
				method();
				updateFilteredProfilesDependencies.push(...dependencies);
			})
			.mockImplementationOnce((method, dependencies) => {
				updateFilteredProfilesWithFilter();
				method();
				updateFilteredProfilesWithFilterDependencies.push(
					...dependencies
				);
			});
	});

	afterEach(() => {
		jest.clearAllMocks();

		updateFilteredProfilesDependencies.splice(0);
		updateFilteredProfilesWithFilterDependencies.splice(0);
	});

	it('returns an object with filter, filtered profiles and set filter function', () => {
		// Arrange
		const userProfiles = [];
		const expectedOutput = {
			filter: '',
			filteredProfiles: [],
			setFilter: setFilterMock,
		};

		// Act
		const result = useSearch(userProfiles);

		// Assert
		expect(result).toEqual(expectedOutput);
	});

	it('calls useState with initial state for filter and filtered profiles', () => {
		// Arrange
		const userProfiles = [];

		const initialStateFilteredProfiles = [];
		const initialStateFilter = '';

		// Act
		useSearch(userProfiles);

		// Assert
		expect(useState).toHaveBeenCalledTimes(2);
		expect(useState).toHaveBeenNthCalledWith(
			1,
			initialStateFilteredProfiles
		);
		expect(useState).toHaveBeenNthCalledWith(2, initialStateFilter);
	});

	it('updateFilteredProfiles is called with user profiles dependency', () => {
		// Arrange
		const userProfiles = [];

		const dependencies = [userProfiles];

		// Act
		useSearch(userProfiles);

		// Assert
		expect(updateFilteredProfiles).toHaveBeenCalledTimes(1);
		expect(updateFilteredProfilesDependencies).toEqual(dependencies);
	});

	it('updateFilteredProfiles calls setFilteredProfiles with user profiles', () => {
		// Arrange
		const userProfiles = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				lastMessage: {
					id: uuidv4(),
					sender: 'obi-wan-kenobi-user-id',
					content: 'Hello there!',
				},
			},
		];

		// Act
		useSearch(userProfiles);

		// Assert
		expect(setFilteredProfilesMock).toHaveBeenCalledWith([...userProfiles]);
	});

	it('updateFilteredProfilesWithFilter is called with filter dependency', () => {
		// Arrange
		const userProfiles = [];
		const filterInitialState = '';

		const dependencies = [filterInitialState];

		// Act
		useSearch(userProfiles);

		// Assert
		expect(updateFilteredProfilesWithFilter).toHaveBeenCalledTimes(1);
		expect(updateFilteredProfilesWithFilterDependencies).toEqual(
			dependencies
		);
	});

	it('updateFilteredProfilesWithFilter calls set filtered profiles function with filtered user profiles', () => {
		// Arrange
		const userProfiles = [
			{
				userId: 'obi-wan-kenobi-user-id',
				email: 'obiwankenobi@jediorder.rep',
				picture: 'some-picture',
				lastMessage: {
					id: uuidv4(),
					sender: 'obi-wan-kenobi-user-id',
					content: 'Hello there!',
				},
			},
			{
				userId: 'count-dooku-user-id',
				email: 'countdooku@sith.sep',
				picture: 'some-beardy-picture',
				lastMessage: {
					id: uuidv4(),
					sender: 'count-dooku-user-id',
					content: "Don't fail me again...",
				},
			},
		];

		useState.mockReset();
		useState
			.mockImplementationOnce((initialState) => [
				initialState,
				setFilteredProfilesMock,
			])
			.mockImplementationOnce(() => ['obiwan', setFilterMock]);

		// Act
		useSearch(userProfiles);

		// Assert
		expect(setFilteredProfilesMock).toHaveBeenCalledWith([userProfiles[0]]);
	});
});
