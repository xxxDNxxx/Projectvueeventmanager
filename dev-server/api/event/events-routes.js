import express from 'express'
const router = express.Router()

router.post('/event', (req, res) => {
    res.send('post.event - create event')
})

router.get('/event', (req, res) => {
    res.send('get.event - get all event')
})

router.get('/event/:id', (req, res) => {
    res.send('get.event - get event by id')
})

router.put('/event', (req, res) => {
    res.send('put.event - update event')
})

router.delete('/event', (req, res) => {
    res.send('delete.event - delete event')
})

export default router;