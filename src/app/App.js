import React, {useEffect} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import {useDispatch} from 'react-redux'
import {loadQualitiesList} from './store/qualities'
import {loadProfessionsList} from './store/professions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path='/users/:userId?/:edit?' component={Users} />
          <Route path='/login/:type?' component={Login} />
          <Route exact path='/' component={Main} />
          <Route path='/logout' component={LogOut} />
          <Redirect to='/' />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
