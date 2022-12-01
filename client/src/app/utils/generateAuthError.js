export const generateAuthError = (message) => {
  switch (message) {
    case 'INVALID_PASSWORD' || 'EMAIL_NOT_FOUND':
      return 'Email или пароль введены некорректно'

    case 'EMAIL_EXISTS':
      return 'Пользователь с таким email уже существует'

    default:
      return 'Слишком много попыток, попробуйте позже'
  }
}
