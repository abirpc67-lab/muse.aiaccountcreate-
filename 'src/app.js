import express from 'express';
import helmet from 'helmet';
import accountRoutes from './routes/account.routes.js';
import { apiLimiter } from './rateLimiter.js';
import { errorHandler } from './errorHandler.js';

const app = express();

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(apiLimiter);

app.use('/', accountRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: 404, message: 'Endpoint not found' } });
});

app.use(errorHandler);

export default app;
