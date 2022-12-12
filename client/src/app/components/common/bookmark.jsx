import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({status, ...rest}) => {
  let classNameBookMark = 'bi bi-bookmark'
  classNameBookMark += status === true ? '-fill' : ''

  return (
    <button {...rest}>
      <i className={classNameBookMark}></i>
    </button>
  )
}

BookMark.propTypes = {
  status: PropTypes.bool
}

export default BookMark
