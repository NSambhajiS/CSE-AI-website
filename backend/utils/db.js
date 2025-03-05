// filepath: /krishna-project/backend/utils/db.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const connectDB = async () => {
  try {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) {
      throw error;
    }
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection error', err);
  }
};

connectDB();

export default supabase;