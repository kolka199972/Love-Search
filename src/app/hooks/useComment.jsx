import React, {createContext, useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useParams} from 'react-router-dom'
import {useAuth} from './useAuth'
import {nanoid} from 'nanoid'
import commentService from '../services/commentService'
import {toast} from 'react-toastify'

const CommentContext = createContext()

export const useComment = () => {
  return useContext(CommentContext)
}

const CommentProvider = ({children}) => {
  const {userId} = useParams()
  const {currentUser} = useAuth()
  const [comments, setComments] = useState([])
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getComments()
  }, [userId])

  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  const errorCatcher = (error) => {
    const {message} = error.response.data
    setError(message)
  }

  const getComments = async () => {
    try {
      const {content} = await commentService.getComments(userId)
      setComments(content)
    } catch (e) {
      errorCatcher(e)
    } finally {
      setIsLoading(false)
    }
  }

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id
    }
    try {
      const {content} = await commentService.createComment(comment)
      setComments((pS) => [...pS, content])
    } catch (e) {
      errorCatcher(e)
    }
  }

  const removeComment = async (commentId) => {
    try {
      const {content} = await commentService.removeComment(commentId)
      if (content === null) {
        setComments((pS) => pS.filter((c) => c._id !== commentId))
      }
    } catch (e) {
      errorCatcher(e)
    }
  }
  return (
    <CommentContext.Provider
      value={{comments, createComment, getComments, removeComment, isLoading}}
    >
      {children}
    </CommentContext.Provider>
  )
}

CommentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CommentProvider
