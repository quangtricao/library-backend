import express from 'express';
import { router } from './routes';
import { loggingMiddleware } from './middlewares/logging';
import { errorLoggingMiddleware } from './middlewares/error';

const PORT = 1337;
const app = express();

app.get('/hello', loggingMiddleware, (_req, res) => {
  res.json({ msg: 'hello, from Express.js!' });
});

// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/', router);

app.use(errorLoggingMiddleware);
app.listen(PORT, () => {
  console.log(`🚀 Server is accessible at http://localhost:${PORT}`);
});
