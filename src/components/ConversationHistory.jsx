import React from 'react';

const ConversationHistory = ({ messages }) => (
	<div className='overflow-y-scroll flex-1'>
		<div className='flex overscroll-auto flex-col mt-2'>
			{messages &&
				messages.map((m) => (
					<div key={m.id} id={m.id}>
						{(m.sender === 'self' && (
							<div className='flex flex-col items-end'>
								<div className='p-2 mr-2 mb-2 max-w-xs bg-blue-600 rounded-t-lg rounded-bl-lg'>
									<p className='break-words'>{m.content}</p>
								</div>
							</div>
						)) || (
							<div className='flex flex-col items-start'>
								<div className='p-2 mb-2 ml-2 max-w-xs bg-blue-900 rounded-t-lg rounded-br-lg'>
									<p className='break-words'>{m.content}</p>
								</div>
							</div>
						)}
					</div>
				))}
		</div>
	</div>
);

export default ConversationHistory;
