import {createAction, createSlice} from '@reduxjs/toolkit'
import commentService from '../services/commentService'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested(state) {
      state.isLoading = true
    },
    commentsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated(state, action) {
      if (!Array.isArray(state.entities)) {
        state.entities = []
      }
      state.entities.push(action.payload)
    },
    commentRemoved(state, action) {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const {actions, reducer: commentsReducer} = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemoved
} = actions
const commentCreateRequested = createAction('comments/commentCreateRequested')
const commentCreateFailed = createAction('comments/commentCreateFailed')
const commentRemoveRequested = createAction('comments/commentRemoveRequested')
const commentRemoveFailed = createAction('comments/commentRemoveFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const {content} = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch) => {
  dispatch(commentCreateRequested())
  try {
    const {content} = await commentService.createComment(payload)
    dispatch(commentCreated(content))
  } catch (error) {
    dispatch(commentCreateFailed(error.message))
  }
}

export const removeComment = (commentId) => async (dispatch) => {
  dispatch(commentRemoveRequested())
  try {
    const {content} = await commentService.removeComment(commentId)
    console.log(content)
    if (content === null) {
      dispatch(commentRemoved(commentId))
    }
  } catch (error) {
    dispatch(commentRemoveFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
