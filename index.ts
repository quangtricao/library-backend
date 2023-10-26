import express from 'express';
import { router } from './routes';
import { routeNotFound } from './middlewares/routeNotFound';
import { loggingMiddleware } from './middlewares/logging';

const PORT = 1337;
const app = express();

// Body parser middleware for application/json (credits to Tri for the tip!)
app.use(express.json());
// So we can also do /api/v1/ or /api/v2/ etc.
app.use('/', router);

// applied logginMiddleware
app.get('/hello', loggingMiddleware, (req, res) => {
  res.json({ msg: 'hello, from Express.js!' });
});

app.get('/api/v2', (req, res) => {
  // Send the home.html file as response
  res.send('hello, api/v2 homepage');
});


app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`🚀 Server is accessible at http://localhost:${PORT}`);
});
