// filepath: /krishna-project/backend/routes/facultyRoutes.js
import express from 'express';
import supabase from '../utils/db.js';
import bcrypt from 'bcrypt';
import authenticateToken from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();
const saltRounds = 10;

// Fetch all faculties (public route)
router.get('/faculties', async (req, res) => {
  try {
    const { data, error } = await supabase.from('faculties').select('*');
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch a specific faculty (public route)
router.get('/faculties/:facultyId', async (req, res) => {
  const { facultyId } = req.params;
  try {
    const { data, error } = await supabase.from('faculties').select('*').eq('id', facultyId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch research data for a specific faculty (protected route)
router.get('/faculties/:facultyId/research', authenticateToken, async (req, res) => {
  const { facultyId } = req.params;
  try {
    const { data, error } = await supabase.from('research').select('*').eq('faculty_id', facultyId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch work for a specific faculty (public route)
router.get('/faculties/:facultyId/work', async (req, res) => {
  const { facultyId } = req.params;
  try {
    const { data: categories, error: categoryError } = await supabase.from('categories').select('*');
    if (categoryError) {
      return res.status(500).json({ error: categoryError.message });
    }

    const work = {};
    for (const category of categories) {
      const { data, error } = await supabase.from(category.name).select('*').eq('faculty_id', facultyId);
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      work[category.name] = data;
    }

    res.status(200).json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new faculty
router.post('/faculties', authenticateToken, async (req, res) => { // Add authenticateToken middleware
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const { data, error } = await supabase.from('faculties').insert([{ name, email, password: hashedPassword }]);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a faculty
router.delete('/faculties/:facultyId', authenticateToken, async (req, res) => { // Add authenticateToken middleware
  const { facultyId } = req.params;
  try {
    const { data, error } = await supabase.from('faculties').delete().eq('id', facultyId);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch faculty profile (protected route)
router.get('/faculty/profile', authenticateToken, async (req, res) => {
  const facultyId = req.user.id; // Get faculty ID from the decoded token

  try {
    const { data, error } = await supabase.from('faculties').select('*').eq('id', facultyId).single();
    if (error || !data) {
      return res.status(404).json({ error: "Faculty profile not found" });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching faculty profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/faculty/profile', authenticateToken, async (req, res) => {
  const facultyId = req.user.id; // Get faculty ID from token
  const { name, email, password } = req.body;

  try {
    const updates = { name, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const { data, error } = await supabase
      .from('faculties')
      .update(updates)
      .eq('id', facultyId)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data[0]); // Return updated profile
  } catch (err) {
    console.error('Error updating faculty profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;