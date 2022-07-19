import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({status, id, onToggleBookMark}) => {
  let classNameBookMark = 'bi bi-bookmark'
  classNameBookMark += status === true ? '-fill' : ''

  return (
    <button onClick={() => onToggleBookMark(id)}>
      <i className={classNameBookMark}></i>
    </button>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}

export default BookMark
