import React from 'react'
import {useParams} from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/editUserPage'
import UsersListPage from '../components/page/userListPage'
import UserPage from '../components/page/userPage'
import QualityProvider from '../hooks/useQuality'
import UserProvider from '../hooks/useUser'

const Users = () => {
  const {userId, edit} = useParams()

  return (
    <>
      {' '}
      <UserProvider>
        <QualityProvider>
          {userId ? edit ? <EditUserPage /> : <UserPage /> : <UsersListPage />}
        </QualityProvider>
      </UserProvider>
    </>
  )
}

export default Users
