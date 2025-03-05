// filepath: /krishna-project/backend/utils/auth.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import supabase from './db.js';

const initializePassport = () => {
  passport.use(
    'admin-local',
    new LocalStrategy(async (username, password, done) => {
      try {
        const { data: admins, error } = await supabase
          .from('admins')
          .select('*')
          .eq('email', username);

        if (error) {
          return done(error);
        }

        if (admins.length === 0) {
          return done(null, false, { message: 'No admin with that email' });
        }

        const admin = admins[0];

        const isMatch = await bcrypt.compare(password, admin.password);

        if (isMatch) {
          return done(null, admin);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'faculty-local',
    new LocalStrategy(async (username, password, done) => {
      try {
        const { data: faculties, error } = await supabase
          .from('faculties')
          .select('*')
          .eq('email', username);

        if (error) {
          return done(error);
        }

        if (faculties.length === 0) {
          return done(null, false, { message: 'No faculty with that email' });
        }

        const faculty = faculties[0];

        const isMatch = await bcrypt.compare(password, faculty.password);

        if (isMatch) {
          return done(null, faculty);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const { data: admins, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', id);

      if (adminError) {
        return done(adminError);
      }

      if (admins.length > 0) {
        return done(null, admins[0]);
      }

      const { data: faculties, error: facultyError } = await supabase
        .from('faculties')
        .select('*')
        .eq('id', id);

      if (facultyError) {
        return done(facultyError);
      }

      if (faculties.length > 0) {
        return done(null, faculties[0]);
      }

      return done(null, false);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;