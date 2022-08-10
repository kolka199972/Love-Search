import React from 'react'
import {Link, Route} from 'react-router-dom'
import User from './components/user'
import Login from './layouts/login'
import Main from './layouts/main'
import Users from './layouts/users'

function App() {
  return (
    <>
      <ul className='nav'>
        <li className='nav-item'>
          <Link className='nav-link active' aria-current='page' to='/'>
            Main
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/users'>
            Users
          </Link>
        </li>
      </ul>
      <Route exact path='/' component={Main} />
      <Route path='/login' component={Login} />
      <Route exact path='/users' component={Users} />
      <Route path='/users/:userId' component={User} />
    </>
  )
}

export default App
