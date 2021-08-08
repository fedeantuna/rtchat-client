import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import LandingPage from './components/LandingPage';

const App = () => (
	<Switch>
		<Route path='/chat' component={Chat} />
		<Route path='/' component={LandingPage} />
	</Switch>
);

export default App;
