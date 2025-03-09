import express from 'express';
import supabase from '../utils/db.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch research data faculty-wise for a selected category (using category ID)
router.get('/research/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Fetch category name using category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (categoryError) {
      return res.status(500).json({ error: categoryError.message });
    }
    if (!categoryData) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const categoryName = categoryData.name; // Category name to be used in frontend

    // Fetch research data from the category table
    const { data, error } = await supabase
      .from(categoryName)
      .select('*, faculties(name)');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Group research work by faculty
    const facultyWiseData = {};
    data.forEach((item) => {
      const facultyName = item.faculties?.name || 'Unknown Faculty';
      if (!facultyWiseData[facultyName]) {
        facultyWiseData[facultyName] = [];
      }
      facultyWiseData[facultyName].push(item);
    });

    // Send category name along with research data
    res.status(200).json({ categoryName, facultyWiseData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
