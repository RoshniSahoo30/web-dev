const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    date: { 
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    msg: {  
        type: String,
        required: true
    },
},{timestamps: true});
const msg = mongoose.model('Msg', msgSchema);
module.exports = msg;