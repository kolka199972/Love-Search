import React from 'react'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'
import {useQuality} from '../../../hooks/useQuality'

const QualitiesList = ({qualities}) => {
  const {isLoading} = useQuality()
  return (
    <>
      {isLoading
        ? 'Loading...'
        : qualities.map((quality) => <Qualitie key={quality} id={quality} />)}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
