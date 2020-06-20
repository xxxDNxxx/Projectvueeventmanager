import User from '../../model/user-model'
import Event from '../../model/event-model'
import moment from 'moment'
import Waiter from '../../model/waiter-model'
import * as auth from '../../services/auth-service'
import keyrandom from 'randomstring'

export function index(req, res) {
    // find all events
    Event.find({}, (error, events) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ events: events })
    }).populate('author', 'username', 'users')

}

export function getallAttendee(req, res) {
    Event.find({}, (error, events) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ events: events })
    }).populate('attendees', 'username', 'users')
}

export function create(req, res) {
    // create event
    const id = auth.getUserId(req)
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json()
        }
        const event = new Event(req.body.event)
        event.author = user._id
        event.dueDate = moment(event.dueDate)
        event.eventKey = keyrandom.generate(5)

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
    const id = auth.getUserId(req)

    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json()
        }
        if (!user) {
            return res.status(404).json()
        }

        const event = new Event(req.body.event)
        event.author = user._id
        event.dueDate = moment(event.dueDate)
        Event.findByIdAndUpdate({ _id: event._id }, event, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function remove(req, res) {
    // delete a events
    const id = auth.getUserId(req)
    Event.findOne({ _id: req.params.id }, (error, event) => {
        if (error) {
            return res.status(500).json()
        }
        if (!event) {
            return res.status(404).json()
        }
        if (event.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s event' })
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
    Event.findOne({ _id: req.params.id })
        // .populate('author')
        .populate({
            path: 'attendees',
            model: 'waiters',
            populate: ({ path: 'username', model: 'users' })

        }).exec(function(error, event) {
            if (error) {
                return res.status(500).json()
            }
            if (!event) {
                return res.status(404).json()
            }

            // console.log(event.attendees[0].username.username)
            var array = []
            for (var i = 0; i < event.attendees.length; i++) {
                array.push({
                    id: event.attendees[i]._id,
                    username: event.attendees[i].username.username,
                    type: event.attendees[i].type,
                    verify: event.attendees[i].username.verified
                })
            }
            return res.status(200).json({ users: array, event: event })

        })



}

export function find(req, res) {
    Waiter.find({}).exec(function(error, waiters) {
        if (error) {
            return res.status(500).json()
        }
        console.log(waiters)
        return res.status(200).json({ waiters: waiters })
    })
}