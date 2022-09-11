import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name:  { type: String, required: true, unique: true }
});

export const Users = model('Users', userSchema, 'users');