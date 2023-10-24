import express from 'express';
import { router } from './routes';
import { errorLoggingMiddleware } from './middlewares/error';

const PORT = 1337;
const app = express();

// Body parser middleware for application/json (credits to Tri for the tip!)
app.use(express.json());
// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/', router);

app.use(errorLoggingMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server is accessible at http://localhost:${PORT}`);
});
