import React from 'react';
import { render, screen } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from '../../components/ContactList';

describe('<ContactList />', () => {
	const handleContactSelectMock = jest.fn();
	const obiWanKenobiUserProfile = {
		userId: uuidv4(),
		email: 'obiwankenobi@jediorder.rep',
		picture: 'some-picture',
		lastMessage: null,
	};
	const countDookuUserProfile = {
		userId: uuidv4(),
		email: 'countdooku@sith.sep',
		picture: 'some-beardy-picture',
		lastMessage: null,
	};
	const userProfiles = [obiWanKenobiUserProfile, countDookuUserProfile];

	test('renders bubbles', () => {
		// Act
		render(
			<ContactList
				filteredProfiles={userProfiles}
				handleContactSelect={handleContactSelectMock}
			/>
		);

		// Assert
		expect(screen.getByTestId('contact-list')).toBeInTheDocument();
		expect(
			screen.getAllByTestId(
				/^contact-\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
			).length
		).toBe(2);
		expect(
			screen.getByTestId(`contact-${obiWanKenobiUserProfile.userId}`)
		).toBeInTheDocument();
		expect(
			screen.getByTestId(`contact-${countDookuUserProfile.userId}`)
		).toBeInTheDocument();
	});
});
