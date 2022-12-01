import React from 'react'
import PropTypes from 'prop-types'

const Qualitie = ({_id, color, name}) => {
  return (
    <span className={'m-1 badge bg-' + color} key={_id}>
      {name}
    </span>
  )
}

Qualitie.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string
}

export default Qualitie
