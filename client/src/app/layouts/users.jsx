import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect, useParams} from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage/editUserPage'
import UsersListPage from '../components/page/userListPage'
import UserPage from '../components/page/userPage'
import UsersLoader from '../components/ui/hoc/usersLoader'
import {getCurrentUserId} from '../store/users'

const Users = () => {
  const {userId, edit} = useParams()
  const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      {' '}
      <UsersLoader>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
            )
          ) : (
            <UserPage />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  )
}

export default Users
