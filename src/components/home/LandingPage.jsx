import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Bubbles from '../Bubbles';
import './landingPage.css';

const LandingPage = () => {
	const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

	if (isLoading) return <div>Loading...</div>;
	if (isAuthenticated) return <Redirect to='/chat' />;

	const handleSignInClick = () => {
		loginWithRedirect();
	};

	return (
		<div className='flex flex-col h-screen w-screen items-center justify-center bg-gradient-to-tr from-red-600 to-purple-700'>
			<Bubbles />
			<span className='bg-clip-text text-white flex items-center justify-center flex-col z-50'>
				<h1 className='flex'>RTChat</h1>
				<p className='flex'>Real Time Chat</p>
			</span>
			<div className='flex flex-row items-center justify-center z-50 mt-4'>
				<button
					type='button'
					className='bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded'
					onClick={handleSignInClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
