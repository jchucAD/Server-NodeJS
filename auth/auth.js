const passport = require('passport')
const Strategy = require('passport-local')
const User = require('../modeles/user.js')

passport.use(
    'signup',
    new Strategy({
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
//export default passport