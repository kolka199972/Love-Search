import httpService from './httpService'

const userEndPoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndPoint)
    return data
  },
  create: async (payload) => {
    const {data} = await httpService.put(userEndPoint + payload._id, payload)
    return data
  }
}

export default userService
