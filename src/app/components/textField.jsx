import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({label, name, type, value, handleChange, error}) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

  const getInputClasses = () => {
    return `form-control ${error ? 'is-invalid' : ''}`
  }

  return (
    <div className='mb-4'>
      <label htmlFor={name}>{label}</label>
      <div className='input-group has-validation'>
        <input
          className={getInputClasses()}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={handleChange}
          name={name}
          id={name}
        />
        {type === 'password' && (
          <button
            type='button'
            className='btn btn-outline-secondary'
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )}
        {error && <div className='invalid-feedback'>{error}</div>}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
