// routes/message.js
const express = require('express');
const router = express.Router();
const Message = require('../models/msg'); 

function restrictToLoggedInUser(req, res, next) {
   
    if (!req.user) {
        return res.redirect('/login');
    }
    next(); 
}

router.post('/', restrictToLoggedInUser, async (req, res) => {
    const { content } = req.body;

    if (!content || content.trim() === '') {
       return res.redirect('/'); 
    }

    try {
        const newMessage = new Message({
            msg: content.trim(), 
            user: req.user.id 
        });
        await newMessage.save(); 
        return res.redirect('/'); 
     } catch (err) {
        console.error("Error posting message:", err); 
        return res.redirect('/'); 
    }
});

module.exports = router;