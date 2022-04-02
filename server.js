const express = require('express')
// import express from 'express'
const mongoose = require('mongoose')
const User = require('./modeles/user.js')
const dotenv = require('dotenv')
//initialise les variable depuis .env
dotenv.config()
const app = express()

//const routes = require('./routes/routes.js')

const PORT = process.env.PORT || 30000
const URI = process.env.MONGODB

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//définition des appels des APIs CRUD sur USER
//app.use(routes)

app.post('/adduser', async (req, res) => {
    const newUser = await User.create(req.body)
    res.json({ message: "User ajouté avec succes", user: newUser })
})

app.delete('/deleteuser/:id', async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    res.json({ message: "User supprimé avec succes", userId: req.params.id })
})

app.put('/updateuser/:id', async (req, res) => {
    await User.updateOne({ _id: req.params.id }, req.body)
    res.json({ message: "User modifié avec succes" })
})

app.get('/getusers', async (req, res) => {
    const users = await User.find()
    res.json({ users: users })
})

// démarrage du serveur
app.listen(PORT, async () => {
    //connexion Mongoose
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    console.log('Application ready port 4000.')
})

