const mongoose = require("mongoose")

const livreSchema = new mongoose.Schema({
    titre: String,
    auteur: String,
    date: String
})

module.exports = mongoose.model('Livre', livreSchema)