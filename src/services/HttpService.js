import store from '../store/index'
import axios from 'axios'
import * as auth from './AuthService'

export function http() {
    return axios.create({
        baseURL: store.state.apiUrl,
        headers: {
            Authorization: auth.getToken()
        }
    })
}