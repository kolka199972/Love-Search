import React from 'react'
import {useParams} from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/editUserPage'
import UsersListPage from '../components/page/userListPage'
import UserPage from '../components/page/userPage'

const Users = () => {
  const {userId, edit} = useParams()

  return (
    <>{userId ? edit ? <EditUserPage /> : <UserPage /> : <UsersListPage />}</>
  )
}

export default Users
