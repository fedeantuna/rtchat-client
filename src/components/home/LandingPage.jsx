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
		<div className='flex flex-col justify-center items-center w-screen h-screen bg-gradient-to-tr from-red-600 to-purple-700'>
			<Bubbles />
			<span className='flex z-50 flex-col justify-center items-center text-white bg-clip-text'>
				<h1 className='flex'>RTChat</h1>
				<p className='flex'>Real Time Chat</p>
			</span>
			<div className='flex z-50 flex-row justify-center items-center mt-4'>
				<button
					type='button'
					className='py-2 px-4 font-bold text-white bg-purple-700 rounded hover:bg-purple-600'
					onClick={handleSignInClick}
				>
					Sign In
				</button>
			</div>
		</div>
	);
};

export default LandingPage;
