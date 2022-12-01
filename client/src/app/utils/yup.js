import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  fio: yup
    .string()
    .required('ФИО обязательно для заполнения')
    .matches(
      /^([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,}|[А-ЯA-Z][\x27а-яa-z]{1,}-([А-ЯA-Z][\x27а-яa-z]{1,}|(оглы)|(кызы)))\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?$/,
      'Введите корректное ФИО'
    ),
  email: yup
    .string()
    .required('Электронная почта обязательна для заполнения')
    .email('Email введён некорректно'),
  deliveryType: yup.string().required('Выберите вариант доставки'),
  needLiftFloor: yup.string().required('Укажите нужен ли подъём на этаж'),
  agreement: yup.array().test(
    'contains value', // название проверки
    'Согласие на обработку данных обязательно', // текст ошибки
    // функция, которая проверит валидность
    (value) => value.includes('1')
  )
})

// useEffect(() => {
//   validationSchema
//     // На месте вызова validate() в orderForm
//     /**
//      * Устанавливаем параметр { abortEarly: false },
//      * так Yup будет искать все ошибки по всем полям,
//      * иначе он отдаст только одну и остановит проверку
//      */
//     .validate(values, {abortEarly: false})
//     .catch((yupError) => {
//       const {inner} = yupError

//       // Создаём объект с ошибками
//       const errors = Array.isArray(inner)
//         ? inner.reduce((acc, item) => {
//             const {path, errors} = item
//             // Проверяем есть ли ошибка уже в объекте
//             if (!acc.hasOwnProperty(path) && errors.length) {
//               // Если нет, то добавляем первую
//               acc[path] = errors[0]
//             }

//             return acc
//           }, {})
//         : {}

//       setErrors(errors)
//     })
// }, [values])
