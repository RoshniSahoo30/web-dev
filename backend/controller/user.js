const user = require('../models/user');
const { setUser } = require('../service/auth');
const bcrypt = require('bcryptjs');

async function userSignup(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.render('signup', { error: 'All fields are required.' });
    }

    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.render('signup', { error: 'User already exists with this email.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await user.create({ username, email, password: hashedPassword });
        return res.redirect('/login');
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).render('signup', { error: 'Internal Server Error' });
    }
}

async function userLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('login', { error: 'Email and password are required.' });
    }

    try {
        const User = await user.findOne({ email });
        if (!User) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        const token = setUser(User);
        res.cookie("token", token);
        return res.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).render('login', { error: 'Internal Server Error' });
    }
}

module.exports = {
    userSignup,
    userLogin
};
