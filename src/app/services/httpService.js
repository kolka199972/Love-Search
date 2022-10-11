import axios from 'axios'
import {toast} from 'react-toastify'
import configFile from '../config.json'

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
  (config) => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
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
  put: http.put
}

export default httpService
