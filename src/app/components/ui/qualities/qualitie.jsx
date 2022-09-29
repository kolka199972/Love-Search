import React from 'react'
import PropTypes from 'prop-types'
import {useQuality} from '../../../hooks/useQuality'

const Qualitie = ({id}) => {
  const {getQualityById, isLoading} = useQuality()
  const quality = getQualityById(id)

  return isLoading ? (
    'Loading...'
  ) : (
    <span className={'m-1 badge bg-' + quality.color}>{quality.name}</span>
  )
}

Qualitie.propTypes = {
  id: PropTypes.string
}

export default Qualitie
