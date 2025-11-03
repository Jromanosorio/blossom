import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL: `${API_URL}/graphql`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const charactersAPI = {
  getAllCharacters: async(filter?: any) => {
    const query = `
      query($filter: Filters) {
        getAllCharacters(filters: $filter) {
          id
          name
          status
          species
          image
          isFavorite
        }
      }
    `
    const variables = { filter }
    const res = await api.post('/', { query, variables })
    if (res.data.errors) throw new Error(res.data.errors[0].message)

    return res.data.data.getAllCharacters
  },
  
  getCharacterById: async(id: number) => {
    const query = `
      query($id: Int!) {
        getCharacterById(id: $id) { 
          id 
          name 
          status 
          species 
          gender 
          origin 
          image 
          isFavorite
          comments {
            user
            comment
          }
        } 
      }
    `
  
    const variables = { id }

    const res = await api.post('/', { query, variables })
    if (res.data.errors) throw new Error(res.data.errors[0].message)

    return res.data.data.getCharacterById
  },

  sendComment: async(characterId: number, user: string, comment: string) => {
    const query = `
      query($characterId: Int!, $user: String!, $comment: String!) {
        createComment(characterId: $characterId, user: $user, comment: $comment) { 
          user
          comment
        } 
      }
    `
    
    const variables = { characterId, user, comment }
    const res = await api.post('/', { query, variables })
    if (res.data.errors) throw new Error(res.data.errors[0].message)

    return res.data.data.createComment
  },

  getFavorites: async(filter?: any) => {
    const query = `
      query($filter: Filters) {
        getFavorites(filters: $filter) {
          id 
          name 
          status 
          species 
          gender 
          origin 
          image
          isFavorite
        }
      }
    `
    const variables = { filter }
    const res = await api.post('/', { query, variables })
    if (res.data.errors) throw new Error(res.data.errors[0].message)

    return res.data.data.getFavorites
  },

  handleFavorite: async(id: number) => {
    const query = `
      query($id: Int!) {
        handleFavorite(id: $id) { 
          id 
          name 
          status 
          species 
          gender 
          origin 
          image 
          isFavorite
        } 
      }
    `
    
    const variables = { id }
    const res = await api.post('/', { query, variables })
    if (res.data.errors) throw new Error(res.data.errors[0].message)

    return res.data.data.handleFavorite
  },
}

export default api