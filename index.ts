import express from 'express';
import { router } from './routes';
import { errorLoggingMiddleware } from './middlewares/error';
import { loggingMiddleware } from './middlewares/logging';

const PORT = 8080;
const app = express();

// Body parser middleware for application/json (credits to Tri for the tip!)
app.use(express.json());
app.get('/hello', loggingMiddleware, (req, res) => {
  res.json({ msg: 'hello, from Express.js!' });
});

// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/', router);

app.get('/', (req, res) => {
  // Send the home.html file as response
  res.send('hello, homepage');
});

app.get('/api/v2', (req, res) => {
  // Send the home.html file as response
  res.send('hello, api/v2 homepage');
});

app.use(errorLoggingMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server is accessible, pls visit at http://localhost:${PORT}`);
});
