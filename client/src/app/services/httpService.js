import axios from 'axios'
import {toast} from 'react-toastify'
import configFile from '../config.json'
import authService from './authService'
import localStorageService, {setTokens} from './localStorageService'

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((v) => {
        return {...data[v]}
      })
    : data
}

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  async (config) => {
    const refreshToken = localStorageService.getRefreshToken()
    const expiresDate = localStorageService.getExpiresToken()
    const isExpired = refreshToken && expiresDate < Date.now()
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      if (isExpired) {
        const data = await authService.refresh()
        setTokens({
          idToken: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.params = {...config.params, auth: accessToken}
      }
    } else {
      if (isExpired) {
        const data = await authService.refresh()
        setTokens(data)
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`
        }
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = {content: transformData(res.data)}
    }
    res.data = {content: res.data}
    return res
  },
  (err) => {
    const expectedError =
      err.response && err.response.status >= 400 && err.response.status < 500
    if (!expectedError) {
      console.log(err)
      toast.error('Something was wrong. Try it later')
    }
    return Promise.reject(err)
  }
)

const httpService = {
  get: http.get,
  delete: http.delete,
  post: http.post,
  put: http.put,
  patch: http.patch
}

export default httpService
