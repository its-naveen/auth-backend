import jwt from "jsonwebtoken";
import lodash from 'lodash';
import dotenv from 'dotenv';
import { readData, writeData } from "../utils/helper.js";

const { get } = lodash;
const env = dotenv.config();
const secretKey = get(env, 'parsed.SECRET_KEY');

export async function signup(req, res) {
  const { email } = req.body;
  const existingUsers = await readData();
  const hasUser = existingUsers.some(user => user.email === email);
  if (!hasUser) {
    const newData = [...existingUsers, { email: email }];
    await writeData(newData);
    res.status(201).json({ message: 'account creation successful' });
  } else {
    res.status(409).json({ message: 'email already exists' });
  }
};

export async function login(req, res) {
  const { email } = req.body;

  const existingUsers = await readData();
  const hasUser = existingUsers.some(user => user.email === email);

  if (hasUser) {
    const payload = {
      email
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'login success', token });
  } else {
    res.status(404).json({ message: 'user not found' });
  }
}

export async function authorization(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'unauthorized' });
  }

  jwt.verify(token.split(' ')[1], secretKey, function(err, user) {
    if (err) {
      return res.status(403).json({ message: 'invalid token' });
    } else {
      req.user = user;
      next();
    }
  });
}
