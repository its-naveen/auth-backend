import express from 'express';
import dotenv from 'dotenv';
import lodash from 'lodash';
import cors from 'cors';

import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

const { get } = lodash;
const env = dotenv.config();
const port = get(env, 'parsed.PORT');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', authRouter);
app.use('/api', userRouter);

app.listen(port, function() {
  console.log(`server running on port ${port}`);
});
