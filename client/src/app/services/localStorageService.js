const TOKEN_ID = 'jwt-token'
const REFRESH_TOKEN = 'jwt-refresh-token'
const EXPIRES_TOKEN = 'jwt-expire'
const USERID_KEY = 'user-local-id'

export const setTokens = ({accessToken, refreshToken, userId, expiresIn}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_ID, accessToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  localStorage.setItem(EXPIRES_TOKEN, expiresDate)
  localStorage.setItem(USERID_KEY, userId)
}

export const removeAuthData = () => {
  localStorage.removeItem(TOKEN_ID)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(EXPIRES_TOKEN)
  localStorage.removeItem(USERID_KEY)
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

export const getUserId = () => {
  return localStorage.getItem(USERID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getExpiresToken,
  getUserId,
  removeAuthData
}

export default localStorageService
