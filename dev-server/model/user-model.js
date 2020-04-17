import mongoose from 'mongoose'
import { StringUtil } from '../utillities/string-util'

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
})
userSchema.set('timestamps', true)
userSchema.virtual('fullname').get(function() {
    const firstname = StringUtil.capitalize(this.firstname.toLowerCase())
    const lastname = StringUtil.capitalize(this.lastname.toLowerCase())
    return `${firstname} ${lastname}`
})
userSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    this.firstname = this.firstname.toLowerCase()
    this.lastname = this.lastname.toLowerCase()
    next()
})

export default mongoose.model('user', userSchema)