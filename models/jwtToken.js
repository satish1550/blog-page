const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
})
const jwtToken = mongoose.model('token', tokenSchema);
module.exports = jwtToken;