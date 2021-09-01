import React from 'react';

const Loading = () => (
	<div>
		<div className='fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900'>
			<div className='absolute top-0 right-0 bottom-0 left-0 m-auto w-48 h-48 rounded-full border-t-4 border-white animate-spin' />
		</div>
	</div>
);

export default Loading;
