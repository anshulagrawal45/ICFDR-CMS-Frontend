import axios from "axios"

export default function HTTP(token) {
    return {
        get: function (route) {
            const headers = {
                'authorization': `Bearer ${token}`
            }
            try {
                return axios.get(`${route}`, { headers })
            }
            catch (err) { }
        },
        post: function (route, data) {
            const headers = {
                'authorization': `Bearer ${token}`
            }
            try {
                return axios.post(`${route}`, data, { headers })
            }
            catch (err) { }
        },
        patch: function (route, data) {
            const headers = {
                'authorization': `Bearer ${token}`
            }
            try {
                return axios.patch(`${route}`, data, { headers })
            }
            catch (err) { }
        },
        delete: function (route) {
            const headers = {
                'authorization': `Bearer ${token}`
            }
            try {
                return axios.delete(`${route}`, { headers })
            }
            catch (err) { }
        }
    }
} 