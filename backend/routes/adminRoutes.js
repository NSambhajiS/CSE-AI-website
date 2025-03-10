import express from 'express';
import bcrypt from 'bcrypt';  // ✅ Import bcrypt
import supabase from '../utils/db.js';

const router = express.Router();
const saltRounds = 10;  // ✅ Define saltRounds

// Fetch all admins
router.get('/admins', async (req, res) => {
  try {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) {
      console.error("Supabase Error:", error.message); // ✅ Log error
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Server Error:", err.message); // ✅ Log server error
    res.status(500).json({ error: err.message });
  }
});

// Add a new admin
router.post('/admins', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" }); // ✅ Validation check
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const { data, error } = await supabase
      .from('admins')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) {
      console.error("Supabase Insert Error:", error.message); // ✅ Log error
      return res.status(500).json({ error: error.message });
    }
    
    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Hashing Error:", err.message); // ✅ Log bcrypt error
    res.status(500).json({ error: err.message });
  }
});

// Remove an admin
router.delete('/admins/:adminId', async (req, res) => {
  const { adminId } = req.params;
  try {
    const { data, error } = await supabase.from('admins').delete().eq('id', adminId);
    if (error) {
      console.error("Supabase Delete Error:", error.message); // ✅ Log error
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ success: true, message: "Admin removed successfully" });
  } catch (err) {
    console.error("Server Error:", err.message); // ✅ Log server error
    res.status(500).json({ error: err.message });
  }
});

export default router;
