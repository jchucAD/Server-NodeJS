const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "Non déclaré",
        required: false,
        trim: true,
        lowercase: true
    },
    age: String,
    email: { type: String, lowercase: true },
    password: String,
    phone: String,
    address2: {
        full: String,
        no: String,
        voie: String,
        code: String,
        ville: String
    },
    address: String
    //si je modifie ADDRESS alors qu'il y a des données??
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