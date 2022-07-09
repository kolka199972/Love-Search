import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = userId => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const renderPhrase = number => {
    let classes = 'badge'
    classes += number !== 0 ? ' bg-primary' : ' bg-danger'
    let phrase = ''
    if (number === 0) phrase = 'Никто с тобой не тусанет'
    if (number === 1) phrase = `${number} человек тусанет с тобой сегодня`
    if (number > 1 && number < 5) phrase = `${number} человека тусанут с тобой сегодня`
    if (number >= 5) phrase = `${number} человек тусанут с тобой сегодня`
    
    return (
      <span className={classes}>{phrase}</span>
    )
  }

  return (
    <>
      <h2>
        {renderPhrase(users.length)}
      </h2>
      {users.length > 0 && <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Имя</th>
            <th scope='col'>Качества</th>
            <th scope='col'>Профессия</th>
            <th scope='col'>Встретился, раз</th>
            <th scope='col'>Оценка</th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map(quality => (
                  <span className={'m-1 badge bg-' + quality.color} key={quality._id}>{quality.name}</span>
                ))}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}  /5</td>
                <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>}
    </>
  )
}

export default Users