import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import xhub from 'express-x-hub';
import xhubValidator from 'x-hub-signature';

import agentRoutes from './routes/agentRoutes.js';
import facebookRoutes from './routes/facebookRoutes.js';

dotenv.config();

const app = express();

const appSecret = process.env.APP_SECRET;

const token = process.env.TOKEN || 'token';
const receivedUpdates = [];



// Middleware for verifying X-Hub-Signature header
const verifyFacebookRequest = (req, res, next) => {
  const signatureHeader = req.headers['x-hub-signature'];
  const rawBody = req.rawBody;

  if (!signatureHeader || !rawBody) {
    console.error('Error - request header X-Hub-Signature not present');
    return res.sendStatus(401);
  }

  const algorithm = signatureHeader.split('=')[0];
  const signature = signatureHeader.split('=')[1];

  const expectedSignature = xhubValidator.calculateSignature(rawBody, appSecret, algorithm);

  if (signature !== expectedSignature) {
    console.error('Error - request header X-Hub-Signature invalid');
    return res.sendStatus(401);
  }

  console.log('request header X-Hub-Signature validated');
  next();
};

// Middleware for handling errors
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
};

// Add middleware
// app.use(parseRawBody);
// app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Add routes
app.use('/facebook', xhub({ algorithm: 'sha1', secret: appSecret }), verifyFacebookRequest, facebookRoutes);
app.use('/api', agentRoutes);

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((error) => console.error(`${error} did not connect`));

// Error handling middleware
app.use(errorHandler);
