import { useEffect, useRef } from 'react';

const useFocus = () => {
	const hasFocus = useRef(true);

	const onFocus = () => {
		hasFocus.current = true;
	};

	const onBlur = () => {
		hasFocus.current = false;
	};

	useEffect(() => {
		window.addEventListener('focus', onFocus);
		window.addEventListener('blur', onBlur);
	}, []);

	return hasFocus;
};

export default useFocus;
