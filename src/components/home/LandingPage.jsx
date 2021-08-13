import React from 'react';
import Bubbles from '../Bubbles';
import './landingPage.css';

const LandingPage = () => (
	<div className='flex flex-col h-screen w-screen items-center justify-center bg-gradient-to-tr from-red-600 to-purple-700'>
		<Bubbles />
		<span className='bg-clip-text text-white flex items-center justify-center flex-col z-50'>
			<h1 className='flex'>RTChat</h1>
			<p className='flex'>Real Time Chat</p>
		</span>
		<div className='flex flex-row items-center justify-center z-50 mt-4'>
			<button
				type='button'
				className='bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-l'
			>
				Sign In
			</button>
			<button
				type='button'
				className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-r'
			>
				Sign Up
			</button>
		</div>
	</div>
);

export default LandingPage;
