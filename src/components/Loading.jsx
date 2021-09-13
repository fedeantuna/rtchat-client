import React from 'react';

const Loading = () => (
	<div data-testid='loading'>
		<div className='fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900'>
			<div className='absolute top-0 bottom-0 left-0 right-0 w-48 h-48 m-auto border-t-4 border-white rounded-full animate-spin' />
		</div>
	</div>
);

export default Loading;
