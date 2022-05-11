const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//initialise les variable depuis .env
dotenv.config()
const app = express()
const middleware = require('./middleware')
const jwt = require('jsonwebtoken')

const strategy = require('passport-local')
const passport = require('passport')
passport.use(
    'signup',
    new strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await User.create({ email, password })
                console.log('User créé auth')
                return done(null, user)
            }
            catch (error) { return done(error) }
        }
    )
)

passport.use(
    'login',
    new strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email, password })
                if (!user) {
                    return done(null, false, { message: 'USer non trouvé.' })
                }
                const validate = await user.isValidPwd(password)
                if (!validate) { return (null, false, { message: 'Mauvais mot de passe' }) }
                return (null, true, { message: 'mot de passe OK' })
            }
            catch (error) { return done(error) }
        }
    )
)
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const PORT = process.env.PORTSERVER || 80
const URI = process.env.MONGODB

const User = require('./modeles/user.js')
const Book = require('./modeles/livre.js')

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Vary", "Origin")
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,UPDATE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next();
})

//définition des appels des APIs CRUD sur USER
//app.use(routes)

app.post('/signup',
    //console.log('req body :', req.body)
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({ message: 'signup ok!', user: user.req })
    }
)

app.post('/adduser', middleware, async (req, res) => {
    //console.log('req body :', req.body)
    const newUser = await User.create(req.body)

    //créé aussi un livre
    const newBook = await Book.create({ titre: "Danse avec les loups", auteur: "Moi", date: "23/21/1967" })
    res.json({ message: "User ajouté avec succes", user: newUser })
})


app.post('/login', async (req, res) => {
    const connectedUser = await User.findOne({ password: req.body.password, email: req.body.email })
    //console.log('connectedUSer', connectedUser)
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
    //tous les users
    const users = await User.find()

    //avec des filtres
    //.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback)
    res.json({ users: users })

})

// démarrage du serveur
app.listen(PORT, async () => {
    //connexion Mongoose
    console.log('Application server port processing... : ', PORT, 'BD :', URI)
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Application server ready port: ', PORT, 'BD :', URI)
})

