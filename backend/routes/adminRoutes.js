import express from 'express';
import bcrypt from 'bcrypt';
import supabase from '../utils/db.js';
import authenticateToken from '../middleware/authMiddleware.js'; // Import the middleware
import passport from 'passport'; // Add this import

const router = express.Router();
const saltRounds = 10;

// Add this route before the other routes
router.post('/login', (req, res, next) => {
  passport.authenticate('admin-local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    // Return the JWT token
    res.json({ token: user.token });
  })(req, res, next);
});

// Fetch all admins
router.get('/admins', authenticateToken, async (req, res) => { // Add authenticateToken middleware
  try {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Fetch admin details
router.get('/admin/profile', authenticateToken, async (req, res) => {
  try {
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(admin);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a new admin
router.post('/admins', authenticateToken, async (req, res) => { // Add authenticateToken middleware
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const { data, error } = await supabase
      .from('admins')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Hashing Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update admin details
router.put('/admin/profile', authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const updates = { name, email };
    if (password) {
      updates.password = await bcrypt.hash(password, saltRounds);
    }

    const { data, error } = await supabase
      .from('admins')
      .update(updates)
      .eq('id', req.user.id)
      .select();

    if (error) {
      console.error("Supabase Update Error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Remove an admin
router.delete('/admins/:adminId', authenticateToken, async (req, res) => { // Add authenticateToken middleware
  const { adminId } = req.params;
  try {
    const { data, error } = await supabase.from('admins').delete().eq('id', adminId);
    if (error) {
      console.error("Supabase Delete Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ success: true, message: "Admin removed successfully" });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
