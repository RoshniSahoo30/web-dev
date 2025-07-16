const express = require('express');
const router = express.Router();
const {userSignup,userLogin} = require('../controller/user');
const user = require('../models/user');

router.post('/', userSignup);
router.post('/login', userLogin);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;