import express from 'express';
import { createUser, getUserByEmail } from '../model/users';
import jwt from 'jsonwebtoken';
import { EarthquakeModel } from '../model/earthquake';

export const index = async (req: express.Request, res: express.Response) => {
  return res.status(200).json({ message: 'Hello World!' });
}

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
    return res.status(200).json({"register": "succes, login to get token"}).end();
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
    const payload: object = { email: email };
    const secretKey: string = 'mysecretkey';

    const token: string = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.status(200).json({token: token}).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
export const information = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit: number = 20;
    const skip: number = (page - 1) * limit;
    const yer = await EarthquakeModel.find({}).skip(skip).limit(limit);
    res.json(yer);
  } catch (error) {
    // Handle any errors that occur during the async operation
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const informationid = async (req: express.Request, res: express.Response) =>{
  try {
    const { id } = req.params;
    const yer = await EarthquakeModel.findById(id);
    if(!yer) {
      return res.status(404).json({ error: 'No earthquake found' });
    }
    res.json(yer);
  } catch (error) {
    console.log(error);
  }
}
export const deletedata = async (req: express.Request, res: express.Response) =>{
  try {
    const { id } = req.params;
    const yer = await EarthquakeModel.findByIdAndDelete(id);
    if(!yer) {
      return res.status(404).json({ error: 'No earthquake found' });
    }
    res.json({ "deleted": "Earthquake deleted" });
  } catch (error) {
    console.log(error);
  }
}
export const putdata =  async (req: express.Request, res: express.Response) =>{
  const { latitude, longitude, depth, mag, magType, nst, gap, dmin, rms, net, id, updated, place, type, horizontalError, depthError, magError, magNst, status, locationSource, magSource } = req.body;
  if(!latitude ||!longitude ||!depth ||!mag ||!magType ||!nst ||!gap ||!dmin ||!rms ||!net ||!id ||!updated || !place ||!type ||!horizontalError ||!depthError ||!magError ||!magNst ||!status ||!locationSource ||!magSource) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }
  const yerdata = {
    latitude,
    longitude,
    depth,
    mag,
    magType,
    nst,
    gap,
    dmin,
    rms,
    net,
    id,
    updated,
    place,
    type,
    horizontalError,
    depthError,
    magError,
    magNst,
    status,
    locationSource,
    magSource
  }
  const newYer = new EarthquakeModel(yerdata);
  newYer.save()
  .then(() => {
    res.json({ "saved": "Earthquake saved", newYer });
  })
  .catch((error) => {
    console.error('Error saving new user:', error);
  });
}