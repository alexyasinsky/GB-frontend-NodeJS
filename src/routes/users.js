import express from "express";
import {Users} from "../models/users.js";
const router = express.Router();

router
  .get('/', async (req, res) => {
    const users = await Users.find()
    res.json(users);
  })
  .post('/', async (req, res) => {
    await Users.create(req.body)
      .then(() => {
      console.log('new user created')
      res.status(201);
      res.send('OK');
    }).catch((err) => {
      console.log(err)
      res.send('ERR');
    })
  })
  .delete('/:id', async (req, res) => {
    const deleted = await Users.findByIdAndDelete(req.params.id);
    res.json(deleted);
  })
  .put('/:id', async (req, res) => {
    const updated = await Users.findByIdAndUpdate(req.params.id, req.body);
    res.json(updated);
  })

export default router;