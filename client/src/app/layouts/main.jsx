import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
  const {initialize, error, status, progress} = useMockData()

  const handleClick = () => {
    initialize()
  }
  return (
    <div className='container mt-5'>
      <h1>Main page</h1>
      <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className='btn btn-primary' onClick={handleClick}>
        Инициализация
      </button>
    </div>
  )
}

export default Main
