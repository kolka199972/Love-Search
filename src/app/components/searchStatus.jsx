import React from 'react'

const SearchStatus = ({length}) => {
  const renderPhrase = number => {
    let classes = 'badge'
    classes += number !== 0 ? ' bg-primary' : ' bg-danger'
    let phrase = ''
    if (number === 0) phrase = 'Никто с тобой не тусанет'
    if (number === 1) phrase = `${number} человек тусанет с тобой сегодня`
    if (number > 1 && number < 5) phrase = `${number} человека тусанут с тобой сегодня`
    if (number >= 5) phrase = `${number} человек тусанут с тобой сегодня`
    
    return (
      <span className={classes}>{phrase}</span>
    )
  }
  return (
    <h2>
      {renderPhrase(length)}
    </h2>
  )
}

export default SearchStatus