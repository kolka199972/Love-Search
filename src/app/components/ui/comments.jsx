import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import API from '../../api'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'

const Comments = () => {
  const [comments, setComments] = useState([])

  const {userId} = useParams()

  useEffect(() => {
    API.comments
      .fetchCommentsForUser(userId)
      .then((response) => setComments(response))
  }, [])

  const sortedComments = [...comments].sort(
    (a, b) => +b.created_at - +a.created_at
  )

  const handleSubmit = (data) => {
    API.comments
      .add({...data, pageId: userId})
      .then((data) => setComments([...comments, data]))
  }

  const removeComment = (id) => {
    API.comments.remove(id).then((id) => {
      setComments(comments.filter((c) => c._id !== id))
    })
  }

  return (
    <>
      <div className='card mb-2'>
        <AddCommentForm onSubmit={handleSubmit} />
      </div>
      <div className='card mb-3'>
        <div className='card-body '>
          <h2>Comments</h2>
          <hr />
          <CommentsList comments={sortedComments} onRemove={removeComment} />
        </div>
      </div>
    </>
  )
}

export default Comments
