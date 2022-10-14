import httpService from './httpService'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (payLoad) => {
    const {data} = await httpService.put(commentEndpoint + payLoad._id, payLoad)
    return data
  },
  getComments: async (pageId) => {
    const {data} = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  removeComment: async (commentId) => {
    const {data} = await httpService.delete(commentEndpoint + commentId)
    return data
  }
}

export default commentService
