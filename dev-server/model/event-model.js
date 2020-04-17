import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    created_date: { type: Date, default: Date.now },
    create_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})
eventSchema.set('timestamps', true)

export default mongoose.model('event', eventSchema)