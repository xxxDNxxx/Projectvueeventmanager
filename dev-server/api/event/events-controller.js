export function index(req, res) {
    // find all events
    return res.status(200).json()
}

export function create(req, res) {
    // create event
    return res.status(201).json()
}

export function update(req, res) {
    // update a event
    return res.status(204).json()
}

export function remove(req, res) {
    // delete a events
    return res.status(204).json()
}

export function show(req, res) {
    // get event by id
    return res.status(200).json()
}