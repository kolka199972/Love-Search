import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/professionService'
import {toast} from 'react-toastify'

const ProfessionContext = createContext()

export const useProfession = () => {
  return useContext(ProfessionContext)
}

const ProfessionProvider = ({children}) => {
  const [professions, setProfessions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getProfessions()
  }, [])

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

  const getProfessionById = (id) => {
    return professions.find((p) => p._id === id)
  }

  const getProfessions = async () => {
    try {
      const {content} = await professionService.get()
      setProfessions(content)
      setIsLoading(false)
    } catch (e) {
      errorCatcher(e)
    }
  }

  return (
    <ProfessionContext.Provider value={{isLoading, getProfessionById}}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default ProfessionProvider
