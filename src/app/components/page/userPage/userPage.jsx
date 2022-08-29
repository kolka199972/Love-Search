import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Qualities from '../../ui/qualities'
import API from '../../../api'
import {useHistory, useParams} from 'react-router-dom'

const UserPage = () => {
  const [user, setUser] = useState(null)
  const {userId} = useParams()
  const history = useHistory()
  useEffect(() => {
    API.users.getById(userId).then((response) => setUser(response))
  }, [userId])
  const handleMoveToList = () => {
    history.push('/users')
  }
  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>Completed meetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button onClick={handleMoveToList}>Все пользователи</button>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  )
}

export default UserPage

UserPage.propTypes = {
  user: PropTypes.object
}
