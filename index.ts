import 'dotenv/config';
import 'dotenv-expand/config';
import express from 'express';
import { router } from './routes';
import { routeNotFound } from './middlewares/routeNotFound';
import { loggingMiddleware } from './middlewares/logging';
import { errorLoggingMiddleware } from './middlewares/error';
import { connectMongoDB } from './config/mongoose';

const PORT = process.env.PORT ?? 1337;
const app = express();

connectMongoDB();

// Body parser middleware for application/json (credits to Tri for the tip!)
app.use(express.json());

app.use(loggingMiddleware);
// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/api/v1/', router);
app.use(errorLoggingMiddleware);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`🚀 Server is accessible at http://localhost:${PORT}`);
});
