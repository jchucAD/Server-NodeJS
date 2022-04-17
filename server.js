const express = require('express')
// import express from 'express'
const mongoose = require('mongoose')
const User = require('./modeles/user.js')
const dotenv = require('dotenv')
//initialise les variable depuis .env
dotenv.config()
const app = express()
const middleware = require('./middleware')
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const PORT = process.env.PORT || 30000
const URI = process.env.MONGODB

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})


//définition des appels des APIs CRUD sur USER
//app.use(routes)

app.post('/adduser', async (req, res) => {
    //console.log('req body :', req.body)
    const newUser = await User.create(req.body)
    res.json({ message: "User ajouté avec succes", user: newUser })
})

app.post('/login', async (req, res) => {
    const connectedUser = await User.findOne({
        password: req.body.password, email: req.body.email
    })
    if (connectedUser) {
        const token = jwt.sign({ userId: connectedUser._id }, process.env.JWTPRIVATEKEY, { expiresIn: '24h' })
        res.status(200).json({ user: connectedUser, token })
    } else {
        res.status(401).json({ message: "Utilisateur n'existe pas." })
    }
})

app.delete('/deleteuser/:id', middleware, async (req, res) => {
    try {
        const delUser = await User.deleteOne({ _id: req.params.id })
        res.json({ message: "User supprimé avec succes", userId: req.params.id })
    } catch (error) {
        res.json({ message: "Erreur : user non trouvé", userId: req.params.id })
    }
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
    console.log('Application server ready port 4000.')
})

