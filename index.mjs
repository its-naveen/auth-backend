import express from 'express';
import dotenv from 'dotenv';
import lodash from 'lodash';
import authRouter from './routers/authRouter.js';

const { get } = lodash;
const env = dotenv.config();
const port = get(env, 'parsed.PORT');
const app = express();
app.use(express.json());
app.use('/api', authRouter);

app.listen(port, function() {
  console.log(`server running on port ${port}`);
});
