// server.js

import express from 'express';
import mongoose from 'mongoose';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from'cors';
const app = express();
const port = 9000;

app.use(cors())
app.use(cookieParser());




app.get('/', (req, res) => {
  res.send('hello world !');
});


app.post('/user', async (req, res) => {
  const { name, roll, password, class: studentClass, department } = req.body;
  if (!name || !roll || ! password || !studentClass || !department) {
    return res.status(400).json({ error: 'All fields (name, roll, class, department) are required.' });
  }

  try {
    const newStudent = new Student({
      name,
      roll,
      password,
      class: studentClass, 
      department,
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error saving student:', err);
    res.status(500).json({ error: 'Failed to save student data.' });
  }
});


app.post('/login', async (req, res) => {
  const { password, roll } = req.body;

  if (!name || !roll) {
    return res.status(400).json({ error: 'Both name and roll are required.' });
  }

  try {
    const student = await Student.findOne({ password, roll });

    if (student) {
      res.cookie('login', 'true', {
        httpOnly: true, 
        secure: 'egfwaehfgawkjgrfuyasgfuyaseg', 
        maxAge: 60 * 60 * 1000, 
      });

      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(404).json({ error: 'Invalid name or roll' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);

  mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
});
