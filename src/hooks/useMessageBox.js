import React, { useEffect } from 'react';

const useMessageBox = () => {
	const messageBoxRef = React.createRef();

	const setFocusOnMessageBox = () => {
		if (messageBoxRef && messageBoxRef.current)
			messageBoxRef.current.focus();
	};

	useEffect(() => {
		setFocusOnMessageBox();
	}, [messageBoxRef]);

	return { messageBoxRef };
};

export default useMessageBox;
