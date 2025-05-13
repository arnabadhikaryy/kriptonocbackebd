
import { Schema, model } from 'mongoose';


const studentSchema = new Schema({
  name: {
    type: String,
    required: true, 
    trim: true, 
  },
  roll: {
    type: String,
    required: true, 
    unique: true,
    trim: true, 
  },
  class: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true, 
  },
});

const Student = model('Student', studentSchema);

export default Student;
