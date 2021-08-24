import React, { useEffect } from 'react';

const useMessageBox = () => {
	const textInputRef = React.createRef();

	const setFocusOnMessageBox = () => {
		if (textInputRef && textInputRef.current) textInputRef.current.focus();
	};

	useEffect(() => {
		setFocusOnMessageBox();
	}, [textInputRef]);

	return [textInputRef, setFocusOnMessageBox];
};

export default useMessageBox;
