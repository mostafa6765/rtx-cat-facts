import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI,
  headers: {
    Authorization: 'Bearer rtxbearertoken',
  },
})

export {
  http,
}
