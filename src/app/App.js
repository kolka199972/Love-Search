import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import 'react-toastify/dist/ReactToastify.css'
import ProfessionProvider from './hooks/useProfession'
import QualityProvider from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
              <Route path='/login/:type?' component={Login} />
              <Route exact path='/' component={Main} />
              <Route path='/logout' component={LogOut} />
              <Redirect to='/' />
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
