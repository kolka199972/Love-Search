import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {toast} from 'react-toastify'
import userService from '../services/userService'
import localStorageService, {setTokens} from '../services/localStorageService'
import {useHistory} from 'react-router-dom'

export const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData()
    } else {
      setLoading(false)
    }
  }, [])

  const errorCatcher = (error) => {
    const {message} = error.response.data
    setError(message)
  }

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const createUser = async (data) => {
    try {
      const {content} = await userService.create(data)
      console.log(content)
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const getUserData = async () => {
    try {
      const {content} = await userService.getCurrentUser()
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async ({email, password, ...rest}) => {
    try {
      const {data} = await httpAuth.post('accounts:signUp', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({
        _id: data.localId,
        rate: randomInt(0, 5),
        completedMeetings: randomInt(0, 200),
        email,
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...rest
      })
    } catch (e) {
      errorCatcher(e)
      const {code, message} = e.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким email уже существует'
          }
          throw errorObject
        }
      }
    }
  }

  const logIn = async ({email, password}) => {
    try {
      const {data} = await httpAuth.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await getUserData()
    } catch (e) {
      errorCatcher(e)
      const {code, message} = e.response.data.error
      if (code === 400) {
        switch (message) {
          case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
            throw new Error('Email или пароль введены некорректно')
          default:
            throw new Error('Слишком много попыток, попробуйте позже')
        }
      }
    }
  }

  const logOut = () => {
    localStorageService.removeAuthData()
    setCurrentUser(null)
    history.push('/')
  }

  const updateUserData = async (data) => {
    try {
      const {content} = await userService.create(data)
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }

  return (
    <AuthContext.Provider
      value={{signUp, logIn, logOut, updateUserData, currentUser}}
    >
      {!loading ? children : 'Loading...'}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
