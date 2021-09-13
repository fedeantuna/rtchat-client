import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Bubbles from '../Bubbles';
import './landingPage.css';
import Loading from '../Loading';

const LandingPage = () => {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

	if (isLoading) return <Loading />;
	if (isAuthenticated) return <Redirect to='/chat' />;

	const handleSignInClick = () => {
		loginWithRedirect();
	};

	return (
		<div
			data-testid='landing-page'
			className='flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tr from-red-600 to-purple-700'
		>
			<Bubbles />
			<span className='z-50 flex flex-col items-center justify-center text-white bg-clip-text'>
				<h1 className='flex'>RTChat</h1>
				<p className='flex'>Real Time Chat</p>
			</span>
			<div className='z-50 flex flex-row items-center justify-center mt-4'>
				<button
					type='button'
					className='px-4 py-2 font-bold text-white bg-purple-700 rounded hover:bg-purple-600'
					onClick={handleSignInClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
