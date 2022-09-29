import axios from 'axios'
import {toast} from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndPoint

axios.interceptors.request.use(
  (res) => res,
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
  get: axios.get,
  delete: axios.delete,
  post: axios.post,
  put: axios.put
}

export default httpService
