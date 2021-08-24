import React from 'react';

const Loading = () => (
	<div>
		<div className='fixed left-0 top-0 w-screen h-screen bg-gray-900 z-50'>
			<div className='m-auto absolute top-0 left-0 bottom-0 right-0 w-48 h-48 border-t-4 border-white rounded-full animate-spin' />
		</div>
	</div>
);

export default Loading;
