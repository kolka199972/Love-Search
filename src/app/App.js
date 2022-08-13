import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import NavBar from './components/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/users/:userId?' component={Users} />
        <Route path='/login' component={Login} />
        <Route exact path='/' component={Main} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default App
