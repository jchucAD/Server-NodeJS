const User = require('../modeles/user.js')

//définition des APIs CRUD sur USER
//
/*
module.exports = addUser = async (req, res) => {
    const newUser = await User.create(req.body)
    res.json({ message: "User ajouté avec succes", user: newUser })
}

module.exports = deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    res.json({ message: "User supprimé avec succes", userId: req.params.id })
}

module.exports = updateUser = async (req, res) => {
    await User.updateOne({ _id: req.params.id }, req.body)
    res.json({ message: "User modifié avec succes" })
}

module.exports = getUsers = async (req, res) => {
    const users = await User.find()
    res.json({ users: users })
}
*/