import httpService from './httpService'
import {getUserId} from './localStorageService'

const userEndPoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndPoint)
    return data
  },
  create: async (payload) => {
    const {data} = await httpService.put(userEndPoint + payload._id, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(userEndPoint + getUserId())
    return data
  },
  update: async (payload) => {
    const {data} = await httpService.patch(userEndPoint + getUserId(), payload)
    return data
  }
}

export default userService
