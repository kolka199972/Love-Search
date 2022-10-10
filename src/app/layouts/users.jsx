import React from 'react'
import {useParams} from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/editUserPage'
import UsersListPage from '../components/page/userListPage'
import UserPage from '../components/page/userPage'
import UserProvider from '../hooks/useUser'

const Users = () => {
  const {userId, edit} = useParams()

  return (
    <>
      {' '}
      <UserProvider>
        {userId ? edit ? <EditUserPage /> : <UserPage /> : <UsersListPage />}
      </UserProvider>
    </>
  )
}

export default Users
