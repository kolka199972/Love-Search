import React from 'react'
import PropTypes from 'prop-types'
import {publishedTime} from '../../../utils/publishedTime'
import {useUser} from '../../../hooks/useUser'
import {useAuth} from '../../../hooks/useAuth'

const Comment = ({_id: id, userId, created_at: created, content, onRemove}) => {
  const {getUserById} = useUser()
  const {currentUser} = useAuth()
  const user = getUserById(userId)

  return (
    <div className='bg-light card-body  mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <img
              src={user.image}
              className='rounded-circle shadow-1-strong me-3'
              alt='avatar'
              width='65'
              height='65'
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                    {user.name}
                    <span className='small'> — {publishedTime(created)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      onClick={() => onRemove(id)}
                      className='btn btn-sm text-primary d-flex align-items-center'
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  )}
                </div>
                <p className='small mb-0'>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  userId: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.string,
  _id: PropTypes.string,
  onRemove: PropTypes.func
}

export default Comment
