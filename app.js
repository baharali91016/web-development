//mongodb+srv://admin:<db_password>@cluster-web.4vx7jg0.mongodb.net/?appName=Cluster-web
//mongodb+srv://admin:admin@cluster-web.4vx7jg0.mongodb.net/?appName=Cluster-web


require('dotenv').config(); 
//require('dotenv').config({ quiet: true }); // Use this if you want to suppress warnings about missing .env file
                                           // ◇ injected env (1) from .env // tip: ⌘ suppress logs { quiet: true }
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ... (other existing requires) ...
// --- MongoDB connection ---

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');
var app = express();

var cors = require('cors');
app.use(cors()); // allow all origins (we will tighten this in LU5)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/tasks', tasksRouter);

module.exports = app;
