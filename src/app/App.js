import React, {useEffect, useState} from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((response) => setUsers(response))
  })

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return {...user, bookmark: !user.bookmark}
        }
        return user
      })
    )
  }

  return (
    <div>
      {users ? (
        <Users
          users={users}
          onToggleBookMark={handleToggleBookMark}
          onDelete={handleDelete}
        />
      ) : (
        <h1>Загрузка пользователей...</h1>
      )}
    </div>
  )
}

export default App
