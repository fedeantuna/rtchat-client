import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useSearch from '../../hooks/useSearch';

jest.mock('react');

describe('useSearch', () => {
	const setFilteredProfilesUserProfilesDeps = [];
	const setFilteredProfilesFilterDeps = [];

	const setFilteredProfilesMock = jest.fn();
	const setFilterMock = jest.fn();

	const setFilteredProfilesUserProfilesMock = jest.fn();
	const setFilteredProfilesFilterMock = jest.fn();

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
			.mockImplementationOnce((func, deps) => {
				setFilteredProfilesUserProfilesMock();
				func();
				setFilteredProfilesUserProfilesDeps.push(...deps);
			})
			.mockImplementationOnce((func, deps) => {
				setFilteredProfilesFilterMock();
				func();
				setFilteredProfilesFilterDeps.push(...deps);
			});
	});

	afterEach(() => {
		jest.clearAllMocks();

		setFilteredProfilesUserProfilesDeps.splice(0);
		setFilteredProfilesFilterDeps.splice(0);
	});

	it('returns an object with filter, filteredProfiles and setFilter method', () => {
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

	it('calls useState with initial state for filter and filteredProfiles', () => {
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

	it('calls useEffect with userProfiles dependency', () => {
		// Arrange
		const userProfiles = [];

		const dependencies = [userProfiles];

		// Act
		useSearch(userProfiles);

		// Assert
		expect(setFilteredProfilesUserProfilesMock).toHaveBeenCalledTimes(1);
		expect(setFilteredProfilesUserProfilesDeps).toEqual(dependencies);
	});

	it('calls setFilteredProfiles with userProfiles', () => {
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

	it('calls useEffect with filter dependency', () => {
		// Arrange
		const userProfiles = [];
		const filterInitialState = '';

		const dependencies = [filterInitialState];

		// Act
		useSearch(userProfiles);

		// Assert
		expect(setFilteredProfilesFilterMock).toHaveBeenCalledTimes(1);
		expect(setFilteredProfilesFilterDeps).toEqual(dependencies);
	});

	it('calls setFilteredProfiles with filtered user profiles', () => {
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
