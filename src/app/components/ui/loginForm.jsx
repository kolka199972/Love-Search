import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import {validator} from '../../utils/validator'
import CheckBoxField from '../common/form/checkBoxField'
import TextField from '../common/form/textField'

const LoginForm = () => {
  const history = useHistory()
  const {signIn} = useAuth()
  const [data, setData] = useState({email: '', password: '', stayOn: false})
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

  const handleChange = (target) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      console.log(data)
      await signIn(data)
      history.push('/')
    } catch (e) {
      setErrors(e)
    }
  }

  return (
    <form action='' onSubmit={handleSubmit}>
      <TextField
        label='Електронная почта'
        name='email'
        type='text'
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label='Пароль'
        name='password'
        type='password'
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField name='stayOn' value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button
        className='btn btn-primary w-100 mx-auto'
        type='submit'
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
