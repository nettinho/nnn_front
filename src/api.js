import axios from 'axios'
import { APP_TOKEN } from './constants'

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem(APP_TOKEN)
    if (token != null && !config.url.match(/sign_in/))
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  err => Promise.reject(err)
)

const JSON_OPTS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}
const UPLOAD_OPTS = {
  headers: { 'Content-Type': 'multipart/form-data' }
}

const apiGet = (url, opts) =>
  axios.get(url, opts).then(({ data, headers }) => ({ data, headers }))
const apiDelete = (url, opts) =>
  axios.delete(url, opts).then(({ data, headers }) => ({ data, headers }))
const apiPatch = (url, data, opts) =>
  axios.patch(url, data, opts).then(({ data, headers }) => ({ data, headers }))
const apiPost = (url, data, opts) =>
  axios.post(url, data, opts).then(({ data, headers }) => ({ data, headers }))

export { apiGet, apiDelete, apiPatch, apiPost, JSON_OPTS, UPLOAD_OPTS }
