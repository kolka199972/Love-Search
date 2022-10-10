import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {toast} from 'react-toastify'
import userService from '../services/userService'
import {setTokens} from '../services/localStorageService'

const httpAuth = axios.create()

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [error, setError] = useState(null)

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

  const createUser = async (data) => {
    try {
      const {content} = await userService.create(data)
      setCurrentUser(content)
    } catch (e) {
      errorCatcher(e)
    }
  }

  const signUp = async ({email, password, ...rest}) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const {data} = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
      await createUser({_id: data.localId, email, ...rest})
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
      throw new Error()
    }
  }

  const signIn = async ({email, password}) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const {data} = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setTokens(data)
    } catch (e) {
      errorCatcher(e)
      const {code, message} = e.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObject = {
            password: 'Некорректный пароль'
          }
          throw errorObject
        }
        if (message === 'EMAIL_NOT_FOUND') {
          const errorObject = {
            email: 'Пользователь с таким email не найден'
          }
          throw errorObject
        }
      }
      throw new Error()
    }
  }

  return (
    <AuthContext.Provider value={{signUp, signIn, currentUser}}>
      {children}
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
