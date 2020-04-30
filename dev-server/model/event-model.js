import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({
    title: String,
    body: String,
    dueDate: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    eventKey: String
})
eventSchema.set('timestamps', true)

export default mongoose.model('event', eventSchema)