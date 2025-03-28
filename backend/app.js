// Filepath: /krishna-project/backend/app.js
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import supabase from './utils/db.js'; // Database connection
import initializePassport from './utils/auth.js'; // Authentication strategy
import flash from 'connect-flash'; // Flash messages
import cors from 'cors';
import facultyRoutes from './routes/facultyRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import the admin routes
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = 3000;

initializePassport(); // Initialize passport strategies

// Middleware
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(flash());
app.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Secure cookie settings
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', facultyRoutes); // Use the faculty routes
app.use('/api', categoryRoutes); // Use the category routes
app.use('/api', adminRoutes); // Use the admin routes

// Root Route
app.get('/', (req, res) => res.send('Welcome to Krishna Project'));

// ✅ Admin Login Route
app.post('/admin/login', async (req, res, next) => {
  passport.authenticate('admin-local', async (err, user, info) => {
    if (err) {
      console.error('Error during admin login:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (!user) return res.status(400).json({ success: false, message: info.message });

    req.login(user, (err) => {
      if (err) {
        console.error('Error during admin login:', err);
        return res.status(500).json({ success: false, message: 'Login failed' });
      }
      res.json({ success: true, message: 'Login successful', token: user.token }); // Return JWT token
    });
  })(req, res, next);
});

// ✅ Faculty Login Route
app.post('/faculty/login', async (req, res, next) => {
  passport.authenticate('faculty-local', async (err, user, info) => {
    if (err) {
      console.error('Error during faculty login:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    if (!user) return res.status(400).json({ success: false, message: info.message });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      success: true, 
      message: 'Login successful', 
      token, 
      facultyId: user.id // Include facultyId in the response
    });
  })(req, res, next);
});
// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
