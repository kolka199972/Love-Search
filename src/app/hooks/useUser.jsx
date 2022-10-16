import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import userService from '../services/userService'
import {toast} from 'react-toastify'
import {useAuth} from './useAuth'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({children}) => {
  const [users, setUsers] = useState([])
  const {currentUser} = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const newUsers = [...users]
      const indexUser = newUsers.findIndex((u) => u._id === currentUser._id)
      newUsers[indexUser] = currentUser
      setUsers(newUsers)
    }
  }, [currentUser])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const errorCatcher = (error) => {
    const {message} = error.response.data
    setError(message)
  }

  const getUsers = async () => {
    try {
      const {content} = await userService.get()
      setUsers(content)
      setIsLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const getUserById = (userId) => {
    return users.find((u) => u._id === userId)
  }

  return (
    <UserContext.Provider value={{users, getUserById}}>
      {isLoading ? 'Loading...' : children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
