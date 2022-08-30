import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({label, value, name, options, onChange}) => {
  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  return (
    <div className='mb-4'>
      <label className='form-label'>{label}</label>
      <div>
        {options.map((option) => (
          <div
            key={option.name + '_' + option.value}
            className='form-check form-check-inline'
          >
            <input
              className='form-check-input'
              type='radio'
              id={option.name + '_' + option.value}
              value={option.value}
              name={name}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label
              className='form-check-label'
              htmlFor={option.name + '_' + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default RadioField
