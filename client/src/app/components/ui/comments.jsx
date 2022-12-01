import React, {useEffect} from 'react'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import {useDispatch, useSelector} from 'react-redux'
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/comments'
import {useParams} from 'react-router-dom'
import {nanoid} from 'nanoid'
import {getCurrentUserId} from '../../store/users'

const Comments = () => {
  const {userId} = useParams()
  const currentUserId = useSelector(getCurrentUserId())
  const dispatch = useDispatch()
  const comments = useSelector(getComments())
  const isLoading = useSelector(getCommentsLoadingStatus())

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const sortedComments = comments
    ? [...comments].sort((a, b) => +b.created_at - +a.created_at)
    : comments

  const handleSubmit = (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserId
    }
    dispatch(createComment(comment))
  }

  const removeCommentById = (id) => {
    dispatch(removeComment(id))
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
          {!isLoading ? (
            <CommentsList
              comments={sortedComments}
              onRemove={removeCommentById}
            />
          ) : (
            'Loading'
          )}
        </div>
      </div>
    </>
  )
}

export default Comments
