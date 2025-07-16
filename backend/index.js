const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const User = require('./models/user');
const Message = require('./models/msg'); 
const checkForAuth = require('./middleware/auth'); 

const staticRouter = require('./routes/StaticRouter'); 
const userRouter = require('./routes/user');
const messageRouter = require('./routes/msg'); 

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/msgdb')
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuth);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(async (req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.error = req.app.get('flash_error');
    res.locals.success = req.app.get('flash_success');
    req.app.set('flash_error', null);
    req.app.set('flash_success', null);

    res.locals.messages = [];
if (req.user && req.path === '/') {
    try {
       
        res.locals.messages = await Message.find({ user: req.user.id }) 
                                        .sort({ createdAt: -1 }) 
                                        .populate('user', 'username'); 
    } catch (err) {
        console.error("Error fetching messages for home page:", err);
        res.locals.messages = [];
        res.locals.error = res.locals.error || "Failed to load messages.";
    }
}
next();
});

app.use('/', staticRouter);
app.use('/user', userRouter);
 app.use('/msg', messageRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    });