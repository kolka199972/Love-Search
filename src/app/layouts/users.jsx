import React from 'react'
import {Redirect, useParams} from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/editUserPage'
import UsersListPage from '../components/page/userListPage'
import UserPage from '../components/page/userPage'
import {useAuth} from '../hooks/useAuth'
import UserProvider from '../hooks/useUser'

const Users = () => {
  const {userId, edit} = useParams()
  const {currentUser} = useAuth()

  return (
    <>
      {' '}
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  )
}

export default Users
