import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import qualityService from '../services/qualityService'

const QualityContext = createContext()

export const useQuality = () => {
  return useContext(QualityContext)
}

const QualityProvider = ({children}) => {
  const [qualities, setQualities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getQualities()
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

  const getQualityById = (id) => {
    return qualities.find((q) => q._id === id)
  }

  const getQualities = async () => {
    try {
      const {content} = await qualityService.get()
      setQualities(content)
    } catch (e) {
      errorCatcher(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <QualityContext.Provider value={{isLoading, getQualityById, qualities}}>
      {children}
    </QualityContext.Provider>
  )
}

QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default QualityProvider
