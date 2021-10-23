const mongoose = require('./db');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true}
})

const User = mongoose.model('user', userSchema)

module.exports = User