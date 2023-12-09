import 'dotenv/config';
import 'dotenv-expand/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { routeNotFound } from './middlewares/routeNotFound';
import { loggingMiddleware } from './middlewares/logging';
import { errorLoggingMiddleware } from './middlewares/error';
import { connectMongoDB } from './config/mongoose';

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

connectMongoDB();

// Body parser middleware for application/json
app.use(express.json());
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(loggingMiddleware);
// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/api/v1/', router);
app.use(errorLoggingMiddleware);
app.use(routeNotFound);

export default app;
