import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRouter from './routes/users.js';

mongoose.connect('mongodb://localhost:27017/messager')
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.log(err));

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/status', (req, res) => {
  res.send('OK')
});

app.use('/users', userRouter);

app.listen(5555, () => console.log('server on port 5555'))