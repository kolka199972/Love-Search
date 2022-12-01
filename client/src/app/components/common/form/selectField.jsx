import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  defaultOption,
  options,
  onChange,
  name,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.values(options)
      : options

  const getSelectClasses = () => {
    return `form-select ${error ? 'is-invalid' : ''}`
  }

  const handleChange = ({target}) => {
    onChange({
      name: target.name,
      value: target.value
    })
  }

  return (
    <div className='mb-4'>
      <label htmlFor='profession' className='form-label'>
        {label}
      </label>
      <select
        className={getSelectClasses()}
        value={value}
        onChange={handleChange}
        id={name}
        name={name}
        required
      >
        <option disabled value=''>
          {defaultOption}
        </option>
        {optionsArray.length > 0 &&
          optionsArray.map((profession) => (
            <option value={profession.value} key={profession.value}>
              {profession.label}
            </option>
          ))}
      </select>
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

SelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string
}

export default SelectField
