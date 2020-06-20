import { http } from './HttpService'

export function getAllUser() {
    return http().get('/getalluser')
}

export function deleteUser(id) {
    return http().delete(`/user/${id}`)
}