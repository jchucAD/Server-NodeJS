const mongoose = require("mongoose")

const livreSchema = new mongoose.Schema({
    titre: String,
    auteur: String,
    date: String
})


/*
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Non déclaré",
        required: false,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,

        default: 0,
        validate: value => {
            if (value <= 0) {
                throw new Error('Age incorrect')
            }
        }    }}
        )
*/
module.exports = mongoose.model('Livre', livreSchema)