import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import TextField from '../../common/form/textField'
import {validator} from '../../../utils/validator'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backHistoryButton'
import {useProfession} from '../../../hooks/useProfession'
import {useQuality} from '../../../hooks/useQuality'
import {useUser} from '../../../hooks/useUser'
import {useAuth} from '../../../hooks/useAuth'

const EditUserPage = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const {professions, isLoading: professionLoading} = useProfession()
  const professionsList = professions.map((p) => {
    return {
      value: p._id,
      label: p.name
    }
  })
  const {qualities, getQualityById, isLoading: qualityLoading} = useQuality()
  const qualitiesList = qualities.map((q) => {
    return {
      value: q._id,
      label: q.name
    }
  })
  const {getUserById} = useUser()
  const {currentUser, updateUserData} = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const {userId} = useParams()
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
    setIsLoading(true)
    if (currentUser._id !== userId) {
      history.push(`/users/${currentUser._id}/edit`)
    }
    if (!qualityLoading && !professionLoading) {
      const user = getUserById(userId)
      const nq = user.qualities.map((q) => getQualityById(q))
      console.log(nq)
      console.log(user)
      setData((prevState) => ({
        ...prevState,
        ...user,
        qualities: user.qualities
          .map((q) => getQualityById(q))
          .map((q) => ({
            label: q.name,
            value: q._id,
            color: q.color
          }))
      }))
    }
  }, [qualityLoading, professionLoading, userId])

  useEffect(() => {
    if (data._id) setIsLoading(false)
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
      history.push(`/users/${userId}`)
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
