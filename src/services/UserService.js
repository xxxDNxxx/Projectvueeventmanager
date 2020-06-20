import { http } from './HttpService'

export function getAllUser() {
    return http().get('/user')
}

export function deleteUser(id) {
    return http().delete(`/user/${id}`)
}