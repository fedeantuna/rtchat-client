import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/chat/Chat';
import LandingPage from './components/home/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { SignalRProvider } from './hooks/useSignalR';

const App = () => (
	<BrowserRouter>
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
	</BrowserRouter>
);

export default App;
