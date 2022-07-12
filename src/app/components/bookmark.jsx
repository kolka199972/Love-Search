import React from 'react'

const BookMark = ({status, id, onToggleBookMark}) => {
  let classNameBookMark = 'bi bi-bookmark'
  classNameBookMark += status === true ? '-fill' : ''
  
  return (
    <button onClick={() => onToggleBookMark(id)}>
      <i className={classNameBookMark}></i>
    </button>
  )
}

export default BookMark