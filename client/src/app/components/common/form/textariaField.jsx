import React from 'react'
import PropTypes from 'prop-types'

const TextariaField = ({label, name, value, onChange, error, ...props}) => {
  const getInputClasses = () => {
    return `form-control ${error ? 'is-invalid' : ''}`
  }

  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <textarea
          className={getInputClasses()}
          value={value}
          onChange={handleChange}
          name={name}
          id={name}
          {...props}
        />
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  )
}

TextariaField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string
}

export default TextariaField
