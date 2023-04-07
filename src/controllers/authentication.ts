import express from 'express';
import { createUser, getUserByEmail } from '../model/users';
import { random } from '../helpers';
import { authentication } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, passwrod, username } = req.body;
    if(!email ||!passwrod ||!username) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }
    const existingUser = await getUserByEmail(email)
    if(existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const salt = await random();
    const user = await createUser({
      email,
      passwrod,
      authentication: {
        salt,
        password: authentication(salt, passwrod)
      }
    })
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}