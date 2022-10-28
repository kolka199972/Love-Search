import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import TextField from '../../common/form/textField'
import {validator} from '../../../utils/validator'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backHistoryButton'
import {useAuth} from '../../../hooks/useAuth'
import {useSelector} from 'react-redux'
import {getQualities, getQualitiesLoadingStatus} from '../../../store/qualities'
import {
  getProfessions,
  getProfessionsLoadingStatus
} from '../../../store/professions'

const EditUserPage = () => {
  const [data, setData] = useState()
  const professions = useSelector(getProfessions())
  const professionLoading = useSelector(getProfessionsLoadingStatus())
  const professionsList = professions.map((p) => {
    return {
      value: p._id,
      label: p.name
    }
  })
  const qualities = useSelector(getQualities())
  const qualityLoading = useSelector(getQualitiesLoadingStatus())
  const qualitiesList = qualities.map((q) => {
    return {
      value: q._id,
      label: q.name
    }
  })
  const {currentUser, updateUserData} = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState({})
  const history = useHistory()

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Поле "Имя" должно быть заполнено'
      }
    },
    email: {
      isRequired: {
        message: 'Электронная почта должна быть заполнена'
      },
      isEmail: {
        message: 'Электронная почта должна быть валидной'
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  useEffect(() => {
    if (!qualityLoading && !professionLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: currentUser.qualities
          .map((id) => qualities.find((q) => q._id === id))
          .map((q) => ({
            label: q.name,
            value: q._id,
            color: q.color
          }))
      })
    }
  }, [qualityLoading, professionLoading, currentUser])

  useEffect(() => {
    if (data && isLoading) {
      setIsLoading(false)
    }
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    }
    try {
      await updateUserData(newData)
      history.push(`/users/${currentUser._id}`)
    } catch (error) {
      setErrors(error)
    }
  }

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const isValid = Object.keys(errors).length === 0

  return (
    <div className='container mt-5'>
      <BackHistoryButton />
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading ? (
            <form action='' onSubmit={handleSubmit}>
              <TextField
                label='Имя'
                name='name'
                type='text'
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              />

              <TextField
                label='Электронная почта'
                name='email'
                type='text'
                value={data.email}
                error={errors.email}
                onChange={handleChange}
              />

              <SelectField
                options={professionsList}
                value={data.profession}
                onChange={handleChange}
                defaultOption='Choose...'
                label='Выберите свою профессию'
                error={errors.profession}
                name='profession'
              />

              <RadioField
                name='sex'
                value={data.sex}
                label='Выберите ваш пол'
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

              <button
                className='btn btn-primary w-100 mx-auto'
                type='submit'
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditUserPage
