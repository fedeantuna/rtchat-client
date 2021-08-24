/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from './Loading';

const ProtectedRoute = ({ component, ...args }) => (
	<Route
		component={withAuthenticationRequired(component, {
			onRedirecting: () => <Loading />,
		})}
		{...args}
	/>
);

ProtectedRoute.propTypes = {
	component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
