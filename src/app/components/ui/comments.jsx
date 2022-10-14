import React from 'react'
import CommentsList from '../common/comments/commentsList'
import AddCommentForm from '../common/comments/addCommentForm'
import {useComment} from '../../hooks/useComment'

const Comments = () => {
  const {comments, createComment, removeComment} = useComment()

  const sortedComments = [...comments].sort(
    (a, b) => +b.created_at - +a.created_at
  )

  const handleSubmit = (data) => {
    createComment(data)
  }

  const removeCommentById = (id) => {
    removeComment(id)
    // API.comments.remove(id).then((id) => {
    //   setComments(comments.filter((c) => c._id !== id))
    // })
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
          <CommentsList
            comments={sortedComments}
            onRemove={removeCommentById}
          />
        </div>
      </div>
    </>
  )
}

export default Comments
