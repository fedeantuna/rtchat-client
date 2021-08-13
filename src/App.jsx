import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/chat/Chat';
import LandingPage from './components/home/LandingPage';

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/chat' component={Chat} />
			<Route path='/' component={LandingPage} />
		</Switch>
	</BrowserRouter>
);

export default App;
