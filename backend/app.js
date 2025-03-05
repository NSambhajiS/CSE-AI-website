// filepath: /krishna-project/backend/app.js
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import supabase from './utils/db.js'; // Import the database connection
import initializePassport from './utils/auth.js'; // Import the authentication strategy
import flash from 'connect-flash'; // Import connect-flash

dotenv.config();

const app = express();
const port =  3000;

initializePassport();

app.use(express.json());  // Add this line to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash()); // Enable flash messages

app.use(
  session({
    secret: process.env.SUPABASE_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Welcome to Krishna Project');
});

app.post(
  '/admin/login',
  passport.authenticate('admin-local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/admin/login',
    failureFlash: true,
  })
);


app.post(
  '/faculty/login',
  passport.authenticate('faculty-local', {
    successRedirect: '/faculty/dashboard',
    failureRedirect: '/faculty/login',
    failureFlash: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});