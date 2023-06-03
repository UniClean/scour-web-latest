import axios from 'axios'

export const api = axios.create({
    baseURL: "http://165.22.69.89"
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        return config
    }

    return config
})