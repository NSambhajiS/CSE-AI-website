import express from 'express';
import supabase from '../utils/db.js';
import authenticateToken from '../middleware/authMiddleware.js';

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

router.get('/faculty/category/:categoryId', authenticateToken, async (req, res) => {
  const { categoryId } = req.params;

  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (categoryError || !categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryName = categoryData.name;

    const { data: researchData, error: researchError } = await supabase
      .from(categoryName)
      .select('*')
      .eq('faculty_id', req.user.id);

    if (researchError) {
      return res.status(500).json({ error: researchError.message });
    }

    // Fetch table structure if no data exists
    const tableColumns = researchData.length > 0
      ? Object.keys(researchData[0])
      : await supabase.from(categoryName).select('*').limit(1).then((res) => Object.keys(res.data[0]));

    res.status(200).json({
      categoryName,
      researchData,
      tableColumns: tableColumns.filter((key) => key !== 'id' && key !== 'faculty_id'),
    });
  } catch (err) {
    console.error('Error fetching category data:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/faculty/category/:categoryId', authenticateToken, async (req, res) => {
  const { categoryId } = req.params;
  const facultyId = req.user.id; // Get the logged-in faculty's ID
  const newData = req.body; // Data to be inserted

  try {
    // Fetch category name using category ID
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (categoryError || !categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryName = categoryData.name;

    // Add faculty_id to the new data
    newData.faculty_id = facultyId;

    // Insert the new data into the category table
    const { data, error } = await supabase.from(categoryName).insert(newData).select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Data added successfully", data }); // Return the inserted data
  } catch (err) {
    console.error('Error adding data to category:', err);
    res.status(500).json({ error: err.message });
  }
});


router.put('/faculty/category/:categoryId/:dataId', authenticateToken, async (req, res) => {
  const { categoryId, dataId } = req.params;
  const updatedData = req.body;

  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (categoryError || !categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryName = categoryData.name;

    const { data, error } = await supabase
      .from(categoryName)
      .update(updatedData)
      .eq('id', dataId)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Data updated successfully", data });
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/faculty/category/:categoryId/:dataId', authenticateToken, async (req, res) => {
  const { categoryId, dataId } = req.params;

  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .select('name')
      .eq('id', categoryId)
      .single();

    if (categoryError || !categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    const categoryName = categoryData.name;

    const { data, error } = await supabase
      .from(categoryName)
      .delete()
      .eq('id', dataId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
