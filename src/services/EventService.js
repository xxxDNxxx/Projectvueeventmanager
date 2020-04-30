import { http } from './HttpService'

export function getAllEvents() {
    return http().get('/event')
}

export function getEventById(id) {
    return http().get(`/event/${id}`)
}

export function createEvent(event) {
    return http().post('/event', event)
}

export function deleteEvent(id) {
    return http().delete(`/event/${id}`)
}

export function updateEvent(event) {
    return http().put('/event', event)
}