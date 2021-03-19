import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage/AuthPage'
import { Game21 } from './pages/Game_21/Game21'
import { HomePage } from './pages/HomePage/HomePage'

export const useRoutes = (isAuthenticated: any) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <HomePage />
        </Route>
        <Route path="/:roomId" component={Game21}></Route>
        <Redirect to="/create" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
