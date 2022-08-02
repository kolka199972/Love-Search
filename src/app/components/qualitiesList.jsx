import React from 'react'
import Qualitie from './qualitie'
import PropTypes from 'prop-types'

const QualitiesList = ({qualities}) => {
  return (
    <>
      {qualities.map((quality) => (
        <Qualitie key={quality._id} color={quality.color} name={quality.name} />
      ))}
    </>
  )
}

QualitiesList.propTypes = {
  qualities: PropTypes.array
}

export default QualitiesList
