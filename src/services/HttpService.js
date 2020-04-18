import store from '../store/index'
import axios from 'axios'

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl
    })
}