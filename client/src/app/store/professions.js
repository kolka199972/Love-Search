import {createSlice} from '@reduxjs/toolkit'
import professionService from '../services/professionService'
import {isOutdated} from '../utils/isOutdated'

const professionsSlice = createSlice({
  name: 'professions',
  initialState: {entities: [], isLoading: true, error: null, lastFetch: null},
  reducers: {
    professionsRequested(state) {
      state.isLoading = true
    },
    professionsReceived(state, action) {
      state.entities = action.payload
      state.lastFetch = Date.now()
      state.isLoading = false
    },
    professionsRequestFailed(state, action) {
      state.error = action.payload
    }
  }
})

const {actions, reducer: professionsReducer} = professionsSlice
const {professionsRequested, professionsReceived, professionsRequestFailed} =
  actions

export const loadProfessionsList = () => async (dispatch, getState) => {
  dispatch(professionsRequested())
  const {lastFetch} = getState().professions
  if (isOutdated(lastFetch)) {
    try {
      const {content} = await professionService.get()
      dispatch(professionsReceived(content))
    } catch (error) {
      dispatch(professionsRequestFailed(error.message))
    }
  }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
  state.professions.isLoading
export const getProfessionById = (id) => (state) => {
  if (state.professions.entities) {
    return state.professions.entities.find((p) => p._id === id)
  }
}

export default professionsReducer
