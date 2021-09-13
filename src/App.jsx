import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './components/chat/Chat';
import LandingPage from './components/home/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignalRProvider from './components/SignalRProvider';

const App = () => (
	<Switch>
		<ProtectedRoute
			path='/chat'
			component={() => (
				<SignalRProvider>
					<Chat />
				</SignalRProvider>
			)}
		/>
		<Route path='/' component={LandingPage} />
	</Switch>
);

export default App;
