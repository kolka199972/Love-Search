import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import 'react-toastify/dist/ReactToastify.css'
import ProfessionProvider from './hooks/useProfession'

function App() {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route path='/users/:userId?/:edit?' component={Users} />
          <Route path='/login/:type?' component={Login} />
          <Route exact path='/' component={Main} />
          <Redirect to='/' />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  )
}

export default App
