import React from 'react'
import PropTypes from 'prop-types'

const Qualitie = ({color, name}) => {
  return <span className={'m-1 badge bg-' + color}>{name}</span>
}

Qualitie.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string
}

export default Qualitie
