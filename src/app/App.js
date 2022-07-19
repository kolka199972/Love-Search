import React, {useState} from 'react'
import api from './api'
import SearchStatus from './components/searchStatus'
import Users from './components/users'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onToggleBookMark={handleToggleBookMark}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
