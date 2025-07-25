const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true});

const user = mongoose.model('User', userSchema);
module.exports = user;
