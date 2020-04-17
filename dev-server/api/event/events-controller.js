import User from '../../model/user-model'
import Event from '../../model/event-model'
import moment from 'moment'

export function index(req, res) {
    // find all events
    Event.find({}, (error, events) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ events: events })
    }).populate('create_by', 'username', 'user')

}

export function create(req, res) {
    // create event
    const id = 1
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json()
        }
        const event = new Event(req.body.Event)
        event.create_by = user._id
        event.created_date = moment(event.created_date)

        event.save(error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(201).json()
        })
    })
}

export function update(req, res) {
    // update a event
    const id = 1

    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json()
        }
        if (!user) {
            return res.status(404).json()
        }

        const event = req.body.event
        event.create_by = user._id
        event.created_date = moment(event.created_date)
        Event.findByIdAndUpdate({ _id: event._id }, task, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function remove(req, res) {
    // delete a events
    const id = 1
    Event.findOne({ _id: req.params.id }, (error, event) => {
        if (error) {
            return res.status(500).json()
        }
        if (!event) {
            return res.status(404).json()
        }
        if (event.create_by._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s post' })
        }
        Event.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function show(req, res) {
    // get event by id
    Event.findOne({ _id: req.params.id }, (error, event) => {
        if (error) {
            return res.status(500).json()
        }
        if (!event) {
            return res.status(404).json()
        }
        return res.status(200).json({ event: event })
    })
}