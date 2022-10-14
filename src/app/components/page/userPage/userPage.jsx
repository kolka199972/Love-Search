import React from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import Comments from '../../ui/comments'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import {useUser} from '../../../hooks/useUser'
import CommentProvider from '../../../hooks/useComment'

const UserPage = () => {
  const {userId} = useParams()
  const {getUserById} = useUser()
  const user = getUserById(userId)

  return (
    <div>
      {user ? (
        <div className='container'>
          <div className='row gutters-sm'>
            <div className='col-md-4 mb-3'>
              <UserCard user={user} />
              <QualitiesCard data={user.qualities} />
              <MeetingsCard user={user.completedMeetings} />
            </div>

            <div className='col-md-8'>
              <CommentProvider>
                <Comments />
              </CommentProvider>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  )
}

UserPage.propTypes = {
  user: PropTypes.object
}

export default UserPage
