import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import supabase from './db.js';

const initializePassport = () => {
  // Admin Login Strategy
  passport.use(
    'admin-local',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const { data: admin, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !admin) return done(null, false, { message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

        return done(null, admin);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Faculty Login Strategy
  passport.use(
    'faculty-local',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const { data: faculty, error } = await supabase
          .from('faculties')
          .select('*')
          .eq('email', email)
          .single();

        if (error || !faculty) return done(null, false, { message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) return done(null, false, { message: 'Invalid email or password' });

        return done(null, faculty);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize User
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize User
  passport.deserializeUser(async (id, done) => {
    try {
      const { data: user, error } = await supabase
        .from('admins')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        const { data: faculty, error: facultyError } = await supabase
          .from('faculties')
          .select('*')
          .eq('id', id)
          .single();

        if (facultyError || !faculty) return done(null, false);
        return done(null, faculty);
      }

      return done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;
