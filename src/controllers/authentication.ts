import express from 'express';
import { createUser, getUserByEmail } from '../model/users';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if(!email ||!password ||!username) {
      console.log(email, password, username);
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    const existingUser = await getUserByEmail(email)
    if(existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await createUser({
      username,
      email,
      password
    })
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if(!email ||!password) {
      console.log(email, password);
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    const user = await getUserByEmail(email);
    if(!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if(user.password!== password) {
      return res.status(400).json({ error: 'Wrong password' });
    }
    return res.status(200).json({"Login": "Succes"}).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}