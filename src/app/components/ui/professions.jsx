import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {
  getProfessionById,
  getProfessionsLoadingStatus
} from '../../store/professions'

const Professions = ({id}) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const prof = useSelector(getProfessionById(id))

  if (!isLoading) {
    return <p>{prof.name}</p>
  } else {
    return 'Loading...'
  }
}

Professions.propTypes = {
  id: PropTypes.string
}

export default Professions
