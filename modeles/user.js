const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
});

module.exports = mongoose.model("User", schema)
//export default