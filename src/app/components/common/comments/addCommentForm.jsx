import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import TextariaField from '../form/textariaField'
import {validator} from '../../../utils/validator'

const AddCommentForm = ({onSubmit}) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})

  const validatorConfig = {
    content: {
      isRequired: {
        message: 'Сообщение должно быть заполнено'
      },
      min: {
        message: 'Сообщение долно состоять минимум из 10 символов',
        value: 10
      }
    }
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

  const handleChange = (target) => {
    setData((prevState) => {
      return {...prevState, [target.name]: target.value}
    })
  }

  const clearForm = () => {
    setData({})
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  return (
    <div className='card-body'>
      <div>
        <h2>New comment</h2>
        <form onSubmit={handleSubmit}>
          <TextariaField
            rows='3'
            label='Сообщение'
            name='content'
            value={data.content || ''}
            onChange={handleChange}
            error={errors.content}
          />
          <div className='d-flex justify-content-end'>
            <button className='btn btn-primary' disabled={!isValid}>
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
}

export default AddCommentForm
