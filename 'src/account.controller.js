import { AccountService } from '../services/account.service.js';

export class AccountController {
  static getRoot(req, res) {
    res.json({
      service: 'NEXORA AI Account Management API',
      status: 'active',
      timestamp: new Date().toISOString()
    });
  }

  static getHealth(req, res) {
    res.json({ status: 'healthy', uptime: process.uptime() });
  }

  static startSession(req, res, next) {
    try {
      const session = AccountService.initSession();
      res.status(201).json({ success: true, data: session });
    } catch (err) {
      next(err);
    }
  }

  static createAccount(req, res, next) {
    try {
      const { sessionId, email } = req.body;
      if (!sessionId || !email) {
        const error = new Error('Missing required fields: sessionId and email');
        error.statusCode = 400;
        throw error;
      }
      const result = AccountService.createAccount({ sessionId, email });
      res.status(202).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  static getStatus(req, res, next) {
    try {
      const { id } = req.params;
      const status = AccountService.getStatus(id);
      res.json({ success: true, data: status });
    } catch (err) {
      next(err);
    }
  }

  static getDocs(req, res) {
    res.json({
      documentation: 'NEXORA AI API v1.0',
      endpoints: {
        'GET /': 'Service info',
        'GET /health': 'Health check',
        'POST /start': 'Initialize processing session',
        'POST /create': 'Submit account processing request (Requires x-api-key)',
        'GET /status/:id': 'Check session status (Requires x-api-key)',
        'GET /api/docs': 'This documentation'
      }
    });
  }
}
