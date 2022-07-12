import React from 'react'

const Qualitie = ({color, name}) => {
  return (
    <span className={'m-1 badge bg-' + color}>{name}</span>
  )
}

export default Qualitie