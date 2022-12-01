export const publishedTime = (created) => {
  const year = new Date(+created).getFullYear()
  const month =
    new Date(+created).getMonth() + 1 < 10
      ? '0' + (new Date(+created).getMonth() + 1)
      : new Date(+created).getMonth() + 1
  const day =
    new Date(+created).getDate() < 10
      ? '0' + new Date(+created).getDate()
      : new Date(+created).getDate()
  const hours =
    new Date(+created).getHours() < 10
      ? '0' + new Date(+created).getHours()
      : new Date(+created).getHours()
  const minutes =
    new Date(+created).getMinutes() < 10
      ? '0' + new Date(+created).getMinutes()
      : new Date(+created).getMinutes()

  const passedTime = new Date() - new Date(+created)
  if (passedTime >= 3.154e10) {
    return `${day}.${month}.${year}`
  } else if (passedTime >= 8.64e7) {
    return `${day}.${month}`
  } else if (passedTime >= 3.6e6) {
    return `${hours}.${minutes}`
  } else if (passedTime >= 300000) {
    return `${Math.floor(passedTime / 60000)} минут назад`
  } else if (passedTime >= 120000) {
    return `${Math.floor(passedTime / 60000)} минуты назад`
  } else if (passedTime >= 60000) {
    return '1 минута назад'
  } else {
    return 'Меньше минуты назад'
  }
}
