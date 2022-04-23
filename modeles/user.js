const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: String,
    age: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    address2: String
})

userSchema.pre('save', async function (next) {
    const user = this
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})

userSchema.methods.isValidPwd = async function (password) {
    const user = this
    const isSame = await bcrypt.compare(password, user.password)
    return isSame
}

module.exports = mongoose.model('User', userSchema)