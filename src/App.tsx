import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom' // для работы с роутерами
import {useAuth} from './hooks/auth.hook'
import {useRoutes} from './routes'
import {Loader} from "./components/Loader";
import {AuthContext} from './context/AuthContext'

function App() {
	const {name, token, login, logout, userId, ready} = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader/>
}
  return (
		//@ts-ignore
    <AuthContext.Provider value={{
			//@ts-ignore
			name, token, login, logout, userId, isAuthenticated
	}}>
			<Router>
					<div className="container">
							{routes}
					</div>
			</Router>
	</AuthContext.Provider>
  );
}

export default App;
