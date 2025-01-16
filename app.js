const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(session({
  secret: 'your-secret-key',  // You can change this to something more secure
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // For development, set `secure: false`. For production, use `secure: true` with HTTPS.
}));
// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: true})); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');

// Connection Pool
// You don't need the connection here as we have it in userController
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME
});
 

const routes = require('./server/routes/user');
const student = require('./server/StudentRouter/Router')
app.use('/', routes);
app.use('/Student',student)


app.listen(port, () => console.log(`Listening on port ${port}`));