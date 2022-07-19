import React from 'react'
import BookMark from './bookmark'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'

const User = ({user, onDelete, ...rest}) => {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <Qualitie
            key={quality._id}
            color={quality.color}
            name={quality.name}
          />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td>
        <BookMark status={user.bookmark} id={user._id} {...rest} />
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => onDelete(user._id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default User
