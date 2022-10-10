const TOKEN_ID = 'jwt-token'
const REFRESH_TOKEN = 'jwt-refresh-token'
const EXPIRES_TOKEN = 'jwt-expire'

export const setTokens = ({idToken, refreshToken, expiresIn}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_ID, idToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  localStorage.setItem(EXPIRES_TOKEN, expiresDate)
}

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_ID)
}

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN)
}

export const getExpiresToken = () => {
  return localStorage.getItem(EXPIRES_TOKEN)
}

const localStorageService = {
  setTokens
}

export default localStorageService
