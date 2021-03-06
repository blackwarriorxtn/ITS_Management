var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8080;

const path = require('path');

app.use(express.static(path.join(__dirname, '/')));

var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);

app.use(morgan('dev'));


app.set('view engine', 'ejs');

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log("Port: " + port);