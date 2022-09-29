import React from 'react'
import PropTypes from 'prop-types'
import {useProfession} from '../../hooks/useProfession'

const Professions = ({id}) => {
  const {getProfessionById, isLoading} = useProfession()

  const prof = getProfessionById(id)

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
