import {useEffect, useState} from 'react'
import professions from '../mockData/professions.json'
import qualities from '../mockData/qualities.json'
import users from '../mockData//users.json'
import httpService from '../services/httpService'

const useMockData = () => {
  const statusConsts = {
    idle: 'Not started',
    pending: 'In process',
    successed: 'Ready',
    error: 'Error occured'
  }

  const [error, setError] = useState()
  const [status, setStatus] = useState(statusConsts.idle)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const totalCount = professions.length + qualities.length + users.length

  const updateProgress = () => {
    const newProgress = Math.floor((count / totalCount) * 100)
    if (progress < newProgress) {
      setProgress(() => newProgress)
    }

    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending)
    }

    if (newProgress === 100) {
      setStatus(statusConsts.successed)
    }
  }

  useEffect(() => {
    updateProgress()
  }, [count])

  const incrementCount = () => {
    setCount((pS) => pS + 1)
  }

  const initialize = async () => {
    try {
      for (const prof of professions) {
        await httpService.put('profession/' + prof._id, prof)
        incrementCount()
      }
      for (const qual of qualities) {
        await httpService.put('quality/' + qual._id, qual)
        incrementCount()
      }
      for (const usr of users) {
        await httpService.put('user/' + usr._id, usr)
        incrementCount()
      }
    } catch (e) {
      setError(e)
      setStatus(statusConsts.error)
    }
  }

  return {initialize, error, status, progress}
}

export default useMockData
