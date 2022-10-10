import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import RadioField from '../common/form/radioField'
import SelectField from '../common/form/selectField'
import TextField from '../common/form/textField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import {useQuality} from '../../hooks/useQuality'
import {useProfession} from '../../hooks/useProfession'
import {useAuth} from '../../hooks/useAuth'
import {useHistory} from 'react-router-dom'

const RegisterForm = () => {
  const history = useHistory()
  const {signUp} = useAuth()
  const {qualities} = useQuality()
  const qualitiesList = qualities.map((q) => {
    return {
      value: q._id,
      label: q.name
    }
  })
  const {professions} = useProfession()
  const professionsList = professions.map((p) => {
    return {
      value: p._id,
      label: p.name
    }
  })
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    },
    license: {
      isRequired: {
        message: 'Необходимо принять лицензионное соглашение'
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
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    }
    try {
      console.log(newData)
      await signUp(newData)
      history.push('/')
    } catch (error) {
      setErrors(error)
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
      <SelectField
        options={professionsList}
        value={data.profession}
        onChange={handleChange}
        defaultOption='Choose...'
        label='Выберите вашу профессию'
        error={errors.profession}
        name='profession'
      />
      <RadioField
        name='sex'
        value={data.sex}
        label='Ваш пол'
        onChange={handleChange}
        options={[
          {name: 'Male', value: 'male'},
          {name: 'Female', value: 'female'},
          {name: 'Other', value: 'other'}
        ]}
      />
      <MultiSelectField
        options={qualitiesList}
        onChange={handleChange}
        name='qualities'
        label='Выберите ваши качества'
        defaultValue={data.qualities}
      />
      <CheckBoxField
        name='license'
        value={data.license}
        onChange={handleChange}
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение.</a>
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

export default RegisterForm
