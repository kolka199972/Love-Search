import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'

const LoginForm = () => {
  const [data, setData] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({})

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта должна быть заполнена'
      },
      isEmail: {
        message: 'Электронная почта должна быть валидной'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль должен быть заполнен'
      },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }

  const handleChange = ({target}) => {
    setData((prevState) => {
      return {...prevState, [target.name]: target.value}
    })
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='mb-4'>Login</h3>
          <form action='' onSubmit={handleSubmit}>
            <TextField
              label='Електронная почта'
              name='email'
              type='text'
              value={data.email}
              handleChange={handleChange}
              error={errors.email}
            />
            <TextField
              label='Пароль'
              name='password'
              type='password'
              value={data.password}
              handleChange={handleChange}
              error={errors.password}
            />
            <button
              className='btn btn-primary w-100 mx-auto'
              type='submit'
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
