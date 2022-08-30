import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import api from '../../../api'
import TextField from '../../common/form/textField'
import {validator} from '../../../utils/validator'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'

const EditUserPage = () => {
  const [data, setData] = useState()
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState([])
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
    api.users.getById(userId).then((data) =>
      setData({
        name: data.name,
        email: data.email,
        profession: data.profession._id,
        qualities: data.qualities.map((q) => ({
          label: q.name,
          value: q._id,
          color: q.color
        })),
        sex: data.sex
      })
    )
    api.professions.fetchAll().then((data) =>
      setProfessions(
        Object.keys(data).map((professionName) => ({
          label: data[professionName].name,
          value: data[professionName]._id
        }))
      )
    )
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    api.users.update(userId, {
      ...data,
      profession: getProfessionById(data.profession),
      qualities: getQualities(data.qualities)
    })
    history.push(`/users/${userId}`)
  }

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const isValid = Object.keys(errors).length === 0

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return {_id: prof.value, name: prof.label}
      }
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {data ? (
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
                options={professions}
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
                options={qualities}
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
