import bcrypt from 'bcrypt';

const saltRounds = 10;
const plainPassword = 'qwerty'; // Change this to your desired password

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }
  console.log('Hashed password:', hash);
});
