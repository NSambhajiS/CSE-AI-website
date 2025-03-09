// filepath: /krishna-project/backend/routes/facultyRoutes.js
import express from 'express';
import supabase from '../utils/db.js';

const router = express.Router();

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
export default router;