export const validator = (data, config) => {
  const errors = {}
  function validate(validatorMethod, data, config) {
    let statusValidator
    switch (validatorMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidator = !data
        } else {
          statusValidator = data.trim() === ''
        }
        break
      }

      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidator = !emailRegExp.test(data)
        break
      }

      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g
        statusValidator = !capitalRegExp.test(data)
        break
      }

      case 'isContainDigit': {
        const digitReExp = /\d+/g
        statusValidator = !digitReExp.test(data)
        break
      }

      case 'min': {
        statusValidator = data.length < config.value
        break
      }

      default:
        break
    }
    if (statusValidator) return config.message
  }
  for (const fieldName in data) {
    for (const validatorMethod in config[fieldName]) {
      const error = validate(
        validatorMethod,
        data[fieldName],
        config[fieldName][validatorMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}
