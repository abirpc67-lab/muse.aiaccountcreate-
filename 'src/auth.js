import { config } from '../config/env.js';

export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== config.apiKey) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: 'Unauthorized: Invalid or missing API key'
      }
    });
  }
  next();
};
