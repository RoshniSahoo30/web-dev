const user=require('../models/user');
const {setUser} = require('../service/auth');
const bcrypt = require('bcryptjs');

async function userSignup(req,res){

    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await user.create({ username, email, password: hashedPassword });
    return res.redirect("/");
}

async function userLogin(req,res){

    const { email, password } = req.body;
    const User=await user.findOne({ email, password });
    if(!User) 
        return res.render('login',{
            error: "Invalid email or password"
        });
    const token = setUser(User);
    res.cookie("token", token);
    return res.redirect("/");
}

module.exports = {userSignup,
    userLogin
};